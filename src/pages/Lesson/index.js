import React, { useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import api from '../../services/api';
import User from '../../assets/user.png';
import { FiAward } from 'react-icons/fi';

import './style.css';
import { Link, useHistory } from 'react-router-dom';

const Boats = () => {

    const history = useHistory();
    const [title, setTitle] = useState('');
    const [video, selectVideo] = useState();
    const [selectedRole, setSelectedRole] = useState('0');
    const [selectedLevel, setSelectedLevel] = useState('0');
    const [selectedBoats, setSelectedBoat] = useState([]);
    const [boats, setBoats] = useState([]);

    useEffect(() => {
       getBoats();
    }, []);

    async function getBoats() {
        const boatList = await api.get('boats');
        setBoats(boatList.data);
    }

    const roles = [
        'Chefe de máquina',
        'Marinheiro de convés',
        'Comandante',
        'Todos'
    ];

    const levels = [
        'Iniciante',
        'Intermediário',
        'Pro',
        'Todos'
    ];

    function getFile(event) {
        selectVideo(event.target.files[0]);
    }

    function getTitle(event) {
        setTitle(event.target.value);
    }

    function selectRole(event) {
        setSelectedRole(event.target.value);
    }

    function selectLevel(event) {
        setSelectedLevel(event.target.value);
    }

    function selectBoat(id) {
        const alreadySelected = selectedBoats.findIndex(item => item === id);
        if(alreadySelected > -1) {
            const filteredBoat = selectedBoats.filter(item => item !== id);
            setSelectedBoat(filteredBoat);
        }else {
            setSelectedBoat([...selectedBoats, id]);
        }
    }

    const [users, setUsers] = useState([]);
    useEffect(() => {
       getUsers();
    }, []);

    async function getUsers() {
        const userList = await api.get('lessons');
        setUsers(userList.data);
    }

    async function sendData(event) {
        event.preventDefault();
        
        if(title !== '' && video) {
            const data = new FormData();

            data.append('title', title);
            data.append('level', selectedLevel);
            data.append('role', selectedRole);
            data.append('boat', selectedBoats);
            data.append('video', video);
            
        
            await api.post('lessons', data);
            history.push('/');
        }
    }

    return(
    <div className="container">
        <header>
            <Link to="/"><FiChevronLeft /> Voltar</Link>
            <h1>TreinaMar</h1>
        </header>
        <div id="mainLesson">
            <div id="store-lesson">
                <h2>Adicione aqui novos conteúdos de treinamento</h2>
                <form>
                    <input 
                        type="text" 
                        name="title" 
                        d="title" 
                        placeholder="Título do conteúdo"
                        onChange={getTitle}
                    />
                    <select 
                        name="levels" 
                        id="levels"
                        value={selectedLevel} 
                        onChange={selectLevel}
                    >
                    <option value="0">Selecione o nível do conteúdo</option>
                        {levels.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                    <select 
                        name="roles" 
                        id="roles"
                        value={selectedRole} 
                        onChange={selectRole}
                    >
                    <option value="0">Selecione uma função</option>
                        {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                    <label htmlFor="listBoat">Selcione as embarcações que o conteúdo corresponde</label>
                    <ul id="listBoat" name="listBoat">
                    {boats.map(boat => (
                            <li 
                                key={boat._id} 
                                value={boat.name}
                                onClick={() => selectBoat(boat._id)}
                                className={selectedBoats.includes(boat._id)? 'selected' : ''}
                            >
                                {boat.name}
                            </li>
                        ))}
                    </ul>
                    <input 
                        type="file" 
                        name="aula" 
                        id="aula" 
                        accept="video/mp4" 
                        onChange={getFile}
                    />
                    <label htmlFor="aula">{video? video.name: 'Escolha um video'}</label>
                    <button type="submit" onClick={sendData}>Salvar</button>
                </form>
            </div>
        </div>
	<div id="mainLesson">
              <h2>Lista de conteúdos de treinamentos</h2>
	</div>    
	<div id="mainRank">
            <ul>
            {users.map(user => (
                <li
                    key={user._id}
                >
		    <div className="video">
                    <video width="320" height="240" controls>
 			<source src={user.url} type="video/mp4"/> 
			Your browser does not support the video tag.
		    </video>
		    </div>

		    <br />
                    <img src="https://raw.githubusercontent.com/leoym/leoym.github.io/master/img/rebocador.png"  alt="Barco" width="30" />
                    <div className="title">
                        <span className="level">Nível: {user.level}</span> 
		        <br />
                        <span>Profissional: {user.role}</span>
		        <br />
                        <span className="user-points">Curso: {user.title}</span>
		        <br />
		        <span className="user-points">Vídeo: <a href={user.url} target="_blank" rel="noopener noreferrer" > Link </a></span>
                    </div>
                    <div className="certify">
                        <FiAward />
                    </div>
		    <img src={User} alt={user.name} width="50" />

                </li>
            ))}
            </ul>
        </div>

    </div>
    );
}
export default Boats;
