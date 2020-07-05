import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Rank from './pages/Rank'
import Boats from './pages/Boats';
import Lesson from './pages/Lesson';

export default Routes => (
    <BrowserRouter>
        <Route  component={Home} path="/" exact/> 
        <Route  component={Rank} path="/rank"/>
        <Route  component={Boats} path="/boats"/>
        <Route  component={Lesson} path="/lessons"/> 
    </BrowserRouter>
);