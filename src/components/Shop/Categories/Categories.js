import React,{useEffect,useState} from "react";
import Category from './Category/Catecory';
import {useSelector} from 'react-redux';
import useStyle from './styles';
import {Grid,CircularProgress} from '@material-ui/core'

const Categories=()=>{
    const [categories,setCategories]=useState(null);
    const data=useSelector((state)=>state.shopData.data);
    useEffect(() => {
        if(data)
        setCategories(data.category);
      },[data]);
    const classes=useStyle();
    //console.log(categories);
    return(
        !categories?<CircularProgress/>:(
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                    categories.map(category=>(
                        <Grid key={category.store_category_id} item xs={6} sm={4}>
                           <Category category={category} />
                        </Grid>
                    ))
                } 
            </Grid>
        )
    );
    
}
export default Categories;

