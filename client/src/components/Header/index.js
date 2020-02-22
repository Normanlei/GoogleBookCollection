import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link , withRouter} from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

const isActive = (history, path) => {
    console.log(history);
    if (history.pathname === path)
        return { color: 'red' }
    else
        return { color: 'black' }
}
const isPartActive = (history, path) => {
    console.log(history);
    if (history.pathname.includes(path))
        return { color: 'red' }
    else
        return { color: 'black' }
 }

export default function Header() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                <Link to="/">
                    <Button variant="outlined" size="small" style={isActive(window.location,"/")}>Search</Button>
                </Link>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    Norman's Book Collection
        </Typography>
                <Link to='/save'>
                    <Button variant="outlined" size="small" style={isPartActive(window.location,"/save")}>Save</Button>
                </Link>
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};