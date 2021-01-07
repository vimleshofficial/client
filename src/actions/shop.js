import * as api from '../api';
import {GET_SHOP_DATA} from '../constants/actionTypes'
import {returnErrors} from './error';



export const getShopData=()=>async(dispatch)=>{
    try{
        const {data}=await api.getShopData();
        dispatch({type:GET_SHOP_DATA,payload:data});
    }catch(error){
        dispatch(returnErrors(error.response.data,error.response.status));
        console.log(error.message);
    }
}