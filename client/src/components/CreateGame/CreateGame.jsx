import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postGame, getGenres } from "../../redux/actions/index.js";

function validate(input) {
    let errors = {};
    if(!input.name) errors.name = 'Se requiere un nombre';
    else if(!input.description) errors.description = 'Se requiere una descripción';
    else if(!input.platforms[0]) errors.platforms = 'Se requiere al menos una plataforma';
    else if(!input.background_image) errors.background_image = 'Se requiere una imagen';
    else if(!input.released) errors.released = 'Se requiere una fecha de lanzamiento';
    else if(!input.rating) errors.rating = 'Se requiere un rating';
    else if(!input.genre[0]) errors.genre = 'Se requiere al menos un género';
    return errors;
}

export default function CreateGame() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(state => state.genres);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        description: "",
        platforms: [],
        background_image: "",
        released: "",
        rating: '',
        genre: []
    })


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handlePlatforms(e){
        let allPlatforms = e.target.value.split(',')
        setInput({
            ...input,
            platforms: allPlatforms
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            genre: [...input.genre, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postGame(input))
        alert('personaje creado')
        setInput({
            name: "",
            description: "",
            platforms: [],
            background_image: "",
            released: "",
            rating: '',
            genre: []
        })
        history.push('/home')
    }

    function handleDelete(el){
        setInput({
            ...input,
            genre: input.genre.filter(genre => genre !== el)
        })
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [])

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu personaje</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={input.name}
                        name='name'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.description && (
                        <p className="error">{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Plataformas:</label>
                    <input
                        type="text"
                        value={input.platforms}
                        name='platforms'
                        onChange={(e) => handlePlatforms(e)}
                    />
                    {errors.platforms && (
                        <p className="error">{errors.platforms}</p>
                    )}
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                        type="text"
                        value={input.background_image}
                        name='background_image'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.background_image && (
                        <p className="error">{errors.background_image}</p>
                    )}
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input
                        type="date"
                        value={input.released}
                        name='released'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.released && (
                        <p className="error">{errors.released}</p>
                    )}
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        step='any'
                        value={input.rating}
                        name='rating'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.rating && (
                        <p className="error">{errors.rating}</p>
                    )}
                </div>
                <select onChange={(e)=>handleSelect(e)}>
                    {genres?.map((gen) => (
                        <option value={gen.name} key={gen.id}>{gen.name}</option>
                    ))}
                </select>
                <button type="submit">Crear Personaje</button>
            </form>
            {input.genre.map((el, id)=>
                <div className="divGen" key={id}>
                    <p>{el}</p>
                    <button className="buttonX" onClick={()=>handleDelete(el)}>X</button>
                </div>
                )}
        </div>
    )
}