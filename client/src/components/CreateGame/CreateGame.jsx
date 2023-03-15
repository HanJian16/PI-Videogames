import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postGame, getGenres } from "../../redux/actions/index.js";

export default function CreateGame() {
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const [input, setInput] = useState({
        name: "",
        description: "",
        platforms: [],
        background_image: "",
        released: "",
        rating: 0.0,
        genre: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : [e.target.value]
        })
    }

    useEffect(() => {
        console.log('hola')
        dispatch(getGenres());
    }, [])

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu personaje</h1>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text"
                        value={input.name}
                        name='name'
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text"
                        value={input.description}
                        name="description"
                    />
                </div>
                <div>
                    <label>Plataformas:</label>
                    <input type="text"
                        value={input.platforms}
                        name='platforms'
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="text"
                        value={input.background_image}
                        name='background_image'
                    />
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input type="text"
                        value={input.released}
                        name='released'
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="text"
                        value={input.rating}
                        name='rating'
                    />
                </div>
                <select>
                    {genres.map((gen) =>  {
                        <option value={gen.name}>{gen.name}</option>
                    })}
                </select>
                <button type="submit">Crear Personaje</button>
            </form>
        </div>
    )
}