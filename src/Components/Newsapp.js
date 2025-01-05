import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Card from './Card';

const Newsapp = () => {
    const [search, setSearch] = useState("Entertainment");
    const [newsData, setNewsData] = useState(null);
    const API_KEY = "9c3ed8ee95884dec979460a60f96675b";

    const getData = async () => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        console.log(jsonData.articles);
        let dt = jsonData.articles.slice(0, 10);
        setNewsData(dt);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleInput = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    };

    const userInput = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <nav>
                <div>
                    <h1>.UTimes.</h1>
                </div>
                <div className='searchBar'>
                    <input type='text' placeholder='Search News' value={search} onChange={handleInput} />
                    <button onClick={getData}>Search</button>
                </div>
                <ul style={{ display: "flex", gap: "25px" }}>
                    
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                        <li style={{ fontWeight: 500, fontSize: "17px" }}>Dashboard</li>
                    </Link>
                    <Link to="/signup" style={{ textDecoration: 'none', color: 'black' }}>
                    <li style={{ fontWeight: 500, fontSize: "17px" }}>Signup</li>
                </Link>
                    </ul>
                    
               
            </nav>
            <div>
                <p className='head'>Stay Updated with UTimes</p>
            </div>
            <div className='categoryBtn'>
                <button onClick={userInput} value="entertainment">Entertainment</button>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="sports">Sports</button>
                <button onClick={userInput} value="fitness">Fitness</button>
            </div>

            <div>
                {newsData ? <Card data={newsData} /> : null}
            </div>
        </div>
    );
};

export default Newsapp;