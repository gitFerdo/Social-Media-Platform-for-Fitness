// WorkoutStatusForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

const WorkoutStatusForm = ( { onSubmit } ) =>
{
    const [ userFullname ] = useState(
        localStorage.getItem( "psnUserFirstName" ) +
        " " +
        localStorage.getItem( "psnUserLastName" )
    );
    const [ distance, setDistance ] = useState( '' );
    const [ pushups, setPushups ] = useState( '' );
    const [ weight, setWeight ] = useState( '' );
    const [ description, setDescription ] = useState( '' );

    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        // onSubmit({ distance, pushups, weight, description });

        try
        {
            const response = await axios( {
                method: "post",
                url: "/api/v1/insertWorkoutStatus",
                headers: {
                    Authorization: localStorage.getItem( "psnToken" ),
                },
                data: {
                    id: null,
                    userId: localStorage.getItem( "psnUserId" ),
                    userFullname: userFullname,
                    distance: distance,
                    pushups: pushups,
                    weight: weight,
                    description: description
                },
            } );

            if ( response.data !== null && response.data.status === "success" )
            {
                console.log( "status shared" )
                // showSuccessMessage("Posted successfully!");
                setDistance( "" );
                setWeight( "" );
                setPushups( "" );
                setDescription( "" );
            }

            if ( response.data !== null && response.data.status === "fail" )
            {
                console.log( "Post failed. Please try again later!" );
            }
        } catch ( error )
        {
            console.log( "Post failed. Please try again later!" );
        }
    };

    return (
        <Form onSubmit={ handleSubmit }>
        <h2>Workout Status Update</h2>
            <Form.Group controlId="distance">
                <Form.Label>Distance Ran (miles) -:</Form.Label>
                <Form.Control type="number" value={ distance } onChange={ ( e ) => setDistance( e.target.value ) } />
            </Form.Group>
            <Form.Group controlId="pushups">
                <Form.Label>Number of Pushup -:</Form.Label>
                <Form.Control type="number" value={ pushups } onChange={ ( e ) => setPushups( e.target.value ) } />
            </Form.Group>
            <Form.Group controlId="weight">
                <Form.Label>Weight Lifted (lbs) -:</Form.Label>
                <Form.Control type="number" value={ weight } onChange={ ( e ) => setWeight( e.target.value ) } />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Brief Description -:</Form.Label>
                <Form.Control as="textarea" value={ description } onChange={ ( e ) => setDescription( e.target.value ) } />
            </Form.Group>
            <Button variant="primary" type="submit">Share Workout Status</Button>
        </Form>
    );
};

export default WorkoutStatusForm;
