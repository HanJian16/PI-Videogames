import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/index.js";
import { useEffect } from "react";

export default function Detail(props) {
    console.log(props);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myGame = useSelector((state) => state.detail)

    return (
        <div>
            {
                myGame.length > 0
                    ? <div>
                        <h1>{myGame[0].name}</h1>
                        <img src={myGame[0].background_image} alt={myGame[0].name} width='500px' height='700px' />
                        <h2>Géneros: {!myGame[0].description ? myGame[0].genre.map(el => el.name + (' ')) : myGame[0].genres.map(el => el.name + (' '))}</h2>
                        <p>Descripcion: {myGame[0].description && myGame[0].description}</p>
                        <h3>Plataformas: {!myGame[0].description ? myGame[0].platforms.map(ele => ele.platform.name + (' ')) : myGame[0].platforms.map(ele => ele + (' '))}</h3>
                        <h4>Día de lanzamiento: {myGame[0].released}</h4>
                        <h4>Rating: {myGame[0].rating}</h4>
                    </div>
                    : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}