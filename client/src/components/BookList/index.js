import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button'
import axios from "axios"
import Alert from "../Alert"

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 300,
        objectFit: 'scale-down'
    },
});

export default function FeaturedPost(props) {
    const classes = useStyles();
    const { books } = props;
    const [currList, setCurrList] = useState([]);
    useEffect(() => {
        let tempList = [];
        books.map(item => {
            let temp = {
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors,
                description: item.volumeInfo.description,
                link: item.volumeInfo.previewLink,
                image: item.volumeInfo.imageLinks.thumbnail
            };
            tempList.push(temp);
        });
        setCurrList(tempList);
    }, [])

    const [open, setOpen] = useState({
        open: false,
        error: false
    });


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen({ ...open, open: false, error: false });
    };


    const handleSave = (i) => {
        console.log(currList[i]);
        axios.post("/api/books", currList[i])
            .then(data => {
                console.log(data);
                setOpen({ ...open, open: true });
            })
            .catch(() => {
                setOpen({ ...open, open: true, error: true });
            })
    }

    return (
        <div>
            {currList.map((book, i) => (
                <Grid item xs={12} md={12} style={{ marginBottom: "15px" }}>
                    <CardActionArea component="a" href="#">
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
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
                                    <Button variant="contained" color="primary" onClick={() => { handleSave(i) }}>
                                        Save
                                    </Button>
                                </CardContent>
                            </div>
                            <Hidden xsDown>
                                <CardMedia className={classes.cardMedia} image={book.image} />
                            </Hidden>
                        </Card>
                    </CardActionArea>
                </Grid>
            ))}
            {open.error ? (<Alert open={open.open} handleClose={handleClose} type="warning">The book has been saved to collection!</Alert>) : (<Alert open={open.open} handleClose={handleClose} type="success">The book was saved to collection!</Alert>)}
        </div>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};


