import React,{useEffect,useState} from "react";
import {Container,AppBar,Typography,Grow,Grid,Button,Menu,MenuItem} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {getPosts} from './actions/posts';
import {loadUser} from './actions/user';
import Form from './components/Form/Form';
import Posts from './components/Postes/Posts';
import LoginForm from './components/User/Login';
import RegisterModal from './components/User/RegisterModal'
import useStyle from './styles';
import memories from './images/memories.jpg';

const App=()=> {
  const [currentId,setCurrentId]=useState(null);
  //const [token,setToken]=useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes=useStyle();
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  });
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <div className="App">
          <Container maxWidth="lg" >
            <AppBar className={classes.appBar} position="static" color="inherit">
              <Grid item xs={12} sm={10} >
                <Typography className={classes.heading} variant="h2" align="left">Memories
                &nbsp;&nbsp;<img className={classes.image} src={memories} alt="memories" height="60" />
                </Typography>              
                
              </Grid>
              <Grid item xs={12} sm={2} >
                <Button  className={classes.buttonSubmit} 
                          variant="contained" 
                          color="primary"
                          size="large" 
                          aria-controls="simple-menu" 
                          aria-haspopup="true" 
                          onClick={handleClick}
                  >
                  Open Menu
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem><Link to='/'>Home</Link></MenuItem>                  
                  <MenuItem><Link to='/login'>Login</Link></MenuItem>
                  <MenuItem><Link to='/register'>Register</Link></MenuItem>
                </Menu>                
              </Grid>              
            </AppBar>
            <Switch> 
              <Route path="/" exact>
                <Grow in>
                  <Container>
                      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                          <Grid item xs={12} sm={7} >
                              <Posts setCurrentId={setCurrentId} />
                          </Grid>
                          <Grid item xs={12} sm={4} >
                              <Form currentId={currentId} setCurrentId={setCurrentId}/>                              
                          </Grid>                      
                      </Grid>
                  </Container>
                </Grow>  
              </Route>   
             <Route path="/login" render={({ match }) => <LoginForm/>}/>
             <Route path="/register" render={({ match }) => <RegisterModal/>}/>
            </Switch>            
          </Container>
      </div>
    </Router>
  );
}

export default App;
