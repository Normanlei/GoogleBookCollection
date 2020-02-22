import React, { useEffect, useState } from 'react'
import Grid from 'material-ui/Grid'
import Search from '../components/Search';
import axios from "axios";

const Home = () => {
    const classes = {
        root: {
            flexGrow: 1,
            margin: 30,
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <Search />
                </Grid>
            </Grid>
        </div>
    )


};

export default Home;