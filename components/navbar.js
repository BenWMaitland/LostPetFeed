import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

export const NAVBAR_HEIGHT = "80px";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // alignItems: 'center',
        alignSelf: "center",
        width: "100%",
        height: NAVBAR_HEIGHT,
        backgroundColor: "rgb(0,0,0,0.7)",
        paddingLeft: "30px",
        paddingRight: "30px",
        borderRadius: 10,
        // [theme.breakpoints.down('xs')]: {
            
        // },
    },
    button: {
        color: "white",
    },
}));

const NavBar = (props) => {
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.container}>
            <Button className={classes.button}>
                My Posts
            </Button>
            <Button className={classes.button}>
                Create Post
            </Button>
            <Button className={classes.button}>
                Logout
            </Button>
        </div>
    );
};

export default NavBar;
