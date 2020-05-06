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
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';


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

  let sortKey = {name: "asc", status: "asc"}
  const [direction, setDirection] = React.useState(sortKey)
  const [page, setPage] = React.useState(1);
  const [searchToggle, setSearchToggle] = React.useState(null);
  const [query, setQuery] = React.useState(undefined);
  const [hash, setHash] = React.useState(null);


  React.useEffect(() => {
    const start = async () => {
       let data = await authContext.API.getClientTerminals()
       console.log(data)
       if (data === undefined || data.error){
        console.log("error")
        setError("Error grabbing data from the server.")
        }  else {
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
            console.log(data)
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

const callAPI = async (query, page) => {
  //old
  let apiData = undefined
   apiData = await authContext.API.getClientTerminals(query, page)
  console.log(apiData)

  if (apiData === undefined && apiData.data === undefined){
   console.log("error")
   setError("Error grabbing data from the server.")
 }  else {
   authContext.API.readToken(authContext.authState).then(function(result){
     if (result.role !== 'CLIENT_ADMIN'){
      return setError("404. Please try again.")
     } else {
      if(apiData.data.metadata.totalResults === 0){
        setapiResult(apiData.data.metadata)
        setapiResult((prevState) => ({
          ...prevState,
          totalPages: 1,
        }))
        setError("No results match search.")
        setTerminals([])
       } else {
      setError("")
       setapiResult(apiData.data.metadata)
       setTerminals(apiData.data.data)
       setInitialSort(apiData.data.data)
       console.log(apiData)
       }
    }
   })
 }
}


  //may be bug here...
const submitSearch = (event) => {
  if (event.key === "Enter" && search !== "") {
    setSearchToggle(true)
    setPage(1)
    setQuery(event.target.value)
    event.target.value = ""
    return callAPI(query, undefined)
  }
}
    
//clear search fields, render base API  result again.
const clearSearch = () => {
  setSearch("")
  setSearchToggle(false)
  setQuery(undefined)
  callAPI(undefined, undefined)
  setPage(1)
}

  ///////
  //NEED: post terminal
  ///////
const createTerminal = async () => {
  //POST to client/terminal endpoint.
  let data = await authContext.API.createClientTerminal("TESTFROMREACT")
  console.log(data)
}

const sortTable = (col) => {
  if(direction[col] === "asc"){
    let sorted = terminals.sort(function(a, b){
      if(a[col] > b[col]) { return 1; }
      if(a[col] < b[col]) { return -1; }  
     return 0;
  })  
  setTerminals(sorted)
  return setDirection(prevState => ({
  ...prevState,
  [col]: "desc"
  }));
  } else {
    let sorted = terminals.sort(function(a, b) {
      if(a[col] < b[col]) { return 1; }
      if(a[col] > b[col]) { return -1; }
      return 0;
  })  
  setTerminals(sorted)
  return setDirection(prevState => ({
    ...prevState,
    [col]: "asc"
    }));
  }
}

const handleChangePage = async (pageDir) => {
 if (pageDir == 'r' && page + 1 <= setapiResult.totalPages && query !== undefined){
   setPage(page += 1)
   return callAPI(query, page)
 } else if (pageDir == 'l' && page - 1 >= 1 && query !== undefined){
   setPage(page -= 1)
 return  callAPI(query, page)
 }
};


const handleSearchChange = (e) => {
setSearch(e.target.value);
setQuery(e.target.value)
};


//token pop-up features

const renderToken = (token) => {
  return(
    <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
           <Button size="small" variant="contained" color="primary" {...bindTrigger(popupState)}>{hashToken(token)}</Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
               >
                <Box p={2}>
                <DisplayToken token={token} />
                </Box>
              </Popover>
            </div>
          )}
        </PopupState>)
}

const DisplayToken = (token) => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <p>{token.token}</p>
        </div>
      </Container>
    </div>
  );     
}

const hashToken = (tokenStr) => {
  if (tokenStr == null){
    return tokenStr
  }

let local = []
tokenStr.toString().split("").forEach(parse)

function parse(item, index, arr) {
 let hash = arr[index] = "*"
 local.push(hash)
}

return local.join("")
}


//create tables:

const parseStatus = (val) => {
if (val === 'ENABLED'){
  val = 'Enabled'
} else if (val === 'DISABLED') {
  val = 'Disabled'
} else if (val === 'DELETED'){
  val = 'Deleted'
}
  return val
}

const parseRows = (column, value, row) => {
  if (column === 'token' && row.status === 'DELETED'){
    return ""
  } else if (column === 'token' && row.status !== 'DELETED'){
    return renderToken(value)
  } else if (column === 'action' && row.status !== 'DELETED'){
    return renderAction(row)
  }  else if (column === 'status') {  
    return parseStatus(value)
  } else {
    return value
  }
}

const renderAction = (terminal) => {
  return( <Link to={`${url}/${terminal._id}`} style={{textDecoration: 'none', color: 'inherit'}}><Button size="small" variant="contained" color="primary">Terminal Information and Settings</Button></Link> ) 
}


return(
  <div> 
          {error !== null ? error : ""}
          {terminals !== null && terminals !== undefined ? 
  <div>
    <h3>  Terminals: </h3>
    <Paper className={classes.root}>
    <Button size="small" variant="contained" color="primary" style={{marginRight: '2%', marginLeft: '1%', marginTop: '1%'}} onClick={createTerminal}>Create New</Button>
    {searchToggle === true ? <Button size="small" variant="contained" color="primary" onClick={clearSearch} style={{marginRight: '2%', marginLeft: '1%', marginTop: '1%'}}>Clear Search</Button> : ""}
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
                {column.id !== 'action' && column.id !== 'token' ? <MuiTableSortLabel active onClick={() => sortTable(column.id) } direction={direction[column.id]}> </MuiTableSortLabel> : ""}
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