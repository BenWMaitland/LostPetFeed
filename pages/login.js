import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useRouter } from 'next/router';
import Session from '../components/sessionService';
import Api from './api';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        width: "100vw",
        height: "100vh",
    },
    inputArea: {
        textAlign: "center",
        width: "50%",
        maxWidth: "700px",
        minWidth: "300px",
        backgroundColor: "rgb(255,255,255,0.3)",
        borderColor: "rgb(0,0,0,0.9)",
        borderWidth: 10,
        padding: 30,
        borderRadius: 10
    },
    textfield: {
        width: "100%",
        margin: "5px",
    },
    headerDiv: {
        width: "60%",
        height: "20vh",
        maxHeight: "200px",
        minHeight: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    link: {
        color: "blue",
        cursor: "pointer",
    },
    text: {
        fontSize: "16px",
    },
    button: {
        fontWeight: "600",
        textTransform: "capitalize",
        fontSize: "18px",
        maxWidth: "150px",
        height: "50px",
        width: "100px",
        backgroundColor: "rgb(40,40,180,0.8)",
        margin: "10px",
    },
    error: {
        marginLeft: "5px",
    },
}));
const Login = (props) => {
    const classes = useStyles();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
      document.title = "Lost Pet Feed";
    }, [])

    const validate = () => {
        var isValid = true;
        setLoginError(false);

        username === "" ? (setInvalidUsername(true), isValid = false) : null;
        password === "" ? (setInvalidPassword(true), isValid = false) : null;

        return isValid;
    }

    const onClickLogin = () => {
        if (validate()) {
            handleLogin();
        }
    }

    const handleLogin = () => {
        var body = {
            username: username,
            password: password
        }
        Api()
        .post("http://reunitepetswebapi-dev.us-east-1.elasticbeanstalk.com/api/AppUsers/Authenticate", body)
        .then((response) => {
            console.log("response is ", response);
            Session.setToken(response.data);
            Session.setUser(response.data);
            router.push("/");
        })
        .catch((e) => {
            console.log("e: ", e);
            console.log("e.message: ", e.message);
            console.log("e.response: ", e.response);
            
            setLoginError(true);
        });
    }

    return (
        <div className={classes.container} 
            style={{backgroundImage: "url(/327832.jpg)"}}
        >
            <div className={classes.inputArea}>
                <h1>
                    Lost Pet Feed
                </h1>
                <TextField
                    label="Username"
                    type="text"
                    variant="outlined"
                    name="username"
                    defaultValue={username}
                    onKeyPress={(e) => {if (e.key === "Enter") { onClickLogin() }}}
                    onChange={(event) => (setUsername(event.target.value), setInvalidUsername(false))}
                    error={invalidUsername}
                    onFocus={() => setInvalidUsername(false)}
                    size="small"
                    className={classes.textfield}
                    style={{marginTop: "25px"}}
                    autoFocus
                />
                {invalidUsername && (
                    <FormHelperText className={classes.error} error>Please enter your username</FormHelperText>
                )}

                <FormControl 
                    variant="outlined" 
                    className={classes.textfield} 
                    size="small"
                >
                    <InputLabel
                        htmlFor="outlined-adornment-password"
                    >
                        Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onKeyPress={(e) => {if (e.key === "Enter") { onClickLogin() }}}
                        onChange={(event) => (setPassword(event.target.value), setInvalidPassword(false))}
                        onFocus={() => setInvalidPassword(false)}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(prev => !prev)}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={75}
                        error={invalidPassword}
                    />
                </FormControl>
                {invalidPassword && (
                    <FormHelperText className={classes.error} error>Please enter your password</FormHelperText>
                )}
                {loginError && (
                    <FormHelperText className={classes.error} error>Invalid username or password</FormHelperText>
                )}
                <Button
                    onClick={() => onClickLogin()}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
                <div 
                    style={{marginTop: "15px"}}
                >
                    Don't have an account?{" "}
                    <a className={classes.link} onClick={() => router.push("signup")}>
                        Sign Up
                    </a>
                </div>
                <div 
                    style={{marginTop: "15px"}}
                >
                    Just looking?{" "}
                    <a className={classes.link} onClick={() => router.push("/")}>
                        View Home Page
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
