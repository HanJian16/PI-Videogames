import React from "react";
import * as css from "./Paginado.module.css"

export default function Paginado({ gamesPerPage, allGames, paginado }) {
    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allGames / gamesPerPage - 1); i++) {
        pageNumbers.push(i+1)
    }

    return (
        <nav className={css.navConteiner}>
            <ul className={css.ul}>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li className={css.li} key={number}>
                            <button onClick={() => paginado(number)} className={css.btn}>{number}</button>
                        </li>
                        )
                    )
                }
            </ul>
        </nav>
    )
}