import React, { useEffect, useState, Component} from 'react';
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom';
import SearchShows from './SearchShows';
import check from './validations';

import '../App.css';


const Comics = () => {
    const [pagenum, setpagenum] = useState(useParams().page || 1);
    const [chdata, setchdata] = useState(undefined);
    const [lastpage, setlastpage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState(undefined);
    let Cards = null;
    const navigate = useNavigate();
    
    useEffect(() => {
        async function dataFetch() {
            console.log(`Fetching data for page ${pagenum}...`);
            try {
                check.isValidNum(pagenum);
            } catch (error) {
                console.error(error.message || error);
                return navigate(`/pg400/${error.message || error}`);
            }
            try {
                const { data } = await axios.get('http://localhost:4000/api/comics/page/'+(parseInt(pagenum)-1));
                console.log(`Data recieved for page ${pagenum}!`);
                // parseInt(pagenum);
                if ( (pagenum*data.limit >= data.total) || (data.offset + data.count >= data.total)){
                    setlastpage(true);
                }
                else {
                    setlastpage(false);
                }
                // if (data) {setchdata(data);}
                setchdata(data);
                // Cards = data.results.map( (x) => {return buildCard(x)})
                // console.log('Succesfully generated cards');
            } catch (error) {
                console.error(error.message || error);
                return navigate("/pg404");
            }
        }
        dataFetch();   
    },[pagenum]);
    
    // useEffect(
	// 	() => {
	// 		console.log('search useEffect fired');
	// 		async function fetchData() {
	// 			try {
	// 				console.log(`in fetch searchTerm: ${searchTerm}`);
    //                 const md5 = require('blueimp-md5');
    //                 const publickey = '1f3113b8a78a98e6ee7f4b0c26f55141';//'your_public_key(API KEY) from Marvel dev portal';
    //                 const privatekey = 'ab259a5305128fec46023d240399d2d325e3eddc';//'your private key from Marvel dev portal';
    //                 const ts = new Date().getTime();
    //                 const stringToHash = ts + privatekey + publickey;
    //                 const hash = md5(stringToHash);
    //                 const baseUrl = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchTerm}&limit=`;
    //                 const url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;//https://gateway.marvel.com:443/v1/public/characters/{:id}?apikey=
    //                 const { data } = await axios.get(url);
	// 				setchdata(data);
	// 			} catch (e) {
	// 				console.log(e);
	// 			}
	// 		}
	// 		if (searchTerm) {
	// 			console.log('searchTerm is set')
	// 			fetchData();
	// 		}
	// 	},
	// 	[searchTerm]
	// );

	// const searchValue = async (value) => {
	// 	setSearchTerm(value);
	// };

    // function buildCard(chObj) {
    //     return(
    //             <div key={chObj.id} className="card"  onClick={(e) => buttonClickRedirect(chObj.id,e)}> 
    //                 <img src={chObj.thumbnail.path+'/portrait_incredible.'+chObj.thumbnail.extension} alt="Photo"/>
    //                 <div className="container">
    //                     <h4><b>{chObj.name}</b></h4>
    //                     <p>Comics: {chObj.comics.available}</p>
    //                     <p>Stories: {chObj.series.available}</p>
    //                     {/* <button onClick={(e) => buttonClickRedirect(chObj.id, e)}>Full Details</button> */}
    //                 </div>
    //             </div>
    //     )
    // }

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



    if(chdata){
        Cards = chdata.results.map( (x) => {return buildCard(x)});
    }
    
    return (
        <div>
            <h1>Comics</h1>
            <div className='row-box'>
                {pagenum > 1 && <button className="button-1" onClick={() => setpagenum(parseInt(pagenum) - 1)}>Previous</button>}
                <p> Page Number: {pagenum}</p>
                {!lastpage && <button className="button-1" onClick={() => setpagenum(parseInt(pagenum) + 1)}>Next</button>} 
            </div>
            <p>Click on cards for more details!</p>
            <br />
            <ul className="cards">
                { Cards }
            </ul>
            <br/>
        </div>
    )
}

export default Comics;