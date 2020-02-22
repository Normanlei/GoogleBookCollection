import React, { useState } from 'react'
import Card from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SearchIcon from 'material-ui-icons/Search'
import { createMuiTheme } from 'material-ui/styles'
import axios from "axios"
import BookList from "../BookList"
import Typography from '@material-ui/core/Typography';
import Alert from "../Alert"


const Search = () => {
    const theme = createMuiTheme();
    const classes = {
        card: {
            margin: 'auto',
            textAlign: 'center',
            paddingTop: 10,
            backgroundColor: 'white'
        },
        menu: {
            width: 200,
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 130,
            verticalAlign: 'bottom',
            marginBottom: '20px'
        },
        searchField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: '60%',
            marginBottom: '20px'
        },
        searchButton: {
            minWidth: '20px',
            height: '30px',
            padding: '0 8px'
        }
    };

    const [open, setOpen] = useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [state, setState] = useState({
        search: '',
        results: [],
        searched: false,
    });

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        })
    };

    const search = () => {
        if (state.search) {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${state.search}`)
                .then(data => {
                    console.log(data.data.items);
                    setState({ ...state, results: data.data.items, searched: true });
                })
                .catch(err => {
                    console.error(err);
                })
        }else{
            setOpen(true);
        }
    };

    const enterKey = (event) => {
        if (event.keyCode == 13) {
            event.preventDefault()
            search();
        }
    };

    return (
        <div >
            <Card style={classes.card}>
                <TextField
                    id="search"
                    label="Search Books"
                    type="search"
                    onKeyDown={enterKey}
                    onChange={handleChange('search')}
                    style={classes.searchField}
                    margin="normal"
                />
                <Button variant="raised" color={'primary'} style={classes.searchButton} onClick={search}>
                    <SearchIcon />
                </Button>
                <Divider />

                {state.results.length > 0 && <BookList books={state.results} />}
                {state.searched && state.results.length === 0 && <Typography component="h2" variant="h5">Oops!No Book Was Found!</Typography>}
            </Card>
            <Alert open={open} handleClose={handleClose} type="warning">Please enter a valid query!!!</Alert>
        </div>

    )
}


export default Search;
