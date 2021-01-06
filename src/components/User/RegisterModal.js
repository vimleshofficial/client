import React,{useState,useEffect} from "react";
import {useHistory } from "react-router-dom";
import {TextField,Button,Typography,Paper,} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {useDispatch,useSelector} from 'react-redux';
import {userRegister} from "../../actions/user";
import useStyle from './styles';

const RegisterModal=()=>{
    const [userData,setUserData]=useState({name:"",email:"",password:""});
    const [msg,setMsg]=useState(null);
    const dispatch=useDispatch();
    const state=useSelector((state)=>state);    
    const classes=useStyle();
    const history = useHistory();
    useEffect(() => {        
        if(state.error.id==="REGISTER_FAIL"){
            setMsg(state.error.msg);
        }
        else{
            setMsg(null);
            if(state.user.isAuthenticated)
            history.push('/');    
        }
      },[state,setMsg,history]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(userRegister(userData));        
    }
    return (
        <div className={classes.form}>
        <Paper className={classes.paper}>
            {msg && (<Alert severity="error">{msg}</Alert>)}
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}> 
                <Typography variant="h6">Register User</Typography>                
                <TextField 
                    name="name" 
                    variant="outlined" 
                    label="User Name"
                    fullWidth
                    value={userData.name}
                    onChange={(e)=>setUserData({...userData,name:e.target.value})}
                />
                <TextField 
                    name="email" 
                    variant="outlined" 
                    label="Email"
                    fullWidth
                    value={userData.email}
                    onChange={(e)=>setUserData({...userData,email:e.target.value})}
                />
                <TextField 
                    name="password" 
                    variant="outlined" 
                    label="Password"
                    type="password"
                    fullWidth
                    value={userData.password}
                    onChange={(e)=>setUserData({...userData,password:e.target.value})}
                />                   
               <Button 
                    className={classes.buttonSubmit} 
                    variant="contained" 
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >Register
                </Button>                
            </form>
        </Paper>
    </div>
    );
}
export default RegisterModal;