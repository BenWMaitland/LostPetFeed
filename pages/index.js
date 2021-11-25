import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import NavBar from '../components/navbar';
import { NAVBAR_HEIGHT } from '../components/navbar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentSection from '../components/commentSection';
import Api from './api';
import ConfirmationModal from '../components/confirmationModal';
import Session from "../components/sessionService";
import moment from "moment";

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
        // justifyContent: 'center',
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
        width: "100%",
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
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
    },
    deleteButton: {
      fontSize: "16px",
      color: "red",
      cursor: "pointer",
      marginRight: "15px",
    },
    editButton: {
      fontSize: "16px",
      color: "blue",
      cursor: "pointer",
    },
    filterDiv: {
      display: "flex",
      flexDirection: "row",
      padding: "20px",
      marginTop: "10px",
      borderRadius: "10px",
      backgroundColor: "white",
      width: "100%",
      minWidth: "300px",
    },
    filterItem: {
      marginLeft: "5px",
      marginRight: "5px",
    },
}));

const LandingPage = (props) => {
    const classes = useStyles();
    const router = useRouter();

    const [selectedPostId, setSelectedPostId] = useState("");
    const [deletePostId, setDeletePostId] = useState("");
    const [petPosts, setPetPosts] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterSpecies, setFilterSpecies] = useState("All");
    
    const [ignored, setIgnored] = useState(0);
    
    const statusOptions = [
      "All",
      "Lost",
      "Found",
    ]

    const speciesOptions = [
        "All",
        "Dog",
        "Cat",
        "Bird",
        "Rabbit",
        "Other",
    ]

    useEffect(() => {
      fetchPetPosts();
    }, [])

    const fetchPetPosts = () => {
      Api().get(`http://reunitepetswebapi-dev.us-east-1.elasticbeanstalk.com/api/Pets`)
      .then((response) => {
        setPetPosts(response.data.reverse());
        console.log("response.data: ", response.data)
      }).catch((e) => {
        console.log("e: ", e);
     });
    }

    const forceRerender = () => {
        setIgnored(prev => prev + 1);
    }

    const deletePost = (id) => {
      Api().delete(`http://reunitepetswebapi-dev.us-east-1.elasticbeanstalk.com/api/Pets/${id}`)
      .then((response) => {
        console.log("response.data: ", response.data)
        setDeletePostId("");
        fetchPetPosts();
      }).catch((e) => {
        console.log("e: ", e);
      });
    }

    useEffect(() => {
      if (filterStatus === "All" && filterSpecies === "All") {
        fetchPetPosts();
      }
      else {
        Api().get(`http://reunitepetswebapi-dev.us-east-1.elasticbeanstalk.com/api/Pets/filter?type=${filterSpecies}&status=${filterStatus}`,)
        .then((response) => {
          setPetPosts(response.data.reverse());
          console.log("response.data: ", response.data)
        }).catch((e) => {
          console.log("e: ", e);
        });
      }
    }, [filterStatus, filterSpecies])

    return (
        <div className={classes.imageContainer}
            style={{backgroundImage: "url(/blurred-web-backgrounds.jpg)"}}
        >
            
            <div className={classes.container} 
            >
            <NavBar forceParentRerender={() => forceRerender()} />
            
                <div className={classes.subContainer}>
                    <div className={classes.postDiv} style={{overflow: "auto"}}>
                      {(petPosts.length !== 0 || filterStatus !== "All" || filterSpecies !== "All") &&
                      <div className={classes.filterDiv}>
                        <FormControl variant='outlined' fullWidth={true}>
                          <InputLabel> Filter By Status</InputLabel>
                          <Select
                              value={filterStatus}
                              className={classes.filterItem}
                              onChange={(event) => setFilterStatus(event.target.value)}
                              label={"Filter By Status"}
                              >
                              {statusOptions.map((option) => (
                                <MenuItem value={option}>{option}</MenuItem>
                                ))}
                          </Select>
                        </FormControl>
                        <FormControl variant='outlined' fullWidth={true}>
                          <InputLabel> Filter By Species</InputLabel>
                          <Select
                              value={filterSpecies}
                              className={classes.filterItem}
                              onChange={(event) => setFilterSpecies(event.target.value)}
                              label={"Filter By Species"}
                              >
                              {speciesOptions.map((option) => (
                                <MenuItem value={option}>{option}</MenuItem>
                                ))}
                          </Select>
                        </FormControl>
                      </div>}
                        {petPosts.map((dataItem, index) => (
                            <Card 
                            root={classes.card}
                            className={classes.card}
                            key={index}
                            >
                              {dataItem.image &&
                                <CardMedia
                                component="img"
                                height="auto"
                                image={dataItem.image}
                                alt="Pet photo"
                                className={classes.cardImage}
                                />}
                                <CardContent>
                                    <div className={classes.headerRow}>
                                      <Typography gutterBottom variant="h5" component="div" className={classes.header}>
                                        {dataItem.status}
                                        {dataItem.type !== "Other" && " "}
                                        {dataItem.type !== "Other" && dataItem.type}
                                        {" - "}
                                        {dataItem.breed}
                                      </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                          {dataItem.username === Session.getUser()?.username &&
                                          <>
                                            <span className={classes.deleteButton} onClick={() => setDeletePostId(dataItem.petId)}>
                                              Delete
                                          </span>
                                          <span className={classes.editButton} onClick={() => router.push(`/editPost/${dataItem.petId}`)}>
                                              Edit
                                          </span>
                                          </>}
                                      </Typography>
                                    </div>
                                    {dataItem.name && 
                                      <Typography variant="body2" color="textSecondary">
                                        <span className={classes.label}>Name:{" "}</span>
                                        <span>{dataItem.name}</span>
                                    </Typography>}
                                    {dataItem.lastSeen && 
                                      <Typography variant="body2" color="textSecondary">
                                        <span className={classes.label}>Last Seen:{" "}</span>
                                        <span>{dataItem.lastSeen}</span>
                                    </Typography>}
                                    {dataItem.description && 
                                      <Typography variant="body2" color="textSecondary">
                                        <span className={classes.label}>Description:{" "}</span>
                                        <span>{dataItem.description}</span>
                                    </Typography>}
                                    {dataItem.contact && 
                                      <Typography variant="body2" color="textSecondary">
                                        <span className={classes.label}>Contact:{" "}</span>
                                        <span>{dataItem.contact}</span>
                                    </Typography>}
                                    {dataItem.postDate && 
                                      <Typography variant="body2" color="textSecondary">
                                        <span className={classes.label}>Date Posted:{" "}</span>
                                        <span>{moment(new Date(dataItem.postDate.toString() + "Z")).format("MMMM Do, YYYY - h:mm A ")}</span>
                                    </Typography>}
                                </CardContent>
                                <CardActions>
                                    <Accordion elevation={0} style={{width: "100%"}}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                                            onClick={() => setSelectedPostId(dataItem.petId)}
                                        >
                                            <Grid item xs={12}>
                                                <Grid item xs={12}>
                                                    <p className={classes.sectionHeader}>View Comments</p>
                                                </Grid>
                                            </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <CommentSection postId={dataItem.petId} selectedPostId={selectedPostId} />
                                        </AccordionDetails>
                                    </Accordion>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <ConfirmationModal 
                onConfirm={() => { deletePost(deletePostId) }}
                onCancel={() => { setDeletePostId("") }}
                isVisible={deletePostId}
                header={"Delete Post?"}
                description={"Are you sure you want to delete this post?"}
            />
        </div>
    );
};

export default LandingPage;
