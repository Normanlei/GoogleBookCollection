import React, { useEffect, useState } from 'react'
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button'
import Alert from "../components/Alert"


const Save = () => {
    const classes = {
        card: {
            display: 'flex',
        },
        cardDetails: {
            flex: 1,
        },
        cardMedia: {
            width: 160,
        },
    };

    const [state, setState] = useState({
        currList:[],
        open: false
    });



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setState({...state, open:false});
    };

    useEffect(() => {
        axios.get("/api/books")
            .then(data => {
                console.log(data.data);
                setState({...state,currList:data.data});
            })
    }, [])

    const handleDelete = (i) => {
        let tempList = state.currList;
        let deleteId = state.currList[i]._id
        tempList.splice(i, 1);
        axios.delete(`/api/books/${deleteId}`)
            .then(() => {
                setState({...state, currList:tempList, open:true});
            })
    };

    return (
        <div>
            {state.currList.map((book, i) => (
                <Grid item xs={12} md={12} style={{ marginBottom: "15px" }}>
                    <CardActionArea component="a" href="#">
                        <Card style={classes.card}>
                            <div style={classes.cardDetails}>
                                <CardContent style={{ textAlign: "left" }}>
                                    <Typography component="h2" variant="h5">
                                        {book.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Writen by {book.authors.map(author => (<span>{author} </span>))}
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        {book.description}
                                    </Typography>
                                    <a href={book.link} target="_blank"><Typography variant="subtitle1" color="primary">
                                        Continue reading...
                                    </Typography></a>
                                    <Button variant="contained" color="secondary" onClick={() => { handleDelete(i) }}>
                                        Delete
                                    </Button>
                                </CardContent>
                            </div>
                            <Hidden xsDown>
                                <CardMedia style={classes.cardMedia} image={book.image} />
                            </Hidden>
                        </Card>
                    </CardActionArea>
                </Grid>
            ))}
            <Alert open={state.open} handleClose={handleClose} type="warning">The Book was Deleted!!!</Alert>
        </div>
    )


};

export default Save;