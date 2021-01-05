import React,{useState,useEffect} from "react";
import {
        TextField,
        Button,
        Paper,
        Dialog,
        DialogContent,
        DialogTitle,
        DialogActions
     } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux'

import useStyle from './styles';
import {createPost, updatePost} from "../../actions/posts";



const Form=({setCurrentId,currentId})=>{
    const [postData,setPostData]=useState({
        creator:'',
        title:'',
        description:'',
        tags:'',
        selectedFile:''
    });
    const [open, setOpen] = useState(false);

    const post=useSelector((state)=>currentId?state.posts.find((p)=> p._id===currentId):null);
    const {user}=useSelector((state)=>state);
    const classes=useStyle();
    const dispatch=useDispatch();

    useEffect(()=>{
        if(post) setPostData(post);
        if(currentId) handleClickOpen();
    },[post,currentId]);

    const handleSubmit=(e)=>{
       e.preventDefault();
       if(currentId){
            dispatch(updatePost(currentId,postData));            
        }else{
           dispatch(createPost(postData));          
       }
       clear();
       handleClose();
    }
    const clear=()=>{
        setCurrentId(null);
        setPostData({
            creator:'',
            title:'',
            description:'',
            tags:'',
            selectedFile:''
        });
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        clear();
        setOpen(false);
    };

    return(user.isAuthenticated && 
        <div className={classes.form}>
            <Button variant="contained" color="primary" onClick={handleClickOpen} style={{float:"left"}}>
               Add Post
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="customized-dialog-title">
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>{currentId?"Editing":"Creating"} A Memory </DialogTitle>
                <DialogContent>
                    <Paper className={classes.paper}>
                        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                            
                            <TextField 
                                name="creator" 
                                variant="outlined" 
                                label="Creator"
                                fullWidth
                                value={postData.creator}
                                onChange={(e)=>setPostData({...postData,creator:e.target.value})}
                            />
                            <TextField 
                                name="title" 
                                variant="outlined" 
                                label="Title"
                                fullWidth
                                value={postData.title}
                                onChange={(e)=>setPostData({...postData,title:e.target.value})}
                            />
                            <TextField 
                                name="description" 
                                variant="outlined" 
                                label="Description"
                                fullWidth
                                value={postData.description}
                                onChange={(e)=>setPostData({...postData,description:e.target.value})}
                            />
                            <TextField 
                                name="tags" 
                                variant="outlined" 
                                label="Tags"
                                fullWidth
                                value={postData.tags}
                                onChange={(e)=>setPostData({...postData,tags:e.target.value.split(",")})}
                            />
                            <div className={classes.fileInput}>
                                <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({base64})=>{setPostData({...postData,selectedFile:base64});
                                        
                                    }}
                                />
                            </div>
                        <Button 
                                className={classes.buttonSubmit} 
                                variant="contained" 
                                color="primary"
                                size="large"
                                type="submit"
                                fullWidth
                            >Submit
                            </Button>
                            <Button                        
                                variant="contained" 
                                color="secondary"
                                size="small"
                                onClick={clear}
                                fullWidth
                            >Clear
                            </Button>
                        </form>
                    </Paper>    
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>                
            </Dialog>            
        </div>
    );
}
export default Form;