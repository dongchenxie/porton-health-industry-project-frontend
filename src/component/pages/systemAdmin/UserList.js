import React from "react";
import AuthContext from "../../../data/AuthContext"
import { BrowserRouter, Link, useRouteMatch } from "react-router-dom";

//material-ui components:
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//new: 
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MuiTableSortLabel  from '@material-ui/core/TableSortLabel';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


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


export default function Users() {
    const classes = useStyles();
    let { url } = useRouteMatch();

    const authContext = React.useContext(AuthContext)
    const [apiResult, setapiResult] = React.useState(null);
    const [users, setUsers]  = React.useState(null);
    const [initialSort, setInitialSort]  = React.useState(null);

    const [error, setError] = React.useState(null);
    const [direction, setDirection] = React.useState("asc")

    let [page, setPage] = React.useState(1);

    React.useEffect(() => {
      const start = async () => {
        let data = await authContext.API.getUsers()
        if (data === undefined){
          console.log("error")
          setError("Error grabbing data from the server.")
        } else if (data.data === undefined){
          console.log("error")
          setError("Error grabbing data from the server.")
        } else {
          authContext.API.readToken(authContext.authState).then(function(result){
            if (result.role !== 'SYSTEM_ADMIN'){
             return setError("404. Please try again.")
            } else {
              setapiResult(data.data)
              setUsers(data.data.users)
              setInitialSort(data.data.users)
            }
          })
        }
      }
      start()
    }, [])

    const columns = [
      { id: 'firstName', label: 'First Name', minWidth: 120 },
      { id: 'lastName', label: 'Last Name', minWidth: 120 },
      { id: 'role', label: 'Role', minWidth: 120 },
      { id: 'email', label: 'Email', minWidth: 140 },
      { id: 'action', label: 'Action', minWidth: 150 }]

      function createData(name, role, email, action, id ){
        return { name, role, email, action, id };
      }

      //call users API passing in the page, set results to view.
      const callAPI = async (page) => {
      let data =  await authContext.API.getUsers(page)
      if (data === undefined){
        console.log("error")
        setError("Error grabbing data from the server.")
      } else if (data.data === undefined){
        console.log("error")
        setError("Error grabbing data from the server.")
      } else {
        authContext.API.readToken(authContext.authState).then(function(result){
          if (result.role !== 'SYSTEM_ADMIN'){
           return setError("404. Please try again.")
          } else {
            setUsers(data.data.users)
          }
        })
      }
    }

    const handleChangePage = async (pageDir) => {
      if (pageDir == 'r' && page + 1 <= apiResult.totalPages){
        callAPI(page + 1)
        setPage(page += 1)
      } else if (pageDir == 'l' && page - 1 >= 1){
        callAPI(page - 1)
        setPage(page -= 1)
      }
    };

  const renderAction = (user) => {
    return(<Link to={`${url}/${user._id}`} style={{textDecoration: 'none', color: 'inherit'}}><Button size="small" variant="contained" color="primary">Client Information and Settings</Button></Link>)
  }

  const sortTable = (col) => {
    if (col === 'email'){
    //bugfix here....
    } else {
    if(direction === "asc"){
      let sorted = users.sort(function(a, b){
        if(a[col] > b[col]) { return 1; }
        if(a[col] < b[col]) { return -1; }  
        return 0;
    })  
    setUsers(sorted)
    setDirection("desc")
    } else {
      let sorted = users.sort(function(a, b){
        if(a[col] < b[col]) { return 1; }
        if(a[col] > b[col]) { return -1; }
        return 0;
    })  
     setUsers(sorted)
     setDirection("asc")
    }
  }
}

    return(
    <div> 
        {console.log(apiResult)}
            {error !== null ? error : ""}
            {users !== null && users !== undefined ? 
      <div>
        <Paper className={classes.root}>
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
            {users.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column, id) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} key={id} align={column.align}>
                        {column.id === 'action' ? renderAction(row) : value}
                      </TableCell>
                    );
                  })}
                    
                </TableRow>
              );
            })}
          </TableBody>

          <TableBody> 
           {page} of {apiResult.totalPages}
          <ArrowLeftIcon onClick={() => handleChangePage("l")}/>
          <ArrowRightIcon onClick={() => handleChangePage("r")}/>
          </TableBody> 

        </Table>
      </TableContainer>
      </Paper>
    </div>
        : "" }
  </div>
    ) 
  }