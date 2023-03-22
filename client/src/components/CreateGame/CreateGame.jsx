import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postGame, getGenres } from "../../redux/actions/index.js";
import * as css from "./CreateGame.module.css";



export default function CreateGame() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(state => state.genres);
    const [isFormValid, setIsformValid] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        platforms: "",
        background_image: "",
        released: "",
        rating: "",
        genre: ""
    });

    const [input, setInput] = useState({
        name: "",
        description: "",
        platforms: [],
        background_image: "",
        released: "",
        rating: '',
        genre: []
    });

    function validate() {
        const newErrors = {};
        let key = true;

        if (!/^.{3,10}$/.test(input.name)) {
            newErrors.name = "Se requiere un nombre entre 3 y 10 carácteres";
            key = false;
        };
        if (!/^.{3,80}$/.test(input.description)) {
            newErrors.description = "Se requiere una descripción entre 3 y 80 carácteres";
            key = false;
        }
        if (!/^(https?|data):[^ "]+$/i.test(input.background_image)) {
            newErrors.background_image = "Necesitas ingresar una Url";
            key = false;
        };
        if (!/^([0-4](\.\d{1,2})?|5(\.0{1,2})?)$|^([0-4]?(\.\d{1,2})?|5(\.0{1,2})?)$/.test(input.rating)) {
            newErrors.rating = "Se necesita un número entero o decimal";
            key = false;
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(input.released)) {
            newErrors.released = "Se necesita una fecha menor al año 2023";
            key = false;
        }
        if (!input.genre[0]) {
            newErrors.genre = "Necesitas al menos 1 género";
            key = false;
        }
        if(!/^[a-zA-Z0-9,-\s]+$/.test(input.platforms)) {
            newErrors.platforms = "Necesitas al menos una plataforma";
            key = false;
        }

        setErrors(newErrors);
        setIsformValid(key);
    }

    useEffect(() => {
        validate();
    }, [input])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handlePlatforms(e) {
        let allPlatforms = e.target.value.split(',')
        setInput({
            ...input,
            platforms: allPlatforms
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            genre: [...input.genre, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postGame(input))
        alert('personaje creado')
        setInput({
            name: "",
            description: "",
            platforms: [],
            background_image: "",
            released: "",
            rating: "",
            genre: []
        })
        history.push('/home')
    }

    function handleDelete(el) {
        setInput({
            ...input,
            genre: input.genre.filter(genre => genre !== el)
        })
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [])

    return (
        <div className={css.divContainer}>
            <div>
                <h1 className={css.colorText}>Crea tu personaje</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label
                            className={css.colorText}
                            htmlFor='name'
                        >Nombre:</label>
                        <input
                            type="text"
                            value={input.name}
                            name='name'
                            onChange={(e) => handleChange(e)}
                            className={css.input}
                            placeholder='Agrega tu nombre'
                        />
                        {errors.name && (
                            <label className={css.pError}>{errors.name}</label>
                        )}
                    </div>
                    <div>
                        <label
                            className={css.colorText}
                            htmlFor='description'
                        >Description:</label>
                        <input
                            type="text"
                            value={input.description}
                            name="description"
                            onChange={(e) => handleChange(e)}
                            className={css.input}
                            placeholder='Agrega una descripción'
                        />
                        {errors.description && (
                            <label className={css.pError}>{errors.description}</label>
                        )}
                    </div>
                    <div>
                        <label
                            className={css.colorText}
                            htmlFor='platforms'
                        >Plataformas:</label>
                        <input
                            type="text"
                            value={input.platforms}
                            name='platforms'
                            onChange={(e) => handlePlatforms(e)}
                            className={css.input}
                            placeholder='Agrega las plataformas'
                        />
                        {errors.platforms && (
                            <label className={css.pError}>{errors.platforms}</label>
                        )}
                    </div>
                    <div>
                        <label
                            className={css.colorText}
                            htmlFor='background_image'
                        >Imagen:</label>
                        <input
                            type="text"
                            value={input.background_image}
                            name='background_image'
                            onChange={(e) => handleChange(e)}
                            className={css.input}
                            placeholder='Agrega la url de tu imagen'
                        />
                        {errors.background_image && (
                            <label className={css.pError}>{errors.background_image}</label>
                        )}
                    </div>
                    <div>
                        <label
                            className={css.colorText}
                            htmlFor='released'
                        >Fecha de lanzamiento:</label>
                        <input
                            type="date"
                            value={input.released}
                            name='released'
                            onChange={(e) => handleChange(e)}
                            className={css.input}
                            placeholder='Agrega el día de lanzamiento'
                            min="1950-01-01"
                            max="2023-12-31"
                        />
                        {errors.released && (
                            <label className={css.pError}>{errors.released}</label>
                        )}
                    </div>
                    <div>
                        <label
                            className={css.colorText}
                            htmlFor='rating'
                        >Rating:</label>
                        <input
                            type="number"
                            step='any'
                            value={input.rating}
                            name='rating'
                            onChange={(e) => handleChange(e)}
                            className={css.input}
                            placeholder='Agrega el rating'
                        />
                        {errors.rating && (
                            <label className={css.pError}>{errors.rating}</label>
                        )}
                    </div>
                    <select onChange={(e) => handleSelect(e)}>
                        {genres?.map((gen) => (
                            <option value={gen.name} key={gen.id}>{gen.name}</option>
                        ))}
                    </select>
                    {errors.genre && (
                        <label className={css.pError}>{errors.genre}</label>
                    )}
                    <button type="submit" disabled={!isFormValid} className={css.button}>Crear Game</button>
                </form>
                {input.genre.map((el, id) =>
                    <div className="divGen" key={id}>
                        <p className={css.colorText}>{el}</p>
                        <button className="buttonX" onClick={() => handleDelete(el)}>X</button>
                    </div>
                )}
            </div>
            <Link to='/home'><button className={css.button}>Volver</button></Link>
        </div>
    )
}