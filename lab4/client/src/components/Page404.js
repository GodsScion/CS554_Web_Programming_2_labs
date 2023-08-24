import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

const Page404 = () => {
    return(
        <div>
            <br />
            <h1>404: Resource not found!</h1>
            <br />
            <p>
                Checkout your character history here:
            </p>
            <Link className="link-text" to="characters/history">Characters history</Link>
        </div>
    )
}

export default Page404