import { Button, makeStyles } from '@material-ui/core';
import react from 'react';

const useStyles = makeStyles(theme => ({
    absoluteContainer: {
        position: "fixed",
        top: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        zIndex: 10,
    },
    container: {
        minWidth: "240px",
        maxWidth: "600px",
        width: "90vw",
        borderRadius: 20,
        backgroundColor: "white",
        padding: "20px",
        border: "2px solid grey",
    },
    hidden: {
        display: "hidden",
        visibility: "hidden",
    },
    visible: {

    },
    buttonDiv: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    button: {
        width: "40%",
        minWidth: "100px",
        maxWidth: "150px",
    },
    description: {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
        marginBottom: "40px",
    },
    header: {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}))

const ConfirmationModal = ({isVisible, onConfirm, header, description}) => {
    const classes = useStyles();

    return (
        <>
        {isVisible && 
            <div className={classes.absoluteContainer}>
                <div className={classes.container}>
                    <h1 className={classes.header}>
                       {header}
                    </h1>
                    <hr />
                    <p className={classes.description}>
                        {description}
                    </p>
                    <div className={classes.buttonDiv}>
                        <Button
                        onClick={() => onConfirm()}
                        className={classes.confirmButton}
                        variant="contained"
                        color="primary"
                        >
                            Okay
                        </Button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default ConfirmationModal;