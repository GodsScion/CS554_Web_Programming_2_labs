import React, { useEffect, useState } from "react"
import axios from "axios"
import check from "./validations"
import { useParams , useNavigate, Link } from "react-router-dom"

import '../App.css'

const ChCard = () => {
    const [chObj, setchObj] = useState(undefined);
    const navigate = useNavigate();
    const [id, setid] =useState(useParams().id || 1);

    let comicsList = null;
    let storiesList = null;
    let seriesList = null;
    let urls = null;

    useEffect(() => {
        async function getData(){
            try {
                check.isValidNum(id);
            } catch (error) {
                console.error(error.message || error);
                return navigate(`/pg400/${error.message || error}`);
            }
            try {
                const { data } = await axios.get(`http://localhost:4000/api/characters/${id}`);
                setchObj(data);
            } catch (error) {
                console.error(error.message || error);
                return navigate("/pg404")
            }
        }
        getData()
    },[id])

    let des = "No description available"
    if(chObj && chObj.description && chObj.description.trim().length > 0) {
        des = chObj.description.trim();
    }   


    
    function comicsListFunc(item) {
        let comicId = item.resourceURI.substring(item.resourceURI.lastIndexOf('s/')+2);
        return(
            <li key={`comicid${comicId}`} onClick={() => navigate(`/comics/${comicId}`)}>
                <h5>{item.name}</h5>
            </li>
        )
    }
    if (chObj && chObj.comics.available > 0){
        comicsList = 
        <ul>
            {chObj.comics.items.map((x) => {return comicsListFunc(x)})}
        </ul>
    }



    function storiesListFunc(item) {
        let storyId = item.resourceURI.substring(item.resourceURI.lastIndexOf('s/')+2);
        return(
            <li key={`storyid${storyId}`} onClick={() => navigate(`/stories/${storyId}`)}>
                <h5>{item.name}</h5>
                <p>{item.type} type</p>
            </li>
        )
    }
    if (chObj && chObj.stories.available > 0){
        storiesList = 
        <ul class="uld dropdown" aria-label="submenu">
            {chObj.stories.items.map((x) => {return storiesListFunc(x)})}
        </ul>
    }


    function seriesListFunc(item) {
        let seriesId = item.resourceURI.substring(item.resourceURI.lastIndexOf('s/')+2);
        return(
            <li key={`seriesid${seriesId}`}>
                <h5>{item.name}</h5>
            </li>
        )
    }
    if (chObj && chObj.series.available > 0){
        seriesList = 
        <ul class="uld dropdown" aria-label="submenu">
            {chObj.series.items.map((x) => {return seriesListFunc(x)})}
        </ul>
    }


    if(chObj && chObj.urls){
        urls = chObj.urls.map((x) => {
            return(
                <li className="lid"><a href={x.url} className="ad" target="_blank" rel="noopener noreferrer"> {x.type} </a></li>
            )
        })
    }

    return(
        <div  className="bigCard">
            <h1>{chObj && chObj.name}</h1>
            <div>
                <img src={chObj && chObj.thumbnail.path+'/portrait_uncanny.'+chObj.thumbnail.extension} className="card__image" alt="Character Image" />
                <p className="bigCardDescription">{des}</p>
                <span className="bigCardStatus">Last updated on: {chObj && chObj.modified.substring(0,10)}</span><br />
                <div>
                    <h3>Comics</h3>
                    <p>{chObj && chObj.comics.available} comics for "{chObj && chObj.name}"</p>
                    {comicsList}
                </div>
                <br/>
                <div>
                <nav className="navd" role="navigation">
                        <ul className="uld">
                            <li className="lid"><h3>Stories</h3>
                    <p>{chObj && chObj.stories.available} stories for "{chObj && chObj.name}"</p>
                    {storiesList}
                                
                                
                            </li>
                        </ul>
                    </nav>

                    
                </div>
                <br/>
                <div >
                <nav className="navd" role="navigation">
                        <ul className="uld">
                            <li className="lid"><h3>Series</h3>
                                <p>{chObj && chObj.stories.available} stories for "{chObj && chObj.name}"</p>
                    
                                {seriesList}
                                
                            </li>
                        </ul>
                    </nav>
                    
                    
                </div>
                <br/>
                <div className="specialDrp">
                    <nav className="navd" role="navigation">
                        <ul className="uld">
                            <li className="lid"><h3>Other Urls</h3>
                                <ul class="uld dropdown" aria-label="submenu">
                                    {urls}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
            <br/>
            <br/>
        </div>
        
    )
}

export default ChCard