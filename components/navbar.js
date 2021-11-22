import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import Session from './sessionService';

export const NAVBAR_HEIGHT = "80px";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: "center",
        width: "100%",
        height: NAVBAR_HEIGHT,
        maxHeight: "40px",
        backgroundColor: "rgb(0,0,0,0.7)",
        paddingLeft: "30px",
        paddingRight: "30px",
        borderRadius: 10,
    },
    button: {
        color: "white",
    },
    hidden: {
        display: "hidden",
        visibility: "hidden",
    }
}));

const NavBar = ({forceParentRerender = () => { }}) => {
    const classes = useStyles();
    const router = useRouter();
    const [ignored, setIgnored] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(Session.getToken());
    }, [])

    const forceRerender = () => {
        setIgnored(prev => prev + 1);
    }

    const onClickLogin = () => {
        router.push("/login");
    }

    const onClickCreatePost = () => {
        router.push("/createPost");
    }

    const onClickLogout = () => {
        setLoggedIn(false);
        Session.clear();
        if (router.pathname === "/") {
            forceRerender();
            forceParentRerender();
        }
        else {
            router.push("/")
        }
    }

    return (
        <div className={classes.container}>
            <Button className={loggedIn ? classes.button : classes.hidden} onClick={() => { router.push("/") }} disabled={router.pathname === "/"}>
                Home
            </Button>
            <Button className={loggedIn ? classes.button : classes.hidden} onClick={() => { router.push("/myPosts") }} disabled={router.pathname === "/myPosts"}>
                My Posts
            </Button>
            <Button className={loggedIn ? classes.button : classes.hidden} onClick={() => onClickCreatePost()} disabled={router.pathname === "/createPost"}>
                Create Post
            </Button>
            {loggedIn ?
                <Button 
                    className={classes.button}
                    onClick={() => onClickLogout()}
                >
                    Logout
                </Button>
                :
                <Button 
                className={classes.button}
                onClick={() => onClickLogin()}
                >
                    Login
                </Button>
            }
        </div>
    );
};

export default NavBar;
