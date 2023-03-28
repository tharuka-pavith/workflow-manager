import React from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "../utils/privateRouteWrapper";
import PublicRoute from "../utils/publicRouteWrapper";

import MyTask from "../pages/MyTasks";
import NewTask from "../pages/NewTask";
import TodoTask from "../pages/TodoTasks";
import History from "../pages/History";
import Admin from "../pages/Admin";
import Home from "../pages/home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Welcome from "../pages/welcome";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

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
                <Route path="/dashboard/mytasks" element={<MyTask />} />
                <Route path="/dashboard/todotasks" element={<TodoTask />} />
                <Route path="/dashboard/history" element={<History />} />
                <Route path="/dashboard/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRouter;