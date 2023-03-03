import React from "react";
import { Route, Routes } from "react-router-dom";

import MyTask from "../pages/MyTasks";
import NewTask from "../pages/NewTask";
import TodoTask from "../pages/TodoTasks";
import History from "../pages/History";
import Admin from "../pages/Admin";
import Home from "../pages/home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

function AppRouter() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} >
                <Route path="/home/login" element={<Login />} />
                <Route path="/home/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/dashboard" element={<Dashboard />} >
                <Route path="/dashboard/newtask" element={<NewTask />} />
                <Route path="/dashboard/mytask" element={<MyTask />} />
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