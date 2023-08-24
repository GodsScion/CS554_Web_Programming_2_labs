import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <br />
            <p>
                The purpose of this web app is to complete Lab 4 of CS 554 and to gain knowledge and marks, mainly marks.
            </p>
            <p>
                Jokes Aside!
            </p>
            <br />
            <p>
                This Marvel API app will let you view for different characters, stories and comics.
            </p>
            <p>
                Click on the top four links and feel free to explore.
            </p>
            <br />
            <p>Some useful links:</p>
            <nav>
                <Link className="link-text" to='/characters/page/1'>
                    Characters Listing
                </Link>
                <br />
                <Link className="link-text" to='/comics/page/1'>
                    Comics Listing
                </Link>
                <br />
                <Link className="link-text" to='/stories/page/1'>
                    Stories Listing
                </Link>
                <br />
                <Link className="link-text" to='/characters/history'>
                    Character History
                </Link>
                <br />
            </nav>
        </div>
    )
}

export default Home;