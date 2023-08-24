import React from 'react';
import './App.css';
import logo from './img/marvel.png';
import Home from './components/Home';
import Chars from './components/CharsPg';
import Comics from './components/ComicsPg';
import ComicPg from './components/ComicPg';
import Stories from './components/StoriesPg';
import ChPg from './components/CharPg';
import ChHisPg from './components/ChHisPg';
import Page404 from './components/Page404';
import Page400 from './components/Pg400';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
            <div className='flex'> 
              <img src={logo} className='logo' alt='logo'></img>
              <h3 className='App-title'>Marvel API</h3>    
            </div>
            <nav>
              <Link className='showlink' to='/'>
                Home
              </Link>
              <Link className='showlink' to='/characters/page/1'>
                Characters
              </Link>
              <Link className='showlink' to='/comics/page/1'>
                Comics
              </Link>
              <Link className='showlink' to='/stories/page/1'>
                Stories
              </Link>
            </nav>
				</header>
				<br />
				<br />
				<div className='App-body'>
          <Routes>
            <Route path='/' element = {< Home />}></Route>
            <Route path='/characters/page/:page' element = {< Chars />}></Route>
            <Route path='/comics/page/:page' element = {< Comics/>}></Route>
            <Route path='/comics/:id' element = {< ComicPg/>}></Route>
            <Route path='/stories/page/:page' element = {< Stories/>}></Route>
            <Route path='/stories/:id' element = {< Stories/>}></Route>
            <Route path='/characters/:id' element = {< ChPg />}></Route>
            <Route path='/characters/history' element = {< ChHisPg />}></Route>
            <Route path='/pg404' element = {< Page404 />}></Route>
            <Route path='/pg400/:msg' element = {< Page400 />}></Route>
            <Route path='*' element = {< Page404 />}></Route>
          </Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
