import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import { useState, useEffect } from "react";
const useStyles = makeStyles({
 ListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
})

function List () {
 const classes = useStyles();
 const [users, setUsers] = useState([]);

 useEffect(() => {
  async function getAllUser() {
   try {
    const User = await axios.get(" http://localhost:3333/users")
  
    setUsers(User.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getAllUser();
 }, [])

 const handleDelete = async id => {
    await axios.delete(`http://localhost:3333/users/${id}`);
var UpdatedList = users.filter((item)=>{
    return item.id !== id
   
})
setUsers( UpdatedList)
 }


 return (
  <>
   <Box style={{textAlign:"center", padding:"2"}} className={classes.ListColor}>
    <Typography variant="h4">User List</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Phone no.</TableCell>

       <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      {
       users.map((user, i) => {
        return (
         <TableRow key={i}>
          <TableCell align="center">{i + 1}</TableCell>
          <TableCell align="center">{user.username}</TableCell>
          <TableCell align="center">{user.email}</TableCell>
          <TableCell align="center">{user.phoneNumber}</TableCell>

          <TableCell align="center">
           <Tooltip title="Delete">
            <IconButton ><DeleteIcon style={{color:"secondary"}} onClick={()=>handleDelete(user.id)} /></IconButton>
           </Tooltip>
          </TableCell>
         </TableRow>
        )
       })
      }

     </TableBody>
    </Table>
   </TableContainer>
  </>
 )
}

export default List;








