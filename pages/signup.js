import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useRouter } from 'next/router';

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
    firstnamefield: {
        width: "100%",
        marginTop: "5px",
        marginBottom: "5px",
        marginLeft: "5px",
    },
    firstnameDiv: {
        width: "50%",
        marginTop: "5px",
        marginBottom: "5px",
    },
    lastnamefield: {
        width: "100%",
        marginTop: "5px",
        marginBottom: "5px",
        marginLeft: "5px",
    },
    lastnameDiv: {
        width: "50%",
        marginTop: "5px",
        marginBottom: "5px",
        marginLeft: "5px",
    },
    nameInputs: {
        marginTop: "45px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
const Signup = (props) => {
    const classes = useStyles();
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [invalidFirstName, setInvalidFirstName] = useState(false);
    const [invalidLastName, setInvalidLastName] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);

    const validate = () => {
        var isValid = true;

        firstName === "" ? (setInvalidFirstName(true), isValid = false) : null;
        lastName === "" ? (setInvalidLastName(true), isValid = false) : null;
        username === "" ? (setInvalidUsername(true), isValid = false) : null;
        password === "" ? (setInvalidPassword(true), isValid = false) : null;
        (confirmPassword === "" || confirmPassword !== password) ? (setInvalidConfirmPassword(true), isValid = false) : null;

        return isValid;
    }

    const onClickSignup = () => {
        if (validate()) {
            handleSubmit();
        }
    }

    const handleSubmit = () => {

    }


    return (
        <div className={classes.container} 
            style={{backgroundImage: "url(/327832.jpg)"}}
        >
            <div className={classes.inputArea}>
                <h1>
                    Lost Pet Feed
                </h1>
                <div className={classes.nameInputs}>
                    <div className={classes.firstnameDiv}>
                        
                    <TextField
                        label="First Name"
                        type="text"
                        variant="outlined"
                        name="firstName"
                        defaultValue={username}
                        onKeyPress={(e) => {if (e.key === "Enter") { onClickSignup() }}}
                        onChange={(event) => (setFirstName(event.target.value), setInvalidFirstName(false))}
                        size="small"
                        className={classes.firstnamefield}
                        error={invalidFirstName}
                        onFocus={() => setInvalidFirstName(false)}
                        autoFocus
                        />
                        {invalidFirstName && (
                            <FormHelperText className={classes.error} error>Please enter your first name</FormHelperText>
                        )}
                    </div>

                    <div className={classes.lastnameDiv}>
                        
                        <TextField
                            label="Last Name"
                            type="text"
                            variant="outlined"
                            name="lastName"
                            defaultValue={username}
                            onKeyPress={(e) => {if (e.key === "Enter") { onClickSignup() }}}
                            onChange={(event) => (setLastName(event.target.value), setInvalidLastName(false))}
                            size="small"
                            className={classes.lastnamefield}
                            error={invalidLastName}
                            onFocus={() => setInvalidLastName(false)}
                            />
                            {invalidLastName && (
                                <FormHelperText className={classes.error} error>Please enter your last name</FormHelperText>
                            )}
                    </div>
                </div>

                <TextField
                    label="Username"
                    type="text"
                    variant="outlined"
                    name="username"
                    defaultValue={username}
                    onKeyPress={(e) => {if (e.key === "Enter") { onClickSignup() }}}
                    onChange={(event) => (setUsername(event.target.value), setInvalidUsername(false))}
                    size="small"
                    className={classes.textfield}
                    error={invalidUsername}
                    onFocus={() => setInvalidUsername(false)}
                    />
                    {invalidUsername && (
                        <FormHelperText className={classes.error} error>Please enter a username</FormHelperText>
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
                        onKeyPress={(e) => {if (e.key === "Enter") { onClickSignup() }}}
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
                <FormControl 
                    variant="outlined" 
                    className={classes.textfield} 
                    size="small"
                >
                    <InputLabel
                        htmlFor="outlined-adornment-password"
                    >
                        Confirm Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onKeyPress={(e) => {if (e.key === "Enter") { onClickSignup() }}}
                        onChange={(event) => (setConfirmPassword(event.target.value), setInvalidConfirmPassword(false))}
                        onFocus={() => setInvalidConfirmPassword(false)}
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
                        labelWidth={136}
                        error={invalidConfirmPassword}
                    />
                </FormControl>
                {invalidConfirmPassword && (
                    <FormHelperText className={classes.error} error>Please ensure your passwords match</FormHelperText>
                )}
                <Button
                    onClick={() => onClickSignup()}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </Button>
                <div 
                    style={{marginTop: "15px"}}
                >
                    Already have an account?{" "}
                    <a className={classes.link} onClick={() => router.push("login")}>
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
