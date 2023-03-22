import React from 'react';
import { Link } from "react-router-dom";
import * as css from "./LandingPage.module.css"

export default function LandingPage() {
    return (
      <div className={css.divContainer}>
        <h1 className={css.h1}>Bienvenido al PI videogames</h1>
        <Link to={"/home"}>
          <button className={css.btn}>Más info</button>
        </Link>
      </div>
    );
  }
