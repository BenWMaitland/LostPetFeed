import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: "center",
        maxWidth: "600px",
        width: "100%",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
    },
}));

const DeleteWarning = ({onClickCancel, onClickConfirm}) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            Other stuff
            <div className={classes.buttonContainer}>
                <Button
                onClick={() => onClickCancel()}
                style={{
                    fontWeight: "400",
                    textTransform: "capitalize",
                    backgroundColor: "grey",
                    color: "black",
                    fontSize: "18px",
                    width: "150px",
                }}
                >
                Cancel
                </Button>
                <Button
                onClick={() => onClickConfirm()}
                style={{
                    color: "black",
                    fontWeight: "400",
                    textTransform: "capitalize",
                    backgroundColor: "red",
                    fontSize: "18px",
                    
                    width: "150px",
                }}
                >
                Delete
                </Button>
            </div>
        </div>
    );
};
export default DeleteWarning;
