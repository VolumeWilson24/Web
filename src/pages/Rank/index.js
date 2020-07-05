import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import User from '../../assets/user.png';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiAward } from 'react-icons/fi';

import './style.css';

const Rank = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
       getUsers();
    }, []);

    async function getUsers() {
        const userList = await api.get('users');
        setUsers(userList.data);
    }

    return(
    <div className="container">
        <header>
            <Link to="/"><FiChevronLeft /> Voltar</Link>
            <h1>TreinaMar</h1>
        </header>

        <div id="mainRank">
	    <h2>Ranking dos profissionais</h2>

            <ul>
            {users.map(user => (
                <li 
                    key={user._id}
                >
                    
                    <img src={user.photo_url === ''? User : user.photo_url} alt={user.name}/>
                    <div className="user-details">
                        <span className="user-name">{user.name}</span>
                        <span>{user.role}</span>
                        <span className="user-points">{user.points} pontos</span>
                    </div>
                    <div className="certify">
                        <FiAward />
                    </div>
                </li>
            ))} 
            </ul> 
        </div>
    </div>
    );
}
export default Rank;
