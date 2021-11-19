import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import NavBar from '../components/navbar';
import { NAVBAR_HEIGHT } from '../components/navbar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        width: "100%",
        // height: `calc(100vh - ${NAVBAR_HEIGHT})`,
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
}));

const dummyData = [
    "", 
    "", 
    "", 
    "", 
    "", 
    "", 
    "", 
    "", 
];

const LandingPage = (props) => {
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.imageContainer}
            style={{backgroundImage: "url(/blurred-web-backgrounds.jpg)"}}
        >
            <div className={classes.container} 
            >
            <NavBar />
                <div className={classes.subContainer}>
                    <div className={classes.postDiv} style={{overflow: "auto"}}>
                        {dummyData.map((dataItem, index) => (
                            <Card 
                            // sx={{ maxWidth: 345 }} 
                            root={classes.card}
                            className={classes.card}
                            key={index}
                            >
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    // img={{height: "40px"}}
                                    image="/sampledog.jpg"
                                    alt="green iguana"
                                    />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
