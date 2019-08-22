import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = (props) => {
    const [movieToUpdate, setMovieToUpdate] = useState(initialState);

    useEffect(() => {
        //const id = props.match.params.id;
        axios
        .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(response => {
            console.log(response.data);
            setMovieToUpdate({ ...response.data })
        })
        .catch(error => console.log(error))
    }, [props.match.params.id]);

    const handleChange = (event) => {
       setMovieToUpdate({ ...movieToUpdate, [event.target.name]: event.target.value })
    };

    const handleSubmit = (event) => {
        axios
        .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movieToUpdate)
        .then(response => {
            console.log(response);
            setMovieToUpdate(response.data)          
        })
        .catch(error => console.log(error));
        props.history.push('/');
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Title'
                    type='text'
                    name='title'
                    value={movieToUpdate.title}
                    onChange={handleChange}
                />
                <input
                    placeholder='Director'
                    type='text'
                    name='director'
                    value={movieToUpdate.director}
                    onChange={handleChange}
                />
                <input
                    placeholder='Metascore'
                    type='text'
                    name='metascore'
                    value={movieToUpdate.metascore}
                    onChange={handleChange}
                />
                <input
                    placeholder='Stars'
                    type='text'
                    name='stars'
                    value={movieToUpdate.stars.toString()}
                    onChange={handleChange}
                />
                <button type='submit'>Update</button> 
            </form>
        </div>
    )
}

export default UpdateForm;