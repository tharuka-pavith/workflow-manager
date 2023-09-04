//Firebase functions
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

import uploadFile from "./fileUpload";

/**
 * This function is used to insert the task, created by the user, to Firestore database
 * */
export default async function insertTask( taskName, dueDate, description, workflow, files){
    const db = getFirestore();
    const auth = getAuth();
    const realtimeDB = getDatabase();

    try{
        /**Insert the task to the tasks collection */
        const assignees_ids = workflow.map((element)=>{return element.user_id});
        const updatedWorkflow = workflow.map((element) => ({ //add more required fields for workflow elemetns
            ...element,
            comments: '',
            deadline: null,
            attachments: [],
            approved_date: null,
            approved: false,
            completed: false
          }));
          
        const date = new Date(dueDate);
        const initialDate = new Date();
        const docRef = await addDoc(collection(db, "current_tasks"), {
            task_name: taskName,
            owner_id: auth.currentUser.uid,
            owner_name: auth.currentUser.displayName,
            initialized_date: initialDate.toLocaleDateString('en-GB'),
            due_date: date.toLocaleDateString('en-GB'),
            attachments: [], //TODO: work on attachments later
            description: description,
            workflow: updatedWorkflow,
            assignees_ids: assignees_ids
        });
        console.log("Document written with ID: ", docRef.id); //logging

        /**Upload files to firebase storage */
        const attachmentNames = [];
        files.forEach(
            (file) => {
                //Upload path:"tasks/{task_id}/{user_id}/{file_name}"
                const fileLink = uploadFile(`tasks/${docRef.id}/${auth.currentUser.uid}/${file.name}`, file);
                console.log("File Link: ", fileLink);
                attachmentNames.push(file.name);
            }
        );

        /**Now update the attachments field in the task document */
        const currentDocRef = doc(db, "current_tasks", docRef.id);
        await updateDoc(currentDocRef, {
            attachments: attachmentNames //set the attachments field in the doc
        });

        /**insert refernce to the task inside current user's my_tasks field */
        const currentUserRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(currentUserRef, {
            my_tasks: arrayUnion(docRef.id) //adds elements to an array but only elements not already present
        });

        /**Insert reference to the task, inside each assignees assigned_tasks field */
        workflow.forEach(async element => {
            const userRef = doc(db, "users", element.user_id);
            await updateDoc(userRef, {
                assigned_tasks: arrayUnion(docRef.id) //adds element to an array but only element not already present
            });
        });

        /**Set new notification for each assignees */
        assignees_ids.forEach((assignee_id)=>{
            set(ref(realtimeDB, 'notifications/' + assignee_id + '/'+ docRef.id), {
                owner: auth.currentUser.displayName,
                task_name: taskName,
                description: description
            });
        })

    }catch (error){
        console.log(error);
    }


}