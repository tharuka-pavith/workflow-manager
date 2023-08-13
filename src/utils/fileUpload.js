// Firebase functions
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
/*
function uploadFile(path, file) {

    const storage = getStorage(); //Firebase storage object
    const storageRef = ref(storage, path); //Upload path:"tasks/{task_id}/{user_id}/{file_name}"

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    console.log('Default case in switch ');
                    break;

            }
        },
        (error) => {
            // Handle unsuccessful uploads
            console.log(error.message);
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                //TODO: Store image URL in databsase
                console.log('File available at', downloadURL);
                return downloadURL;
            });
        }
    );

}*/

//import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

async function uploadFile(path, file) {
  return new Promise((resolve, reject) => {
    const storage = getStorage(); // Firebase storage object
    const storageRef = ref(storage, path); // Upload path: "tasks/{task_id}/{user_id}/{file_name}"

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // ... your existing code for progress and state change
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error.message);
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            // Store image URL in the database
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            reject(error);
          });
      }
    );
  });
}




export default uploadFile;
