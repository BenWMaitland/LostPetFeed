import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import NavBar from '../components/navbar';
import { NAVBAR_HEIGHT } from '../components/navbar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import Api from './api';
import Session from '../components/sessionService';
import OkayModal from '../components/okayModal';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        width: "100%",
        height: "100vh",
        padding: "20px",
    },
    subContainer: {
        display: "flex",
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        width: "60%",
        height: `calc(100vh - ${NAVBAR_HEIGHT} - 40px)`,
        backgroundColor: "rgb(0,0,0,0.7)",
        marginTop: "20px",
        marginBottom: "20px",
        [theme.breakpoints.down("xs")]: {
            width: "90%",
        },
    },
    postDiv: {
        paddingLeft: "20px",
        paddingRight: "20px",
        '&::-webkit-scrollbar': {
            width: '0.4em'
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.3)',
            outline: '1px solid slategrey'
          }
    },
    card: {
        borderRadius: 20,
        maxWidth: "800px",
        width: "50vw",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "20px",
        marginBottom: "20px",
    },
    cardImage: {
        maxHeight: "600px",
    },
    label: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    header: {
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "space-evenly",
      marginBottom: 5,
    },
    headerItem: {
        display: "flex",
        width: "100%",
        paddingLeft: 5,
        paddingRight: 5,
    },
    dataItem: {
        display: "flex",
        width: "50%",
        padding: 5,
    },
    description: {
        display: "flex",
        width: "100%",
        padding: 5,
    },
    buttonDiv: {
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: "15px",
    },
    button: {
        minWidth: "100px",
        width: "40%",
        maxWidth: "150px",
        height: "40px",
    },
    pictureButton: {
        minWidth: "100px",
        width: "40%",
        maxWidth: "150px",
        height: "40px",
        backgroundColor: "lightGrey",
        borderRadius: 5,
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        paddingBottom: "4px",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: 'darkGrey'
        },
    },
    hideInput: {
        display: "hidden",
        visibility: "hidden",
        position: "absolute",
    }
}));

const CreatePost = (props) => {
    const classes = useStyles();
    const router = useRouter();

    const statusOptions = [
        "Lost",
        "Found",
    ]

    const speciesOptions = [
        "Dog",
        "Cat",
        "Bird",
        "Rabbit",
        "Other",
    ]

    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [breed, setBreed] = useState("");
    const [species, setSpecies] = useState("");
    const [lastSeen, setLastSeen] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState("");

    const [invalidName, setInvalidName] = useState(false);
    const [invalidStatus, setInvalidStatus] = useState(false);
    const [invalidBreed, setInvalidBreed] = useState(false);
    const [invalidSpecies, setInvalidSpecies] = useState(false);
    const [invalidLastSeen, setInvalidLastSeen] = useState(false);
    const [invalidDescription, setInvalidDescription] = useState(false);
    const [invalidContact, setInvalidContact] = useState(false);

    const [displayModal, setDisplayModal] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden"
    }, [])

    const onClickSubmit = () => {
        const body = {
            name: name,
            status: status,
            type: species,
            breed: breed,
            image: "",
            lastSeen: lastSeen,
            description: description,
            contact: contact,
            username: Session.getUser()?.username,
        }
        Api().post(`http://lb-reunitepetapi-1680165263.us-east-1.elb.amazonaws.com/api/Pets`, body)
        .then((response) => {
            setDisplayModal(true);
            console.log("response.data: ", response.data)
        }).catch((e) => {
            console.log("e: ", e);
        });
    }

    const onClickConfirm = () => {
        setDisplayModal(false);
        router.push("/");
    }

    const handleFileUpload = (event) => {
        var photo = event.target.files[0];

        getBase64(photo, (imageInBase64) => {
            console.log("imageInBase64: ", imageInBase64);
            setImage(imageInBase64);
        });
    }

    function getBase64(photo, cb) {
		let reader = new FileReader();
		reader.readAsDataURL(photo);
		reader.onload = function () {
			cb(reader.result);
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	}

    return (
        <div className={classes.imageContainer}
            style={{backgroundImage: "url(/blurred-web-backgrounds.jpg)"}}
        >
            <div className={classes.container} 
            >
            <NavBar forceParentRerender={() => forceRerender()} />
            
                <div className={classes.subContainer}>
                    <div className={classes.postDiv} style={{overflow: "auto"}}>
                            <Card 
                            root={classes.card}
                            className={classes.card}
                            >
                                {image &&
                                    <CardMedia
                                    component="img"
                                    height="auto"
                                    image={image}
                                    alt="Pet photo"
                                    className={classes.cardImage}
                                    />}
                                <CardContent>
                                    {/* <div className={classes.header}> */}
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <FormControl variant='outlined' fullWidth={true} className={classes.headerItem}>
                                                <InputLabel>Status</InputLabel>
                                                <Select
                                                    value={status}
                                                    className={classes.headerItem}
                                                    onChange={(event) => setStatus(event.target.value)}
                                                    label={"Status"}
                                                    onFocus={() => setInvalidStatus(false)}
                                                    error={invalidStatus}
                                                >
                                                    {statusOptions.map((option) => (
                                                        <MenuItem value={option}>{option}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl variant='outlined' fullWidth={true} className={classes.headerItem}>
                                                <InputLabel>Species</InputLabel>
                                                <Select
                                                    value={species}
                                                    className={classes.headerItem}
                                                    onChange={(event) => setSpecies(event.target.value)}
                                                    label={"Species"}
                                                    onFocus={() => setInvalidSpecies(false)}
                                                    error={invalidSpecies}
                                                >
                                                    {speciesOptions.map((option) => (
                                                        <MenuItem value={option}>{option}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Breed"
                                                type="text"
                                                variant="outlined"
                                                name="breed"
                                                defaultValue={breed}
                                                onKeyPress={(e) => {if (e.key === "Enter") { onClickSubmit() }}}
                                                onChange={(event) => (setBreed(event.target.value), setInvalidBreed(false))}
                                                error={invalidBreed}
                                                onFocus={() => setInvalidBreed(false)}
                                                className={classes.headerItem}
                                            />
                                        </Grid>
                                    </Grid>
                                    {/* </div> */}
                                    <TextField
                                        label="Name"
                                        type="text"
                                        variant="outlined"
                                        name="name"
                                        defaultValue={name}
                                        onKeyPress={(e) => {if (e.key === "Enter") { onClickSubmit() }}}
                                        onChange={(event) => (setName(event.target.value), setInvalidName(false))}
                                        error={invalidName}
                                        onFocus={() => setInvalidName(false)}
                                        className={classes.dataItem}
                                        style={{marginTop: "5px"}}
                                    />
                                    {status === "Lost" &&
                                    <TextField
                                        label="Last Seen (e.g. Kingston and Markham Rd. on Oct 10th)"
                                        type="text"
                                        variant="outlined"
                                        name="lastSeen"
                                        defaultValue={lastSeen}
                                        onKeyPress={(e) => {if (e.key === "Enter") { onClickSubmit() }}}
                                        onChange={(event) => (setLastSeen(event.target.value), setInvalidLastSeen(false))}
                                        error={invalidLastSeen}
                                        onFocus={() => setInvalidLastSeen(false)}
                                        className={classes.description}
                                    />}
                                    <TextField
                                        label="Description"
                                        type="text"
                                        variant="outlined"
                                        name="description"
                                        defaultValue={description}
                                        onKeyPress={(e) => {if (e.key === "Enter") { onClickSubmit() }}}
                                        onChange={(event) => (setDescription(event.target.value), setInvalidDescription(false))}
                                        error={invalidDescription}
                                        onFocus={() => setInvalidDescription(false)}
                                        className={classes.description}
                                    />
                                    <TextField
                                        label="Contact Info"
                                        type="text"
                                        variant="outlined"
                                        name="contact"
                                        defaultValue={contact}
                                        onKeyPress={(e) => {if (e.key === "Enter") { onClickSubmit() }}}
                                        onChange={(event) => (setContact(event.target.value), setInvalidContact(false))}
                                        error={invalidContact}
                                        onFocus={() => setInvalidContact(false)}
                                        className={classes.dataItem}
                                    />
                                    <div className={classes.buttonDiv}>
                                        <input
                                            type='file'
                                            name='file'
                                            multiple="multiple"
                                            id={'file'}
                                            className={classes.hideInput}
                                            accept='application/pdf, image/png, image/jpeg, image/jpg'
                                            onChange={(event) =>
                                                handleFileUpload(event)
                                            }
                                        />
                                        <label
                                            htmlFor={'file'}
                                            className={classes.pictureButton}
                                        >
                                            Set Picture
                                        </label>
                                        <Button
                                            onClick={() => onClickSubmit()}
                                            className={classes.button}
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                    </div>
                </div>
            </div>
            <OkayModal 
                onConfirm={() => { onClickConfirm() }}
                isVisible={displayModal}
                header={"Post Submitted Successfully"}
                description={"Your post has been submitted. Press Okay to be forwarded to the pet feed."}
            />
        </div>
    );
};

export default CreatePost;
