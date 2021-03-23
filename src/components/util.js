import { useContext } from "react";
import AppContext from "./contect";

export const branches = ["CSE", "ECE", "CIVIL", "ME"];

export const gender = [ "Male", "Female", "General"];

export const dateFormat = 'YYYY-MM-DD'

export const viewDateFormat = "DD-MM-YYYY"

export const roles = {
  'student' : 1,
  'Teacher' : 2,
  'Placement Officer' : 3,
  'HOD': 4,
}

export const tableStyle = 'table-dashboard table table-striped table-hover table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap'

export const themes = {
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
  };

  export const GetTeachersCode = () => {
    const { allTeachers} = useContext(AppContext)
    let teacherOptions = allTeachers.length > 0 &&  allTeachers?.map(tch => {
      return tch.teacher_code
  })
  return teacherOptions;
  }

export const statusOptions = {
    0:"Pending",
    1:"In Progress",
    2:"Completed"
}