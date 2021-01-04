import {LOGIN} from '../constants/actionTypes';

const posts= (user=[],action)=>{
    switch(action.type){           
           
            case LOGIN:
                return [...user,action.payload];
            default:
                return user;
    }

}
export default posts;