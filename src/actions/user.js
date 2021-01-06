import * as api from '../api';
import {returnErrors,clearErrors} from '../actions/error';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../constants/actionTypes';

//Register User
export const userRegister=(userData)=>async(dispatch)=>{    
    try{
        const {data}=await api.userRegister(userData);        
        dispatch({type:REGISTER_SUCCESS,payload:data});
        dispatch(clearErrors());
    }catch(error){
        dispatch(returnErrors(error.response.data,error.response.status,'REGISTER_FAIL'));
        dispatch({type:REGISTER_FAIL});
        console.log(error.message);
    }
}


export const userLogin=(userData)=>async(dispatch)=>{ 

    try{
        const {data}=await api.userLogin(userData);
        dispatch({type:LOGIN_SUCCESS,payload:data});
        dispatch(clearErrors());
    }catch(error){
        dispatch(returnErrors(error.response.data,error.response.status,'LOGIN_FAIL'));
        dispatch({type:LOGIN_FAIL});
        console.log(error.message);
    }
}

export const logout=()=>async(dispatch)=>{
    try{    
       dispatch({type:LOGOUT_SUCCESS});    
    }catch(error){
        console.log(error);
    }
}




//Check token & load user
export const loadUser=()=>async(dispatch,getState)=>{
    //User loading
    dispatch({type:USER_LOADING});
    try{        
        const {data}=await api.getUser(tokenConfig(getState));  
       // console.log(data);        
        dispatch({type:USER_LOADED,payload:data});
    }catch(error){        
        dispatch(returnErrors(error.response.data,error.response.status));
        dispatch({type:AUTH_ERROR});
    }
   
}

export const tokenConfig = getState=>{
    //Get Token Form Localestorage
    const token = getState().user.token;
    
    //Headers
    const config ={
        headers:{}
    }

    //IF token add to headers
    if(token){
        config.headers['auth-token']=token;
    }
    //config.headers['auth-token']=token;
    return config;
}