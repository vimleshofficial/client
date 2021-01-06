import React from "react";
import {useSelector} from 'react-redux';
import {Grid,CircularProgress} from '@material-ui/core'
import Post from './Post/Post'
import useStyle from './styles';

const Posts=({setCurrentId})=>{
    const {posts,user}=useSelector((state)=>state);
    const classes=useStyle();
    return(
        !posts.length?<CircularProgress/>:(
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                    posts.map(post=>((post.type==="public" || (user.isAuthenticated && user.user.id===post.creator)) &&
                        <Grid key={post._id} item xs={12} sm={3}>
                            <Post setCurrentId={setCurrentId} post={post} />
                        </Grid>
                    ))
                } 
            </Grid>
        )
    );
}
export default Posts;