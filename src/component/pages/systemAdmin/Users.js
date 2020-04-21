import React from "react";
import AuthContext from "../../../data/AuthContext"

export default function Users() {
    const authContext = React.useContext(AuthContext)
    const [users, setUsers] = React.useState(null);

    React.useEffect(() => {
      const start = async () => {
        let data = await authContext.API.getUsers()
        setUsers(data.data)
      }
      start()
    }, [])



    // date: "2020-04-11T01:51:55.596Z"
    // email: "donana@donana.com"
    // isEnabled: false
    // name: "donana"
    // _id: "5e9122c85ce2627044323a7d"


    const renderUsers = (usersArr) => {
        console.log("it works", usersArr.users)
        let userList =  usersArr.users.map(user =>  ( 
             <div> <p>hi</p>  </div>
         ))

         return(<div>{userList}</div>)
    }

    return(
        <div> 
         <h2>User accounts:</h2>      
        <div>
            {users !== null ? renderUsers(users) : ""}
        </div>
       </div>
    ) 
  }