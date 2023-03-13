import React from 'react';
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
      <div>
        Landing
        <Link to={"/home"}>
          <button>Home</button>
        </Link>
      </div>
    );
  }
