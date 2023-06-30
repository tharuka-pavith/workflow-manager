import React from "react";
import { Route, Routes } from "react-router-dom";

//Wrapper files
import PrivateRoute from "../utils/privateRouteWrapper";
import PublicRoute from "../utils/publicRouteWrapper";

// Public pages
import Home from "../pages/home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Welcome from "../pages/welcome";

// Private pages
import MyTask from "../pages/MyTasks";
import NewTask from "../pages/NewTask";
import TodoTask from "../pages/TodoTasks";
import History from "../pages/History";
import Admin from "../pages/Admin";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/EditProfile";
import Task from "../pages/Task";

// Use in case of 404-Not found
import NotFound from "../pages/NotFound";

/**AppRouter Component */
function AppRouter() {
    return (
        <Routes>
            <Route path="/home" element={<PublicRoute> <Home /> </PublicRoute>} >
                <Route path="/home/welcome" element={<PublicRoute> <Welcome/> </PublicRoute>} />
                <Route path="/home/login" element={<PublicRoute> <Login/> </PublicRoute>} />
                <Route path="/home/signup" element={<PublicRoute> <Signup/> </PublicRoute>} />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/** PrivateRouter is used to protect dashboard routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} > 
                <Route path="/dashboard/newtask" element={<NewTask />} />
                <Route path="/dashboard/task" element={<Task />} />
                <Route path="/dashboard/mytasks" element={<MyTask />} />
                <Route path="/dashboard/todotasks" element={<TodoTask />} />
                <Route path="/dashboard/history" element={<History />} />
                <Route path="/dashboard/admin" element={<Admin />} />
                <Route path="/dashboard/editprofile" element={<EditProfile />} />

                <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRouter;