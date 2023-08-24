<template>
    <div class="body">
        <h1>Character Page</h1>
            <div>
                <h2>{{chObj && chObj.name}}</h2>
                <img :src="chObj && chObj.thumbnail.path+'/portrait_uncanny.'+chObj.thumbnail.extension" class="card__image" alt="Character Image" style="max-width: 7cm;"/>
                <div>
                    <h3>Description</h3>
                    <p class="bigCardDescription">{{setDes(chObj)}}</p>
                </div>
                <br/>
                <span class="bigCardStatus"><strong>Last updated on: </strong>{{chObj && chObj.modified.substring(0,10)}}</span><br />
                <br/>
                <div>
                    <h3>Comics</h3>
                    <p>{{chObj && chObj.comics.available}} number of comics for "{{chObj && chObj.name}}"</p>
                    <ul v-if="chObj && chObj.comics" class="uld">
                        <li v-for="(comic,index) in chObj.comics.items" :key="'co'+index" >
                            <router-link :to="{name: 'comicPg', params: {id: comic.resourceURI.substring(comic.resourceURI.lastIndexOf('s/')+2)}}">
                                <strong>Name: </strong>{{comic.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <br/>
                <div>
                    <h3>Stories</h3>
                    <p>{{chObj && chObj.stories.available}} number of stories for "{{chObj && chObj.name}}"</p>
                    <ul v-if="chObj && chObj.stories">
                        <li v-for="(story,index) in chObj.stories.items" :key="'st'+index">
                            <router-link :to="{name: 'storyPg', params: {id: story.resourceURI.substring(story.resourceURI.lastIndexOf('s/')+2)}}">
                                <strong>Name: </strong>{{story.name}}
                            </router-link>
                            <p><strong>Type:</strong>{{story.type}}</p>
                        </li>
                    </ul>
                </div>
                <br/>
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
    name: 'CharVue',
    data() {
        return{
            id: this.$route.params.id,
            chObj: null
        }
    },
    methods: {
        setDes(chObj){
            try {
                let des = "No description available"
                if(chObj && chObj.description && chObj.description.trim().length > 0) {des = chObj.description.trim();}
                return des;
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }  
        },
        async getData(){
            try {
                console.log(`Fetching data for character: ${this.id}`);
                check.isValidNum(this.id);
                const { data } = await axios.get(`http://localhost:4000/api/characters/${this.id}`);
                this.chObj = data
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
                console.log("Requested Character ID: "+this.id)
            }
        }            
    }
}

</script>

<style scoped>
</style>