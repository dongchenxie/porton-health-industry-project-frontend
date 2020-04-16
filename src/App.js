import React from 'react';
import MainRouter from './router/MainRouter'
import './App.css';
import AuthContext from  "./data/AuthContext"
import axios from 'axios'
const baseURL = "http://localhost:3333/api/"
function App() {
  const dataAccessService = {
    login:async function(username,password){
        console.log("login")
        let result = await axios.post(`${baseURL}user/login`, {
            "email": username,
            "password": password,
        }).catch((e)=>{
          console.log(e.response)
          return {status:e.response.status,error:e.response.data.error}
        })
        console.log("after login request")
        if (result.status == 200 ) {
            console.log(result.data.token);
            setAuthState((prev)=>{
              return {...prev, isAuthenticated:true,token:result.data.token}
            })
            return { status: 200, token: result.data.token};
        } else {
            return result
        }
    },
    signOut:function(){
        console.log(authState.isAuthenticated)
        localStorage.removeItem("token");
        setAuthState((prev)=>{
          return {...prev, isAuthenticated:false, token:null}
        })
    }
}
  //The state 
  const [authState,setAuthState]=React.useState({isAuthenticated:false,token:null})

  return (
    < AuthContext.Provider value={{data:"testing data",authState: authState,setAuthState: setAuthState,API:dataAccessService}}>
      <MainRouter />
    </AuthContext.Provider>
  );
}

export default App;
