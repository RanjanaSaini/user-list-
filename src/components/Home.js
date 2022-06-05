import {Typography,Box,makeStyles,Grid,TextField,Button} from '@material-ui/core';
import {deepPurple , green} from '@material-ui/core/colors';
 
import List from './user/List';
import axios from 'axios';
import { useState } from "react";
const useStyles = makeStyles({
    headingColor: {
     backgroundColor: deepPurple[400],
     color: "white"
    },
    addStuColor: {
     backgroundColor: green[400],
     color: "white"
    },
   })

function Home(){
    const classes = useStyles();
    const [user,setUser] = useState({
username:"",
email:"",
phoneNumber:""
    });
    const [status, setStatus] = useState();
function onTextChange (e){
setUser({
    ...user,
    [e.target.name]:e.target.value
})
console.log(user)

}
async function onFormSubmit(e) {
    e.preventDefault()
    try {
     await axios.post("http://localhost:3333/users", user)
     setStatus(true);
    } catch (error) {
     console.log("Something is Wrong");
    }
   }
   if (status) {
    return <Home />
   }
 
return(
    <>
    <Box   className={classes.headingColor} style={{textAlign:"center" , padding:"2px" , marginBottom:"20px"}}>
    <Typography variant="h2">User Table</Typography>
    </Box>
    <Grid container justify="center" spacing="4">
    <Grid item md={6} xs={12}>
     <Box style={{textAlign:"center" ,  padding:"2px" ,marginBottom:"2px"}} className={classes.addStuColor} >
      <Typography variant="h4">Add User</Typography>
     </Box>
     <form noValidate>
      <Grid container >
       <Grid item xs={12} style={{marginTop:"9px"}}>
        <TextField autoComplete="username" name="username" variant="outlined" required fullWidth id="username" label="Name"  onChange={e => onTextChange(e)}        />
       </Grid>
       <Grid item xs={12} style={{marginTop:"9px"}}>
        <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address"  onChange={e => onTextChange(e)} />
       </Grid>
       <Grid item xs={12} style={{marginTop:"9px"}}>
        <TextField autoComplete="phonenumber" name="phoneNumber" variant="outlined" required fullWidth id="phoneNumber" label="Phone no." onChange={e => onTextChange(e)}/>
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="submit" variant="contained" color="primary" style={{ marginTop:"9px"}} fullWidth onClick={e=>onFormSubmit(e)} >Add</Button>
      </Box>
     </form>
    </Grid>
    
     <Grid item md={6} xs={12}>
     <List />
    </Grid>
   </Grid>
    
    </>
)


}
export default Home;