import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";

/**
 * This function is used to insert the task, created by the user, to Firestore database
 * */
export default async function insertTask( taskName, dueDate, description, workflow){
    const db = getFirestore();
    const auth = getAuth();

    try{
        /**Insert the task to the tasks collection */
        const date = new Date(dueDate);
        const docRef = await addDoc(collection(db, "current_tasks"), {
            task_name: taskName,
            owner_id: auth.currentUser.uid,
            due_date: date.toLocaleDateString('en-GB'),
            description: description,
            workflow: workflow
        });
        console.log("Document written with ID: ", docRef.id); //logging

        /**insert refernce to the task inside current user's my_tasks field */
        const currentUserRef = doc(db, "users", auth.currentUser.uid);
        // Set the "capital" field of the city 'DC'
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

    }catch (error){
        console.log(error);
    }


}