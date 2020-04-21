import React from "react";
import AuthContext from "../../../data/AuthContext"

export default function Users() {
    const authContext = React.useContext(AuthContext)
    React.useEffect(() => {
      const start = async () => {
        console.log(await authContext.API.getUsers())
      }
      start()
    }, [])
    return <h2>Users (secure data)</h2>;
  }