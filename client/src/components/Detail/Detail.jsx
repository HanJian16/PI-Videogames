import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/index.js";
import { useEffect } from "react";
import * as css from "./Detail.module.css";

export default function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myGame = useSelector((state) => state.detail)

    return (
        <div className={css.divConteiner}>
            {
                myGame.length > 0
                    ? <div className={css.containerInfo}>
                        <div>
                            <h1 className={css.colorLetter}>{myGame[0].name}</h1>
                            <img src={myGame[0].background_image} alt={myGame[0].name} width='400px' height="600px" />
                        </div>
                        <div className={css.info}>
                            <h2 className={css.colorLetter}>Géneros: {!myGame[0].description ? myGame[0].genre.map(el => el.name + (' ')) : myGame[0].genres.map(el => el.name + (' '))}</h2>
                            {myGame[0].description && <p className={css.colorLetter}>Descripcion: {myGame[0].description && myGame[0].description}</p>}
                            <h3 className={css.colorLetter}>Plataformas: {!myGame[0].description ? myGame[0].platforms.map(ele => ele.platform.name + (' ')) : myGame[0].platforms.map(ele => ele + (' '))}</h3>
                            <h4 className={css.colorLetter}>Día de lanzamiento: {myGame[0].released}</h4>
                            <h4 className={css.colorLetter}>Rating: {myGame[0].rating}</h4>
                        </div>
                    </div>
                    : <p>Loading...</p>
            }
            <Link to='/home'>
                <button className={css.button}>Volver</button>
            </Link>
        </div>
    )
}