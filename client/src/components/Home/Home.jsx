import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, filterGamesByGenre, filterGamesByOrigin, orderByName, orderByRating } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import Paginado from '../Paginado/Paginado.jsx';
import SearchBar from './SearchBar.jsx';

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);
  const [orden, setOrden] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getGames())
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getGames());
  }

  function handleFilterGenre(e){
    e.preventDefault();
    dispatch(filterGamesByGenre(e.target.value))
  }

  function handleFilterOrigin(e){
    e.preventDefault();
    dispatch(filterGamesByOrigin(e.target.value))
  }

  function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleSortRating(e){
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  return (
    <div>
      <Link to='/game'>Crear Juego</Link>
      <h1>Los mejores juegos</h1>
      <button onClick={e => { handleClick(e) }}>
        Volver a cargar todos los juegos
      </button>
      <div>
        <select onChange={(e)=>handleSort(e)}>
          <option value='Asc'>Ascendente</option>
          <option value='Desc'>Descendente</option>
        </select>
        <select onChange={(e)=>handleFilterGenre(e)}>
          <option value='All'>Todos</option>
          <option value='Action'>Acción</option>
          <option value='Indie'>Indie</option>
          <option value='Adventure'>Aventura</option>
          <option value='RPG'>RPG</option>
          <option value='Strategy'>Estrategia</option>
          <option value='Shooter'>Shooter</option>
          <option value='Casual'>Casual</option>
          <option value='Simulation'>Simulación</option>
          <option value='Puzzle'>Puzzle</option>
          <option value='Arcade'>Arcade</option>
          <option value='Platformer'>Plataforma</option>
          <option value='Racing'>Carreras</option>
          <option value='Massively Multiplayer'>Multiplayer</option>
          <option value='Sports'>Deportes</option>
          <option value='Fighting'>Luchas</option>
          <option value='Racing'>Carreras</option>
          <option value='Family'>Familiar</option>
          <option value='Racing'>Carreras</option>
          <option value='Board Games'>juegos de mesa</option>
          <option value='Educational'>Educacional</option>
          <option value='Card'>Cartas</option>
        </select>
        <select onChange={(e)=>handleFilterOrigin(e)}>
          <option value='All'>Todos</option>
          <option value="API">Existente</option>
          <option value="Created">Creados</option>
        </select>
        <select onChange={(e)=>handleSortRating(e)}>
          <option value="Asc">Rating Asc</option>
          <option value="Dsc">Rating Desc</option>
        </select>
        <Paginado
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paginado={paginado}
        />
        <SearchBar/>
        {
          currentGames?.map((el, index) => (
            <div key={index}>
              <Link to={"/home/" + el.id}>
                <Card name={el.name} imagen={el.background_image} genre={el.genre} />
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}
