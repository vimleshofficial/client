import {GET_SHOP_DATA} from '../constants/actionTypes';


const shopData= (shopData=[],action)=>{
    switch(action.type){
            case GET_SHOP_DATA:
                return action.payload;           
            default:
                return shopData;
    }

}
export default shopData;