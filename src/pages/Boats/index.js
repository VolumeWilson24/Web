import React, { useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import api from '../../services/api';
import Image from '../../assets/foto.jpg';

import './style.css';
import { Link } from 'react-router-dom';

const Boats = () => {

    const [boats, setBoats] = useState([]);
    const [name, setName] = useState('');
    const [file, setFile] = useState();

    useEffect(() => {
       getBoats();
    }, []);

    async function getBoats() {
        const boatList = await api.get('boats');
        setBoats(boatList.data);
    }

    function getFile(event) {
        const image = event.target.files[0];
        setFile(image);
    }

    function getName(event) {
        const boatName = event.target.value;
        setName(boatName);
    }

    async function sendData(event) {
        event.preventDefault();
        if(name !== '' && file) {
            const data = new FormData();

            data.append('name', name);
            data.append('image', file);
            await api.post('boats', data);
        }
    }

    return(
    <div className="container">
        <header>
            <Link to="/"><FiChevronLeft /> Voltar</Link>
            <h1>TreinaMar</h1>
        </header>
        <div id="mainBoats">
            <div id="boats">
                <h2>Embarcações</h2>
            <ul>
            {boats.map(boat => (
                <li key={boat._id}>  
                    <img src={boat.image_url === ''? Image : boat.image_url} alt={boat.name}/>
                    <div className="boat-details">
                        <span>{boat.name}</span>
                    </div>
                </li>
            ))} 
            </ul>
            </div>
            <div id="store-boat">
                <h2>Adicionar nova embarcação</h2>
                <form>
                    <input 
                        type="text" 
                        name="name" 
                        d="name" 
                        placeholder="Nome da embarcação" 
                        required
                        onChange={getName}
                    />
                    <input 
                        type="file" 
                        name="image" 
                        id="image" 
                        required 
                        accept="image/jpeg, image/png" 
                        onChange={getFile}
                    />
                    <label htmlFor="image">{file? file.name: 'Escolha uma imagem'}</label>
                    <button type="submit" onClick={sendData}>Salvar</button>
                </form>
            </div>
        </div>
    </div>
    );
}
export default Boats;