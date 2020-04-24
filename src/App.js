import React from 'react';
import MainRouter from './router/MainRouter'
import './App.css';
import AuthContext from "./data/AuthContext"
import axios from 'axios'
const baseURL = "http://localhost:3333/api/"
const corsProxy = "http://localhost:8010/proxy/"
function App() {
  /*
    return upon request success {status:200,...data}
    return upon request failure {status:???,error:[ERROR MESSAGE]}
  */
  const dataAccessService = {
    login: async function (username, password) {// API call without the token
      console.log("login")
      let result = await axios.post(`${baseURL}user/login`, {
        "email": username,
        "password": password
      }).catch((e) => {
        console.log(e.response)
        return { error: e }//Error example
      })
      console.log("after login request")
      if (result.status === 200) {
        localStorage.setItem("token", result.token)
        setAuthState((prev) => {
          return { ...prev, isAuthenticated: true, token: result.data.token }
        })
        console.log("success with calling login API")
        return { status: 200, token: result.data.token };//Success example
      } else {
        return result
      }
    },
    signOut: function () {
      console.log(authState.isAuthenticated)
      console.log("remove token")
      localStorage.removeItem("token");
      setAuthState((prev) => {
        return { ...prev, isAuthenticated: false, token: null }
      })
    },
    readToken: async function(currentSetAuthState){
      console.log( `${baseURL}user/readToken/${localStorage.getItem('token')}`)
      let result = await axios.get(`${baseURL}user/readToken/${localStorage.getItem('token')}`)     
      // .catch((e) => {
      //   console.log( "error reading token: ", 
      //   return { error: e }//Error example
      // })
      if(result.status === 200){
        console.log("login ok")
        localStorage.setItem("user", JSON.stringify(result.data))
        // setAuthState.currentSetAuthState((prev) => {
        //   return { ...prev, isAuthenticated: true, token: result.data.token,role:result.data.role }
        // })
        // return { status: 200}
        return result.data
      }else{
        return this.signOut()
      }
    },
    //example for getting secure data using 
    getSecureData: async function () {
      let result = await axios(
        {
          method: "get",
          url: `${baseURL}posts`,
          headers: {
            "auth-token":localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).catch((e) => 
        { return {error: e}
      })
      if (result.status === 200) {
        return { status: 200, data: result.data };
      } else {
        return result
      }
    },
  getUsers: async function () {
    let result = await axios(
      {
        method: "get",
        url: `${baseURL}users`,
        headers: {
          "auth-token":localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      }
    ).catch((e) => 
      { return { error: e }} )
    if (result.status === 200) {
      return { status: 200, data: result.data };
    } else {
      return result
    }
  },
  getIndivUser: async function (param) {
    let result = await axios(
      {
        method: "get",
        url: `${baseURL}user/${param}`,
        headers: {
          "auth-token":localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      }
    ).catch((e) => 
      { return { error: e } })
    if (result.status === 200) {
      return { status: 200, data: result.data };
    } else {
      return result
    }
   }
  }

  //The state 
  const [authState, setAuthState] = React.useState({ isAuthenticated: false, token: null })

  return (
    < AuthContext.Provider value={{ data: "testing data", authState: authState, setAuthState: setAuthState, API: dataAccessService }}>
      <MainRouter />
    </AuthContext.Provider>
  );
}

export default App;
