import React from 'react';
import {useState, useEffect} from 'react';
import SingleCard from "../SingleCard/SingleCard";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

}));



const CardsContainer = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/home/events")
            .then(res => res.json())
            .then(
                (result) => {
                    setEvents(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])
    const classes = useStyles();

    const onLinkClickHandler= (id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        };
        fetch('http://127.0.0.1:8000/click/add_click/', requestOptions)
            .then(response => response.json())
            .catch(error => console.log(error))
    }


    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={10}>
                    {events.map((event) => (
                        <Grid key={event.id} item>
                            <a
                                href={event.facebook_link.replace("www.","//")}
                                target={"_blank"}
                                key={event.id}
                                onClick={()=>{onLinkClickHandler(event.id)}}>
                                <SingleCard
                                    date={event.date}
                                    title={event.name}
                                    description={event.description}
                                    imageURL="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                />
                            </a>


                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>


    );
};

export default CardsContainer;