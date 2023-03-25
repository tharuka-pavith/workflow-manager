import { getAuth } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const  PrivateRoute = ({children}) => {
    const  auth = getAuth();
    //const navigate = useNavigate()

    if (auth.currentUser !== null){
         // If there is a current user, render the passed down component
        return children;
    }else{
        //If there is no current user, navigate to /home/login
        // navigate("/home/logn"); //We cant use navigate() since component is not rendered
        return <Navigate to="/home/login" />
    }

    //return();
}

export default PrivateRoute;