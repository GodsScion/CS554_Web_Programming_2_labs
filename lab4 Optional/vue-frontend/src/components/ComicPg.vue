<template>
    <div class="body">
        <h1>Comic Page</h1>
            <div>
                <h2>{{coObj && coObj.title}}</h2>
                <img :src="coObj && coObj.thumbnail.path+'/portrait_uncanny.'+coObj.thumbnail.extension" class="card__image" alt="Comic Image" style="max-width: 7cm;"/>
                <div>
                    <h3>Description: </h3>
                    <p class="bigCardDescription">{{setDes(coObj)}}</p>
                </div>
                <span class="bigCardStatus"><strong>Last updated on: </strong>{{coObj && coObj.modified}}</span><br />
                <div v-if="coObj && coObj.variants && coObj.variants.length > 0">
                    <h3>Variants</h3>
                    <ul class="uld">
                        <li v-for="(comic,index) in coObj.variants" :key="'va'+index" >
                            <router-link :to="{name: 'comicPg', params: {id: comic.resourceURI.substring(comic.resourceURI.lastIndexOf('s/')+2)}}">
                                <strong>Name: </strong>{{comic.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <br/>
                <div>
                    <h3>Characters</h3>
                    <p>{{coObj && coObj.characters.available}} number of characters for "{{coObj && coObj.title}}"</p>
                    <ul v-if="coObj && coObj.characters.available > 0">
                        <li v-for="(story,index) in coObj.characters.items" :key="'ch'+index">
                            <router-link :to="{name: 'chPg', params: {id: story.resourceURI.substring(story.resourceURI.lastIndexOf('s/')+2)}}">
                                <strong>Name: </strong>{{story.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <br/>
                <div>
                    <h3>Stories</h3>
                    <p>{{coObj && coObj.stories.available}} number of stories for "{{coObj && coObj.title}}"</p>
                    <ul v-if="coObj && coObj.stories.available > 0">
                        <li v-for="(story,index) in coObj.stories.items" :key="'st'+index">
                            <router-link :to="{name: 'storyPg', params: {id: story.resourceURI.substring(story.resourceURI.lastIndexOf('s/')+2)}}">
                                <strong>Name: </strong>{{story.name}}
                            </router-link>
                            <p><strong>Type:</strong>{{story.type}}</p>
                        </li>
                    </ul>
                </div>
                <br/>
                <div v-if="coObj && coObj.urls">
                    <h3>External Site Urls: </h3>
                    <ul>
                        <li v-for="(url,index) in coObj.urls" :key="'url'+index">
                            <a :href="url.url" target="_blank">{{url.type}}</a>
                        </li>
                    </ul>
                </div>
                <br/>
                <br/>
            </div>
            <br/>
            <br/>
        </div>

</template>

<script>
const check = require('../../../backend/validations');
const axios = require('axios');

export default {
    name: 'ComicVue',
    data() {
        return{
            id: this.$route.params.id,
            coObj: null
        }
    },
    methods: {
        setDes(coObj){
            try {
                let des = "No description available"
                if(coObj && coObj.description && coObj.description.trim().length > 0) {des = coObj.description.trim();}
                return des;
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }  
        },
        async getData(){
            try {
                console.log(`Fetching data for comic: ${this.id}`)
                check.isValidNum(this.id);
                const { data } = await axios.get(`http://localhost:4000/api/comics/${this.id}`);
                this.coObj = data
                // console.log(data)
                return 
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
        }
    },
    created() {
        this.getData()
    },
    watch: {
        id(){
            this.getData()
        },
        $route() { 
            if (this.$route.params.id) {
                this.id = this.$route.params.id
                console.log("Requested Comic ID: "+this.id)
            }
        }            
    }
}

</script>

<style scoped>
</style>