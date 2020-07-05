import React from 'react';
import { Link } from 'react-router-dom';
import Boat from '../../assets/tugboat.png';
import Content from '../../assets/content.png';
import Employee from '../../assets/employee.png';

import './style.css';

export default Home => (
    <div className="container">
        <header>
            <h1>TreinaMar</h1>
        </header>
        <div id="menu">
            <main id="content">
                <Link to="/boats"><img src={Boat} alt="Boat"/> Embarcações</Link>
                <Link to="/lessons"><img src={Content} alt="Content"/> Treinamentos</Link>
                <Link to="/rank"><img src={Employee} alt="Employee"/> Ranking</Link>
            </main>
        </div>
    </div>
);
