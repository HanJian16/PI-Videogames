import React from "react";;

export default function Card({ name, imagen, genres }) {
    return (
        <div>
            <h3>{name}</h3>
            {genres.map(ele => {
                return (
                    <div key={ele.id}>
                        <h3>{ele.name}</h3>
                    </div>
                )
            })}
            <img src={imagen} alt="img not found" width='200px' height="250px" />
        </div>
    )
}