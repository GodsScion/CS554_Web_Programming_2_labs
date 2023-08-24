const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
const axios = require('axios');

app
    .get('/api/characters/history', async (req,res) => {
        let data = await client.lRange('history',0,20);
        data = data.map(JSON.parse);
        console.log('Sending history');
        return res.json(data);
    });


app
    .get('/api/characters/:id', async (req,res) => {
        let cache = await client.get('Ch'+req.params.id);
        if(!cache){
            try {
                const md5 = require('blueimp-md5');
                const publickey = '1f3113b8a78a98e6ee7f4b0c26f55141';//'your_public_key(API KEY) from Marvel dev portal';
                const privatekey = 'ab259a5305128fec46023d240399d2d325e3eddc';//'your private key from Marvel dev portal';
                const ts = new Date().getTime();
                const stringToHash = ts + privatekey + publickey;
                const hash = md5(stringToHash);
                const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/'+req.params.id;
                const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;//https://gateway.marvel.com:443/v1/public/characters/{:id}?apikey=
                const { data } = await axios.get(url);
                
                client.set(`Ch${req.params.id}`,JSON.stringify(data.data.results[0]));
                console.log(`Data from server for character id:${req.params.id}`);
                await client.lPush('history', JSON.stringify(data.data.results[0]));
                return res.json(data.data.results[0]);
            } catch (error) {
                return res.status(404).json({error: 'Character not found!'})
            }
        }
        else{
            console.log(`Data from cache for character id:${req.params.id}`);
            await client.lPush('history', cache);
            return res.json(JSON.parse(cache));
        }
    });

app
    .get('/api/comics/:id', async (req,res) => {
        let cache = await client.get('Co'+req.params.id);
        if(!cache){
            try {
                const md5 = require('blueimp-md5');
                const publickey = '1f3113b8a78a98e6ee7f4b0c26f55141';//'your_public_key(API KEY) from Marvel dev portal';
                const privatekey = 'ab259a5305128fec46023d240399d2d325e3eddc';//'your private key from Marvel dev portal';
                const ts = new Date().getTime();
                const stringToHash = ts + privatekey + publickey;
                const hash = md5(stringToHash);
                const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics/'+req.params.id;
                const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;//https://gateway.marvel.com:443/v1/public/characters/{:id}?apikey=
                const { data } = await axios.get(url);
                
                client.set(`Co${req.params.id}`,JSON.stringify(data.data.results[0]));
                console.log(`Data from server for comic id:${req.params.id}`);
                return res.json(data.data.results[0]);
            } catch (error) {
                return res.status(404).json({error: 'Comic not found!'})
            }
        }
        else{
            console.log(`Data from cache for comic id:${req.params.id}`);
            return res.json(JSON.parse(cache));
        }
    });

app
    .get('/api/stories/:id', async (req,res) => {
        let cache = await client.get('St'+req.params.id);
        if(!cache){
            try {
                const md5 = require('blueimp-md5');
                const publickey = '1f3113b8a78a98e6ee7f4b0c26f55141';//'your_public_key(API KEY) from Marvel dev portal';
                const privatekey = 'ab259a5305128fec46023d240399d2d325e3eddc';//'your private key from Marvel dev portal';
                const ts = new Date().getTime();
                const stringToHash = ts + privatekey + publickey;
                const hash = md5(stringToHash);
                const baseUrl = 'https://gateway.marvel.com:443/v1/public/stories/'+req.params.id;
                const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;//https://gateway.marvel.com:443/v1/public/characters/{:id}?apikey=
                const { data } = await axios.get(url);
                
                client.set(`St${req.params.id}`,JSON.stringify(data.data.results[0]));
                console.log(`Data from server for story id:${req.params.id}`);
                return res.json(data.data.results[0]);
            } catch (error) {
                return res.status(404).json({error: 'Story not found!'})
            }
        }
        else{
            console.log(`Data from cache for story id:${req.params.id}`);
            return res.json(JSON.parse(cache));
        }
    });


app.use("*", (req,res) => {
    res.status(404).json('Resource not found! Please check your link and prefer http over https!');
});

app.listen(3000, async () => {
    await client.connect();
    const test = await client.ping();
    console.log(test);
    console.log('connected to 3000')
})