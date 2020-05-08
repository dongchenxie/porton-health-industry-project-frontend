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

      let result = await axios.post(`${baseURL}user/login`, {
        "email": username,
        "password": password
      }).catch((e) => {
        console.log(e.response)
        return { error: e }//Error example
      })
      if (result.status === 200) {
        localStorage.setItem("token", result.token)
        setAuthState((prev) => {
          return { ...prev, isAuthenticated: true, token: result.data.token }
        })
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
    readToken: async function (currentSetAuthState) {
      let result = await axios.get(`${baseURL}user/readToken/${localStorage.getItem('token')}`)
      // .catch((e) => {
      //   console.log( "error reading token: ", 
      //   return { error: e }//Error example
      // })
      if (result.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data))

        // setAuthState.currentSetAuthState((prev) => {
        //   return { ...prev, isAuthenticated: true, token: result.data.token,role:result.data.role }
        // })
        // return { status: 200}
        return result.data
      } else {
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
            "auth-token": localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).catch((e) => {
        return { error: e }
      })
      if (result.status === 200) {
        return { status: 200, data: result.data };
      } else {
        return result
      }
    },
    getUsers: async function (pageQuery, searchQuery) {
      let urlParam = undefined

      if (pageQuery && searchQuery) {
        urlParam = `${baseURL}users?page=${pageQuery}&search=${searchQuery}`
      } else if (pageQuery === undefined && searchQuery) {
        urlParam = `${baseURL}users?search=${searchQuery}`
      } else if (searchQuery === undefined && pageQuery) {
        urlParam = `${baseURL}users?page=${pageQuery}`
      } else {
        urlParam = `${baseURL}users`
      }

      let result = await axios(
        {
          method: "get",
          url: urlParam,
          headers: {
            "auth-token": localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).catch((e) => { return { error: e } })
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
            "auth-token": localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).catch((e) => { return { error: e } })
      if (result.status === 200) {
        return { status: 200, data: result.data };
      } else {
        return result
      }
    },
    resetUserPassword: async function (id, password) {
      let result = await axios.put(`${baseURL}user/passwordReset/${id}`, {
        password: password

      }, 
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          console.log(error)
          return { error, status: 400 }
        })
      return result
    },
    updateUserEnabled: async function (id, status) {
      let result = await axios.put(`${baseURL}user/permission/${id}`, {
        isEnabled: status
      },
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          console.log(error)
          return { error, status: 400 }
        })

      return result
    },
    registerUserAccount: async function (reqBody) {
      let result = await axios.post(`${baseURL}user/register`, reqBody
      ,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      }).catch((e) => {
        console.log(e.response)
        return { error: e.response, status: e.response.status }
      })
      if (result.status === 201) {
        return { status: 201, data: result.data };
      } else if (result.status === 400) {
        return { status: 400, data: result };
      }
    },
    getClinics: async function () {

      let result = await axios(
        {
          method: "get",
          url: `${baseURL}clinics`,
          headers: {
            "auth-token": localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).catch((e) => { return { error: e } })
      if (result.status === 200) {
        return { status: 200, data: result.data };
      } else {
        return result
      }
    },

    TerminalLogin: async function (token) {
      let result = await axios.post(`${baseURL}terminal/login`, {
        "token": token
      }).catch((e) => {
        console.log(e.response)
        return { error: e }//Error example
      })
      if (result.status === 200) {
        return { status: 200, token: result.data.token };//Success example
      } else {
        console.log(result.response)
        return { status: result.error.response.status, error: result.error }
      }
    },
    TerminalGetAppointments: async function (min_ahead, page, perPage) {
      let result = await axios(
        {
          method: "get",
          url: `${baseURL}terminal/appointments?min_ahead=${min_ahead}&perPage=${perPage}&page=${page}`,
          headers: {
            "terminal-token": localStorage.getItem("terminal-token"),
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).catch((e) => { return { error: e } })
      if (result.status === 200) {
        return { status: 200, data: result.data };
      } else {
        console.log(JSON.stringify(result.error.response))
        return { status: result.error.response.status, error: result.error }
      }
    },
    TerminalGetVerificationContent: async function () {
      let result = await axios({
        method: "get",
        url: `${baseURL}terminal/verificationcontent`,
        headers: {
          "terminal-token": localStorage.getItem("terminal-token"),
          'Access-Control-Allow-Origin': '*'
        }
      }
      ).catch((e) => { return { error: e } })
      if (result.status === 200) {
        return { status: 200, data: result.data };
      } else {
        console.log(JSON.stringify(result.error.response))
        return { status: result.error.response.status, error: result.error }
      }
    },
    TerminalCheckin: async function (inputData) {
      let result = await axios({
        method: "post",
        url: `${baseURL}terminal/checkin`,
        headers: {
          "terminal-token": localStorage.getItem("terminal-token"),
          'Access-Control-Allow-Origin': '*'
        },
        data: inputData
        // data:{
        //   appointmentId:"5eb257c9ae63c8254c917c30",
        //   content:JSON.stringify({lastName:"Simon",dateOfBirth:"1980-01-01"})
        // }
      }
      ).catch((e) => { return { error: e } })
      if (result.status === 200) {
        return { status: 200, data: result.data };
      } else {
        console.log(JSON.stringify(result.error.response))
        return { status: result.error.response.status, error: result.error }
      }
    },

    getClientAppointments: async function (searchQuery, start, end, page) {
      let urlParam = undefined
      let queryPage = "1"

      if (page !== undefined) {
        queryPage = page
      }

      if (searchQuery && start === undefined && end === undefined) {
        urlParam = `${baseURL}client/appointments?search=${searchQuery}&page=${queryPage}`
      } else if (searchQuery === undefined && start && end) {
        urlParam = `${baseURL}client/appointments?start_date=${start}&end_date=${end}&page=${queryPage}`
      } else if (searchQuery && start && end) {
        urlParam = `${baseURL}client/appointments?search=${searchQuery}&start_date=${start}&end_date=${end}&page=${queryPage}`
      } else {
        urlParam = `${baseURL}client/appointments?page=${queryPage}`
      }

      console.log(urlParam)
      
      let result = await axios(
        {
          method: "get",
          url: urlParam,
          headers: {
            "auth-token": localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).catch((e) => { return { error: e } })
      if (result.status === 200) {
        return { status: 200, data: result.data };
      } else {
        return result
      }
    },
    getIndivAppointment: async function (param) {
      let result = await axios(
        {
          method: "get",
          url: `${baseURL}client/appointment/${param}`,
          headers: {
            "auth-token": localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).catch((e) => { return { error: e } })
      if (result.status === 200) {
        return { status: 200, data: result.data };
      } else {
        return result
      }
    },
    updateAppointment: async function (id, reqBody) {
      let result = await axios.put(`${baseURL}client/appointment/${id}`, reqBody, {
        headers: {
          "auth-token": localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          console.log(error)
          return { error, status: 400 }
        })
      return result
    },
    getClientTerminals: async function (queryParam, pageParam) {
      let urlParam = `${baseURL}client/terminals`
      if (queryParam && pageParam === undefined) {
        urlParam = `${baseURL}client/terminals?search=${queryParam}`
      } else if (pageParam && queryParam === undefined) {
        urlParam = `${baseURL}client/terminals?page=${pageParam}`
      } else if (pageParam && queryParam) {
        urlParam = `${baseURL}client/terminals?search=${queryParam}&page=${pageParam}`
      }

      let result = await axios(
        {
          method: "get",
          url: urlParam,
          headers: {
            "auth-token": localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).catch((e) => { return { error: e } })
      if (result.status === 200) {
        return { status: 200, data: result.data };
      } else {
        console.log("error", result)
        return { status: 400, data: result };
      }
    },
    getIndivTerminal: async function (id, verificationReq, putParam) {
      let terminalURL = `${baseURL}client/terminal/${id}`
      if (verificationReq) {
        terminalURL = `${baseURL}client/terminal/verificationContent/${id}`
      }

      if (putParam) {
        let result = await axios.put(terminalURL, putParam, { headers: {
          "auth-token": localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }})
          .then(function (response) {
            return response
          })
          .catch(function (error) {
            console.log(error)
            return { error, status: 400 }
          })
        return result
      } else {
        let result = await axios(
          {
            method: "get",
            url: terminalURL,
            headers: {
              "auth-token": localStorage.getItem("token"),
              'Access-Control-Allow-Origin': '*'
            }
          }
        ).catch((e) => { return { error: e } })
        if (result.status === 200) {
          return { status: 200, data: result.data };
        } else {
          console.log("error", result)
          return { status: 400, data: result };
        }
      }
    },
    createClientTerminal: async function (param) {
      let result = await axios(
        {
          method: "post",
          url: `${baseURL}client/terminal/${param}`,
          headers: {
            "auth-token":localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).catch((e) => 
        { return { error: e }} )
      if (result.status === 201) {
        return { status: 201, data: result.data };
      } else {
        console.log("error", result)
        return { status: 400, data: result };
      }
  },
  updateUser:async function (data,userId){
    let result = await axios({
      method: "PUT",
      url: `${baseURL}user/${userId}`,
      headers: {
        "auth-token": localStorage.getItem("token"),
        'Access-Control-Allow-Origin': '*'
      },
      data:data
    }).catch((e) => { return { error: e } })
    if (result.status === 200) {
      return { status: 200, data: result.data };
    } else {
      console.log("error", result)
      return { status: 400, data: result };
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