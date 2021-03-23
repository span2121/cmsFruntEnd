import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router , Route,Switch, useHistory} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../components/contect';
import DashboardMaster from '../components/dashboardmaster'
import Profile from '../components/profile' 
import Circulars from '../components/circular'
import Activity from '../components/activity'
import AssignActivityToStudent from '../components/activity/AassignActivitytoStudent'
import ActivityDetailsTable from '../components/activity/activityDetailsTable'
import DashboardLayoutMaster from '../components/dashBoardMastr'
const DashboardLayout = () => {
    const { entity } = useContext(AppContext)
    const history = useHistory()
    useEffect(() => {
        if(!entity.userId)
        {
            history.push('/login');
        }
        else if(!(window.location.pathname.length > 1))
        {
            history.push('/profile');
        }
    },[entity])

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [history.location.pathname]);

    return  (
        <div style={{ minHeight: '70vh', color: 'black', margin:"0px" }}>  
        <DashboardLayoutMaster >
            <React.Fragment>
                <div >
                        <Switch>
                                <Route path="/profile" component={Profile} />
                                <Route path="/circulars" component={Circulars} />
                                <Route path="/activities" component={Activity} />
                                <Route path="/assigntoStudents" component={AssignActivityToStudent} />
                                <Route path='/ActivityDetails' component={ActivityDetailsTable} />
                        </Switch>
                 </div>
            </React.Fragment>
            </DashboardLayoutMaster>
        </div>
    )
}
export default DashboardLayout
