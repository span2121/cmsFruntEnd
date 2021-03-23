import axios from "axios";
import Axios from "axios"
export const loginApi = (requestQuery, API_PATH) => {
const requestOptions = {
    method: "GET",
    header: { 'Content-Type': 'application/json' }
};
 return Axios(`${API_PATH}/login?` +  new URLSearchParams(requestQuery), requestOptions)
 .then(res => {
            if(res?.data)
            return res.data
})
.catch(err => {
    console.log("Error : ", err);
})

}

export const registerAPI = (requestQuery, API_PATH, subRoute='' ) => {
    const requestOptions = {
        method: "POST",
        header: { 'Content-Type': 'application/json'}
    };
    return Axios(`${API_PATH}/register${subRoute}?` + new URLSearchParams(requestQuery), requestOptions)
    .then(res=> {
        if(res?.data)
            return res.data;
    })
    .catch(err => {
        console.log("Error =>",err)
    })
}

export const fetchUserDetails = (requestQuery, API_PATH, subRoute='' ) => {
    const requestOptions = {
        method: "POST",
        header: { 'Content-Type': 'application/json'}
    };
    return Axios(`${API_PATH}/fetchDetails${subRoute}?` + new URLSearchParams(requestQuery), requestOptions)
    .then(res=> {
        if(res?.data)
            return res.data;
    })
    .catch(err => {
        console.log("Error =>",err)
    })
}

export const circular = (requestQuery, API_PATH, subRoute='' ) => {
    const requestOptions = {
        method: "POST",
        header: { 'Content-Type': 'application/json' }
    };
    return Axios(`${API_PATH}/circular${subRoute}?` + new URLSearchParams(requestQuery), requestOptions)
    .then(res=> {
        if(res?.data)
            return res.data;
    })
    .catch(err => {
        console.log("Error =>",err)
    })
}

export const activity = (requestQuery, API_PATH, subRoute='' ) => {
    const requestOptions = {
        method: "POST",
        header: { 'Content-Type': 'application/json' }
    };
    return Axios(`${API_PATH}/activity${subRoute}?` + new URLSearchParams(requestQuery), requestOptions)
    .then(res=> {
        if(res?.data)
            return res.data;
    })
    .catch(err => {
        console.log("Error =>",err)
    })
}