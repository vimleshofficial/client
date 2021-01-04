import * as api from '../api';
import {LOGIN} from '../constants/actionTypes';

export const userLogin=(userData)=>async(dispatch)=>{
    try{
        const {data}=await api.userLogin(userData);
        dispatch({type:LOGIN,payload:data});
    }catch(error){
        console.log(error.message);
    }
}