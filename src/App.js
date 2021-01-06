import React,{useEffect,useState} from "react";
import {Container,Grow,Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {getPosts} from './actions/posts';
import {loadUser} from './actions/user';
import Form from './components/Postes/Form/Form';
import Posts from './components/Postes/Posts';
import LoginModal from './components/User/LoginModal';
import RegisterModal from './components/User/RegisterModal'
import Nav from './components/Nav';
 
const App=()=> {
  const [currentId,setCurrentId]=useState(null); 

  
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch]);
  return (
    
    <Router>
      <div className="App">
          <Container maxWidth="lg" >
            <Nav/> 
            <Switch> 
              <Route path="/" exact>
                <Grow in style={{padding:0}}>
                  <Container>
                      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                          <Grid item xs={12} sm={12} style={{justifyContent:"left"}}>
                              <Form currentId={currentId} setCurrentId={setCurrentId}/>                              
                          </Grid>                     
                          <Grid item xs={12} sm={12} >
                              <Posts setCurrentId={setCurrentId} />
                          </Grid>
                      </Grid>
                  </Container>
                </Grow>  
              </Route>   
             <Route path="/login" render={({ match }) => <LoginModal/>}/>
             <Route path="/register" render={({ match }) => <RegisterModal/>}/>
            </Switch>            
          </Container>
      </div>
    </Router>
  );
}

export default App;
