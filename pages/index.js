import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import NavBar from '../components/navbar';
import { NAVBAR_HEIGHT } from '../components/navbar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@material-ui/core';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentSection from '../components/commentSection';
import ConfirmationModal from '../components/confirmationModal';

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
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "20px",
        marginBottom: "20px",
    },
    cardImage: {
        maxHeight: "600px",
    },
}));

const dummyData = [
    {
        id: "1",
        imageUrl: "/sampledog.jpg",
    },
    {
        id: "2",
        imageUrl: "/cutecat.jpg",
    },
    {
        id: "3",
        imageUrl: "/cutecat.jpg",
    },
    {
        id: "4",
        imageUrl: "/cutecat.jpg",
    },
    {
        id: "5",
        imageUrl: "/sampledog.jpg",
    },
];

const LandingPage = (props) => {
    const classes = useStyles();
    const router = useRouter();

    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState("");
    const [deleteCommentId, setDeleteCommentId] = useState("");
    
    const [ignored, setIgnored] = useState(0);

    const forceRerender = () => {
        setIgnored(prev => prev + 1);
    }

    const handleDelete = () => {
        // API call to delete
        setDeleteCommentId("");
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
                        {dummyData.map((dataItem, index) => (
                            <Card 
                            root={classes.card}
                            className={classes.card}
                            key={index}
                            >
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={dataItem.imageUrl}
                                    alt="green iguana"
                                    className={classes.cardImage}
                                    />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Header
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                    Description of missing pet, with location and contact info
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Accordion elevation={0} style={{width: "100%"}}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                                            onClick={() => setSelectedPostId(dataItem.id)}
                                        >
                                            <Grid item xs={12}>
                                                <Grid item xs={12}>
                                                    <p className={classes.sectionHeader}>View Comments</p>
                                                </Grid>
                                            </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <CommentSection postId={dataItem.id} selectedPostId={selectedPostId} setDeleteCommentId={(id) => setDeleteCommentId(id)} />
                                        </AccordionDetails>
                                    </Accordion>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <ConfirmationModal 
                onDelete={() => { setDeleteCommentId("") }}
                onCancel={() => { setDeleteCommentId("") }}
                isVisible={deleteCommentId}
                header={"Delete Comment?"}
                description={"Are you sure you want to delete this comment?"}
            />
        </div>
    );
};

export default LandingPage;
