import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

/**
 * This function is used to insert the task, created by the user, to Firestore database
 * */
export default async function insertTask( taskName, dueDate, description, workflow){
    const db = getFirestore();
    const auth = getAuth();

    try{
        const date = new Date(dueDate);
        const docRef = await addDoc(collection(db, "current_tasks"), {
            task_name: taskName,
            owner_id: auth.currentUser.uid,
            due_date: date.toLocaleDateString('en-GB'),
            description: description,
            workflow: workflow
        });
        console.log("Document written with ID: ", docRef.id); //logging
    }catch (error){
        console.log(error);
    }


}