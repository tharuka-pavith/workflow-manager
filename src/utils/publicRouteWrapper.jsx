import { getAuth, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const  PublicRoute = ({children}) => {
    const auth = getAuth();
    //const navigate = useNavigate()

    if (auth.currentUser == null || auth.currentUser === null){
         // If there NO current user, render child components
        return children;
    }else if (auth.currentUser !== null){
        //If there is a current user, navigate to /dashboard
        // navigate(); //We cant use navigate() since component is not rendered
        // return <Navigate to="/dashboard/newtask" />
        signOut(auth).then(() => {
            // Sign-out successful.
                console.log("Signed out successfully");
                return(<Navigate to="/dashboard/newtask" />);
            }).catch((error) => {
            // An error happened.
            console.log("Error in signout");
            console.log(error.message);
    
            });
    }

    //return();
}

export default PublicRoute;