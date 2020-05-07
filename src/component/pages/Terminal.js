import React from "react";
import AuthContext from "../../data/AuthContext"
import CheckIn from "./CheckIn"
import TerminalLogin from "./TerminalLogin"
export default function Terminal() {
  const authContext = React.useContext(AuthContext)
  const [error, setError] = React.useState(null);
  const [isAuthed,setIsAuthed] = React.useState(false)
  React.useEffect(() => {
    // const start = async () => {
    //     authContext.API.readToken(authContext.authState).then(function(result){
    //       if (result.role !== 'CLIENT_ADMIN'){
    //        return setError("404. Please try again.")
    //       } 
    //     })
    // }
    // start()
    console.log("terminal page")
    
  }, [])

    return(
      <div>
        {isAuthed?<CheckIn setIsAuthed={setIsAuthed}/>:<TerminalLogin setIsAuthed={setIsAuthed}/>}
      </div>
    ) 
  }