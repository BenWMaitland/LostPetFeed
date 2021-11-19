import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        maxWidth: "600px",
        width: "90%",
    },
}));

const DeleteWarning = ({onClickCancel, onClickConfirm}) => {
    const classes = useStyles();

    return (
        <div>
            <Button
            onClick={() => onClickCancel()}
            style={{
                fontWeight: "400",
                textTransform: "capitalize",
                // backgroundColor: theme.palette.background.flamingo,
                // color: theme.palette.background.default,
                fontSize: "18px",
                width: "120px",
            }}
            >
            Cancel
            </Button>
            <Button
            onClick={() => onClickConfirm()}
            style={{
                // color: theme.palette.buttonPrimary.main,
                marginLeft: 20,
                fontWeight: "400",
                textTransform: "capitalize",
                // backgroundColor: theme.palette.background.default,
                fontSize: "18px",
                maxWidth: "150px",
            }}
            >
            Delete
            </Button>
        </div>
    );
};
export default DeleteWarning;
