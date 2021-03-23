import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {CloseButton,  Fade} from '../components/registerStudennt/helper/Toast'
import DashboardLayout from './DashboardLayout'
import Login from '../login/index'
import Register from '../components/registerStudennt/register'
import TeacherRegister from '../components/registerTeacher'

const Layout = () => {
    return (
        <Router >
          <Switch>
           <Route path="/login" component ={Login} />
           <Route path="/StudentRegister" component={Register} />
           <Route path="/TeacherRegister" component={TeacherRegister}/>
           <Route component={DashboardLayout} />
          </Switch>
          <ToastContainer autoClose={5000} pauseOnHover closeButton={<CloseButton />} position={toast.POSITION.BOTTOM_LEFT} />
        </Router>
      );
};
export default Layout;