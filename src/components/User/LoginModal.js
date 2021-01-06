import React,{useState,useEffect} from "react";
import {useHistory } from "react-router-dom";
import {TextField,Button,Typography,Paper} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {useDispatch,useSelector} from 'react-redux'
import {userLogin } from "../../actions/user";
import useStyle from './styles';

const LoginModal=()=>{
    const [userData,setUserData]=useState({email:"",password:""});
    const [msg,setMsg]=useState(null);

    
    const dispatch=useDispatch();
    const classes=useStyle();
   
    const history = useHistory();
    const {error,user}=useSelector((state)=>state);
    
    useEffect(() => {        
        if(error.id==="LOGIN_FAIL"){
            setMsg(error.msg);
        }
        else{           
            setMsg(null);
            if(user.isAuthenticated)
            history.push('/');            
        }
      },[error,setMsg,history,user]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(userLogin(userData));
    }
    
    
        return (
            <div className={classes.form}>
            <Paper className={classes.paper}>
                {msg && (<Alert severity="error">{msg}</Alert>)}
                {!user.isAuthenticated && <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">Login</Typography>
                    <TextField 
                        name="email" 
                        variant="outlined" 
                        label="Email"
                        fullWidth
                        value={userData.email}
                        onChange={(e)=>setUserData({...userData,email:e.target.value})}
                    />
                    <TextField 
                        name="title" 
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
                    >Submit
                    </Button>
                    
                </form>}
            </Paper>
        </div>
        );
}

export default LoginModal;