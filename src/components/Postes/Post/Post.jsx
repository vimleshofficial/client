import React from "react";
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import useStyle from './styles';
import {useDispatch,useSelector} from 'react-redux'
import {deletePost,likePost} from '../../../actions/posts';



const Post=({post,setCurrentId})=>{
    const classes=useStyle();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state);
    //console.log(post);
    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile}  title={post.title} />
             <div className={classes.overlay}>
               {
                (user.isAuthenticated && user.user.id===post.creator) ? 
                <Typography variant="h6" >{user.user.name}</Typography>
                :
                <Typography variant="h6" >{post.userinfo[0].name}</Typography>                
                }
                <Typography variant="body2" >{moment(post.date).fromNow()}</Typography>   
             </div>
             {(user.isAuthenticated && user.user.id===post.creator) &&  <div className={classes.overlay2}>
                <Button style={{color:'white',}} size="small"  onClick={()=>setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default"/>
                </Button>
             </div>}
            <div className={classes.details}>
                <Typography variant="body2"  color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom >{post.title}</Typography>
            <CardContent>
                <Typography  variant="body2" component="p" color="textSecondary" gutterBottom >{post.description}</Typography>
            </CardContent>
            {user.isAuthenticated && <CardActions  className={classes.cardActions}>
                <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like
                    {post.likeCount}
                </Button>
                {(user.isAuthenticated && user.user.id===post.creator) && <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>}
            </CardActions>}            
        </Card>
    );
}
export default Post;