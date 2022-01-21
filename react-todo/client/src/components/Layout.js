import React from 'react';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import AuthBox from './AuthBox';
import Header from './Header';

const Layout = () => {
  return (
    <Router>
        <Header />
        <Routes>
            <Route exact path="/" element={<AuthBox />} />
            <Route  path="/test" element={<h1>test</h1>} />

        </Routes>
    </Router>
    )
}

export default Layout;
