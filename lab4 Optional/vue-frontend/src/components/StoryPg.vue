<template>
    <div class="body">
        <h1>Story Page</h1>
            <div>
                <h2>{{stObj && stObj.title}}</h2>
                <!-- <img :src="stObj && stObj.thumbnail.path+'/portrait_uncanny.'+stObj.thumbnail.extension" class="card__image" alt="Comic Image" style="max-width: 7cm;"/> -->
                <div>
                    <h3>Description: </h3>
                    <p class="bigCardDescription">{{setDes(stObj)}}</p>
                </div>
                <span class="bigCardStatus"><strong>Last updated on: </strong>{{stObj && stObj.modified.substring(0,10)}}</span><br />
                <div v-if="stObj && stObj.comics">
                    <h3>Comics</h3>
                    <p>{{stObj && stObj.comics.available}} number of comics for "{{stObj && stObj.title}}"</p>
                    <ul v-if="stObj.comics.available > 0" class="uld">
                        <li v-for="(comic,index) in stObj.comics.items" :key="'co'+index" >
                            <router-link :to="{name: 'comicPg', params: {id: comic.resourceURI.substring(comic.resourceURI.lastIndexOf('s/')+2)}}">
                                <strong>Name: </strong>{{comic.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <br/>
                <div>
                    <h3>Characters</h3>
                    <p>{{stObj && stObj.characters.available}} number of characters for "{{stObj && stObj.title}}"</p>
                    <ul v-if="stObj && stObj.characters.available > 0">
                        <li v-for="(story,index) in stObj.characters.items" :key="'ch'+index">
                            <router-link :to="{name: 'chPg', params: {id: story.resourceURI.substring(story.resourceURI.lastIndexOf('s/')+2)}}">
                                <strong>Name: </strong>{{story.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <br/>
                <div>
                    <h3>Series</h3>
                    <p>{{stObj && stObj.series.available}} number of series for "{{stObj && stObj.title}}"</p>
                </div>
                <br/>
                <div>
                    <h3>Events</h3>
                    <p>{{stObj && stObj.events.available}} number of events for "{{stObj && stObj.title}}"</p>
                </div>
                <br/>
                <div v-if="stObj && stObj.originalIssue">
                    <h3>Original Issue Name: </h3>
                    <p>{{stObj.originalIssue.name}}</p>
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
    name: 'StoryVue',
    data() {
        return{
            id: this.$route.params.id,
            stObj: null
        }
    },
    methods: {
        setDes(stObj){
            try {
                let des = "No description available"
                if(stObj && stObj.description && stObj.description.trim().length > 0) {des = stObj.description.trim();}
                return des;
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }  
        },
        async getData(){
            try {
                console.log(`Fetching data for story: ${this.id}`)
                check.isValidNum(this.id);
                const { data } = await axios.get(`http://localhost:4000/api/stories/${this.id}`);
                this.stObj = data
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