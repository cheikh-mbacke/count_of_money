import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Footer from "./Components/Footer";
import About from "./Components/About"
import Profile from "./Components/Profile";
import Dashbord from "./Components/Dashbord";
import Coin from "./Components/Coin";
import Trade from "./Components/Trade";
import ArticlesList from "./Components/ArticlesList";


const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen" >
            <Header />
                <Routes>
                    <Route path="/" exact element={<Home/>} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/dashbord" element={<Dashbord/>}/>
                    <Route path="/coin" element={<Coin/>} >
                        <Route path=":coinId" element={<Coin/>}/>
                    </Route>
                    <Route path="/trade" element={<Trade/>} >
                        <Route path=":coinId" element={<Trade/>} />
                    </Route>
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/articles" element={<ArticlesList />} />
                </Routes>
            <Footer/>
            </div>
        </Router>
    );
};

export default App;
