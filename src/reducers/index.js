import {combineReducers} from 'redux';
import posts from './posts';
import user from './user';
import error from './error';
import shopData from './shop'
export default combineReducers({ posts,user,error,shopData});