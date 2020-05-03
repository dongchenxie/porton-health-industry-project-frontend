import React from "react";
import AuthContext from "../../../data/AuthContext"

import { Link, useRouteMatch } from "react-router-dom";

//material-ui components:
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MuiTableSortLabel  from '@material-ui/core/TableSortLabel';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      width: '100%',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    container: {
      marginTop: '2%',
      maxHeight: '100%',
    },
  }));


export default function TerminalList() {
  const classes = useStyles();
  let { url } = useRouteMatch();

  const authContext = React.useContext(AuthContext)
  const [error, setError] = React.useState(null);
  const [terminals, setTerminals] = React.useState(null);
  const [apiResult, setapiResult] = React.useState(null);
  const [initialSort, setInitialSort] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [direction, setDirection] = React.useState("asc")
  const [page, setPage] = React.useState(1);
  const [searchToggle, setSearchToggle] = React.useState(null);


  React.useEffect(() => {
    const start = async () => {
       let data = await authContext.API.getClientTerminals()

       if (data === undefined){
        console.log("error")
        setError("Error grabbing data from the server.")
      } else if (data === undefined){
        console.log("error")
        setError("Error grabbing data from the server.")
      } else {
        authContext.API.readToken(authContext.authState).then(function(result){
          if (result.role !== 'CLIENT_ADMIN'){
           return setError("404. Please try again.")
          } else {
            if (data.status === 400 || data.status === 404 ){
              setError("server error.")
              console.log(data)
            } else {
            setapiResult(data.data.metadata)
            setTerminals(data.data.data)
            setInitialSort(data.data.data)
            }
         }
        })
      }
    }
    start()
  }, [])
  
  const columns = [
    { id: 'name', label: 'Name', minWidth: 120 },
    { id: 'status', label: 'Status', minWidth: 120 },
    { id: 'token', label: 'Token', minWidth: 120 },
    { id: 'action', label: 'Action', minWidth: 150 } ] 

      //create top header 
      const createData = (name, status, token, action, id ) => {
        return { name, status, token, action, id };
      }


      //NEED: get terminal ID
      const renderAction = (terminal) => {
        return(<Link to={`${url}/${terminal._id}`} style={{textDecoration: 'none', color: 'inherit'}}><Button size="small" variant="contained" color="primary">Terminal Information and Settings</Button></Link>)
      }

      const renderToken = (token) => {
        return(<Button size="small" variant="contained" color="primary" onClick={() => displayToken(token)}>{token}</Button>)
      }
      
      const sortTable = (col) => {
        console.log("sort...")
      //   if (col === 'email'){
      //   //bugfix here....
      //   } else {
      //   if(direction === "asc"){
      //     let sorted = users.sort(function(a, b){
      //       if(a[col] > b[col]) { return 1; }
      //       if(a[col] < b[col]) { return -1; }  
      //       return 0;
      //   })  
      //   setUsers(sorted)
      //   setDirection("desc")
      //   } else {
      //     let sorted = users.sort(function(a, b){
      //       if(a[col] < b[col]) { return 1; }
      //       if(a[col] > b[col]) { return -1; }
      //       return 0;
      //   })  
      //    setUsers(sorted)
      //    setDirection("asc")
      //   }
      // }
    }

    
const handleChangePage = () => {
  console.log("next")
  }

    const handleSearchChange = (e) => {
      setSearch(e.target.value);
    };
    
    const submitSearch = (event) => {
      if (event.key === "Enter" && search !== "") {
        console.log(search)
        setSearchToggle(true)
        setPage(1)
        event.target.value = ""
      }
    }
    
//clear search fields, render base API  result again.
const clearSearch = () => {
  setSearch("")
  setSearchToggle(false)
  setPage(1)
}

  //NEED: post terminal
const createTerminal = () => {
  //POST to client/terminal endpoint.
  alert("create popup")
}

const parseRows = (column, value, row) => {
  if (column === 'token'){
    console.log(value)
    return renderToken(value)
  } else if (column === 'action'){
    return renderAction(row)
  } else {
    return value
  }
}

  //NEED: get verification content
const displayToken = (token) => {
  console.log(token)
}

return(
  <div> 
          {error !== null ? error : ""}
          {terminals !== null && terminals !== undefined ? 
  <div>
    {console.log(terminals)}
    <h3>Terminals: </h3>
    <Paper className={classes.root}>
    <Button size="small" variant="contained" color="primary" onClick={createTerminal}>Create New</Button>
    {searchToggle === true ? <Button size="small" variant="contained" color="primary" onClick={clearSearch}>Clear Search</Button> : ""}
    <TextField id="outlined-basic" label="Search By Field" variant="outlined" style={{float: 'right', marginBottom: '2%'}} onChange={handleSearchChange} onKeyPress={submitSearch}/> 
    <TableContainer className={classes.container}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead className>
          <TableRow>
            {columns.map((column) => (
              <TableCell 
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, backgroundColor: '#df0f6a', color: 'white' }} >
                {column.label}
                {column.id !== 'action' ? <MuiTableSortLabel active onClick={() => sortTable(column.id) } direction={direction}> </MuiTableSortLabel> : ""}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {terminals.map((row) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column, id) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} key={id} align={column.align}>
                      {parseRows(column.id, value, row)}
                    </TableCell>
                  );
                })}
                  
              </TableRow>
            );
          })}
        </TableBody>

        <TableBody > 
        <div  style={{display: 'flex', justifyContent: 'center'}}> 
        Page {page} of {apiResult.totalPages}
        <ArrowLeftIcon onClick={() => handleChangePage("l")}/>
        <ArrowRightIcon onClick={() => handleChangePage("r")}/>
        </div>
        </TableBody> 

      </Table>
    </TableContainer>
  </Paper>
</div>
      : "" }
</div>
  ) 
  }