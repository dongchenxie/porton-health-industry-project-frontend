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

    let [page, setPage] = React.useState(0);
    let pageIndex = 1

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
              setPage(data.data.totalPages)
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

    //can call API and pass in page query here..
    const handleChangePage = (event, newPage) => {
      if (newPage >= page){
        console.log(page)
      } else {
        setPage(page += 1);
      }
    };

  const renderAction = (user) => {
    return(<Link to={`${url}/${user._id}`} style={{textDecoration: 'none', color: 'inherit'}}><Button size="small" variant="contained" color="primary">Client Information and Settings</Button></Link>)
  }

  const sortTable = (col) => {
    setUsers(initialSort)
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

    return(
    <div> 
      {console.log(apiResult, "test")}
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
                  {column.id !== 'action' ? <MuiTableSortLabel active onClick={() => sortTable(column.id)} direction={direction}> </MuiTableSortLabel> : ""}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? renderAction(row) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            
          </TableBody>
          <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        count={apiResult.totalPages}
        page={parseInt(apiResult.currentPage - 1, 10)}
        rowsPerPage={10}
        onChangePage={handleChangePage}
      />
        </Table>
      </TableContainer>
      </Paper>
    </div>
        : "" }
  </div>
    ) 
  }