import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGames } from "../../redux/actions";
import * as css from "./SearchBar.module.css";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameGames(name));
        setName('')
    }

    return(
        <div>
            <input 
            type="text"
            value={name}
            placeholder="Buscar..."
            onChange={(e)=>handleInputChange(e)}
            className={css.input}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)} className={css.btn}>Buscar</button>
        </div>
    )
}