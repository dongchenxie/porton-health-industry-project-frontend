import axios from 'axios'
import React from 'react'
import AuthContext from "./AuthContext"
let baseURL = "http://localhost:3333/api/"

const dataAccessService = {
    login:async function(username,password){
        console.log("login")
        let result = await axios.post(`${baseURL}user/login`, {
            "email": username,
            "password": password,
        })
        if (result.status === 200 ) {
            console.log(result.data.token);
            return { status: 200, token: result.data.token};
        } else {
            return { status: 400}
        }
    },
    signOut:function(){
       // console.log(authContext.authState.isAuthenticated)
        localStorage.removeItem("token");
    }
}
export default dataAccessService