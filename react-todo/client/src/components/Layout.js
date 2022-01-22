import React from 'react';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext';
//pages
import AuthBox from './AuthBox';
import Header from './Header';
import Dashboard from './Dashboard';

const Layout = () => {
    const {fetchingUser} = useGlobalContext();

  return fetchingUser ? (
    <div className="loading">
        <h2>Loading</h2>
    </div>
  ) : (
    <Router>
        <Header />
        <Routes>
            <Route exact path="/" element={<AuthBox />} />
            <Route  path="/register" element={<AuthBox register/>} />
            <Route  path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
    )
}

export default Layout;
