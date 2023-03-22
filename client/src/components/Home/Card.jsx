import React from "react";
import * as css from "./Card.module.css";

export default function Card({ name, imagen, genre }) {
    return (
        <div className={css.divConteiner}>
            <h3 className={css.h3}>{name}</h3>
            <label>Géneros: </label>
            {genre && genre.map(ele => {
                return (
                    <div key={ele.id} className={css.divP}>
                        <label className={css.p}>{ele.name}</label>
                    </div>
                )
            })}
            <img src={imagen} alt="img not found" width='200px' height="250px" className={css.img}/>
        </div>
    )
}