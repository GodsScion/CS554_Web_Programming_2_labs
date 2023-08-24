import React from "react";
import '../App.css';
import { Link, useParams } from "react-router-dom";

const Page400 = () => {
    let msg = useParams().msg || "Please don't do anything funny!";
    return(
        <div>
            <br />
            <h1>400: Bad Request!</h1>
            <br />
            <p>
                {msg}
            </p>
            <br/>
            <p>
                Checkout your character history here:
            </p>
            <Link className="link-text" to="characters/history">Characters history</Link>
        </div>
    )
}

export default Page400