<template>
    <div>
        <h2 style="color: black;">All Stories</h2>
        <div class='row-box'>
            <button v-if="pagenum > 1" class="button-1" v-on:click="prevBtn">Previous</button>
            <p style="color: black;"> Page Number: {{pagenum}}</p>
            <button v-if="!lastpage" class="button-1" v-on:click="nextBtn">Next</button>
        </div>
        <p style="color: black;">Click on cards for more details!</p>
        <br />
        <ul class="cards">
            <li v-for="(stObj,index) in storiesData" :key="index">
                <div v-if="storiesData" class="card-new" v-on:click="()=>{this.$router.push({ name: 'storyPg', params: {id: stObj.id} })}">
                    <div class="card__header-text">
                        <br/>
                        <h3 class="card__title">{{stObj.title}}</h3>
                        <br/>           
                        <span class="card__status">Characters: {{stObj.characters.available}}</span><br />
                        <span class="card__status">Series: {{stObj.series.available}}</span><br />
                        <span class="card__status">Comics: {{stObj.comics.available}}</span><br />
                    </div>
                    <br/>
                    <p class="card__description">{{setDes(stObj)}}</p>
                    <br/>
                </div>      
            </li> 
        </ul>
        <br/>
    </div>
    
</template>

<script>
const check = require('../../../backend/validations')
const axios = require('axios')

export default {
    name: 'StoriesPage',
    data() {
        return {
        pagenum: this.$route.params.page,
        storiesData: null,
        lastpage: true
        };
    },
    methods: {
        setDes(stObj) {
            try {
                let des = "No description available";
                if (stObj && stObj.description && stObj.description.trim().length > 0){
                    des = stObj.description.trim();
                }
                return des
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
        },
        nextBtn() {
            try {
                this.pagenum = Number(this.pagenum) + 1;
                return this.$router.push({name: 'stories', params: {page: this.pagenum}})
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
        },
        prevBtn() {
            try {
                this.pagenum = Number(this.pagenum) - 1;
                return this.$router.push({name: 'stories', params: {page: this.pagenum}})
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
        },
        async comicDataFetch() {
            console.log(`Fetching data for stories page ${this.pagenum}...`);
            try {
                check.isValidNum(this.pagenum);
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
            try {
                const { data } = await axios.get('http://localhost:4000/api/stories/page/'+(parseInt(this.pagenum)-1));
                console.log(`Data recieved for stories page ${this.pagenum}!`);
                if ( (this.pagenum*data.limit >= data.total) || (data.offset + data.count >= data.total)){
                    this.lastpage = true;
                }
                else {
                    this.lastpage = false;
                }
                this.storiesData = data.results;
                // console.log(this.storiesData)
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
        }
  
    },
    created() {
        this.comicDataFetch();
    },
    watch: {
        pagenum(){
            this.comicDataFetch()
        },
        $route() { 
            if (this.$route.params.page) {
                this.pagenum = this.$route.params.page
            }
        }            
    }
}
</script>

<style scoped>
.card-new {
    background-color: aliceblue;
    border-radius: 8px;
    padding: 2mm;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    min-height: 8cm;
    min-width: 5cm;
}

/* On mouse-over, add a deeper shadow */
.card-new:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>