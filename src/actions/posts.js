import * as api from '../api';
import {CREATE,FETCH_ALL,UPDATE,DELETE,LIKE} from '../constants/actionTypes'
import {tokenConfig} from './user';
import {returnErrors} from './error';

//Action Creators
export const getPosts=()=>async(dispatch)=>{
    try{
        const {data}=await api.fetchPost();
        dispatch({type:FETCH_ALL,payload:data});
    }catch(error){
        dispatch(returnErrors(error.response.data,error.response.status));
        console.log(error.message);
    }
}


export const createPost=(post)=>async(dispatch,getState)=>{
    try{
        
        const {data}=await api.createPost(post,tokenConfig(getState));
        dispatch({type:CREATE,payload:data});
    }catch(error){
        dispatch(returnErrors(error.response.data,error.response.status));
        console.log(error.message);
    }
}

export const updatePost=(id,post)=>async(dispatch,getState)=>{
    try{
        const {data}=await api.updatePost(id, post,tokenConfig(getState));
        
        dispatch({type:UPDATE,payload:data});
    }catch(error){
        dispatch(returnErrors(error.response.data,error.response.status));
        console.log(error);
    }
}
export const deletePost=(id)=>async(dispatch,getState)=>{
    try {
        await api.deletePost(id,tokenConfig(getState));
        dispatch({type:DELETE,payload:id});
    } catch (error) {
        dispatch(returnErrors(error.response.data,error.response.status));
        console.log(error);
    }
}

export const likePost=(id)=>async(dispatch,getState)=>{    
    try{        
        const {data}=await api.likePost(id,tokenConfig(getState));
        dispatch({type:LIKE,payload:data});
    }catch(error){
        dispatch(returnErrors(error.response.data,error.response.status));
    }
}