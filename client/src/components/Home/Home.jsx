import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  useEffect(() => {
    dispatch(getGames())
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getGames());
  }

  return (
    <div>
      <Link to='/videogames'>Crear Juego</Link>
      <h1>Los mejores juegos</h1>
      <button onClick={e => { handleClick(e) }}>
        Volver a cargar todos los juegos
      </button>
      <div>
        <select>
          <option value='Asc'>Ascendente</option>
          <option value='Desc'>Descendente</option>
        </select>
        <select>
          <option value="Genre">Género</option>
          <option value="API">Existente</option>
          <option value="Bd">Base de datos</option>
        </select>
        <select>
          <option value="Alf">Alfabético</option>
          <option value="Rtg">Rating</option>
        </select>
        {
          allGames?.map((el) => {
            return (
              <div key={el.id}>
                <Link to={"/home/" + el.id}>
                  <Card name={el.name} imagen={el.background_image} genres={el.genres} />
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
