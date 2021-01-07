import React from "react";
import {Button,Toolbar,IconButton,AppBar,Typography,makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../actions/user';
import {useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar:{
       marginBottom:"30px" 
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Nav= ()=>{
    const classes=useStyles();
    const dispatch=useDispatch();
    const state=useSelector((state)=>state);  
    const history = useHistory(); 
    
    const userLogout=()=>{
        dispatch(logout());
        history.push("/login");
    }
    const {isAuthenticated,user}=state.user;
        //console.log(isAuthenticated,user);
        return(
            <>
                <AppBar position="static" className={classes.appBar} color="inherit">              
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton}  color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {isAuthenticated ? <span>Welcome {user.name}</span>:<span>Welcome As Guest</span>}
                        </Typography>
                        <Link to='/'><Button color="inherit">Home</Button></Link>
                        <Link to='/categories'><Button color="inherit">Categories</Button></Link> 
                        {!isAuthenticated && 
                            <Button color="inherit">
                                <Link to='/register'>Register</Link>
                            </Button>
                        }
                        {!isAuthenticated && 
                           <Link to='/login'><Button color="inherit">Login</Button></Link> 
                        }
                        {isAuthenticated && <Button color="inherit" onClick={userLogout}>Loguot</Button>}
                    </Toolbar>                      
                </AppBar>               
                
            </>
        )
}

export default Nav;