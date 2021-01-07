import React from "react";
import {Card,CardMedia,Typography} from "@material-ui/core";
import noImage from '../../../../images/No_Image_Available.jpg';
import {Link} from 'react-router-dom';
import useStyle from './styles';
const Category=({category})=>{
    const classes=useStyle();
    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={category.category_image? category.category_image:noImage}  title={category.category_name} />
             <div className={classes.overlay}>               
                <Typography variant="h5" ><Link className={classes.white} to={`category/${category.store_category_id}`}>{category.category_name}</Link></Typography>   
             </div>
        </Card>
    );
}

export default Category;