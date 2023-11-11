// Firebase functions
import { getAuth, onAuthStateChanged } from "firebase/auth";

// React router
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const  PrivateRoute = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(null);
            navigate("/home/login");
          }
        });
    
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      }, [navigate]);


    if (user) {
        return children;
      } else {
        return null;
      }

}

export default PrivateRoute;