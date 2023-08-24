import React, { useEffect, useState, Component} from 'react';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom';


import '../App.css';


const ChHisPg = () => {
    const [chdata, setchdata] = useState(undefined);
    let Cards = null;
    const navigate = useNavigate();
    
    useEffect(() => {
        async function dataFetch() {
            try {
                const { data } = await axios.get('http://localhost:4000/api/characters/history');                if (data.length>0) {setchdata(data);}
                setchdata(data);
            } catch (error) {
                console.error(error.message || error);
                return navigate("/pg404");
            }
        }
        dataFetch();   
    },[]);

    function buildCard(chObj) {
        let des = chObj.description.trim();
        if (des.length === 0){
            des = "No description available";
        }
        return(
            
                <li key={chObj.id}>
                    <div className="card"  onClick={() => navigate(`/characters/${chObj.id}`)}>
                        <img src={chObj.thumbnail.path+'/portrait_incredible.'+chObj.thumbnail.extension} className="card__image" alt="Character Image" />
                        <div className="card__overlay">
                            <div className="card__header">
                            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                            <div className="card__header-text">
                                <h3 className="card__title">{chObj.name}</h3>            
                                <span className="card__status">Comics: {chObj.comics.available}</span><br />
                                <span className="card__status">Series: {chObj.series.available}</span><br />
                                <span className="card__status">Stories: {chObj.stories.available}</span>
                            </div>
                            </div>
                            <p className="card__description">{des}</p>
                        </div>
                    </div>      
                </li>   
        )
    }



    if(chdata && chdata.length>0){
        Cards = chdata.results.map( (x) => {return buildCard(x)});
    }
    else{
        Cards = 
        <div>
            <p>Search some characters with CharacterID or click on Character card to create your history!</p>
            <br/>
            <p>Link to Characters</p>
            <Link className="link-text" to='/characters/page/1'>
                Characters Listing
            </Link>
        </div>
    }
    
    return (
        <div>
            <h1>Characters</h1>
            <p>Click on cards for more details!</p>
            <br />
            <ul className="cards">
                { Cards }
            </ul>
            <br/>
        </div>
    )
}

export default ChHisPg;