<template>
    <div>
        <h2 style="color: black;">All Comics</h2>
        <div class='row-box'>
            <button v-if="pagenum > 1" class="button-1" v-on:click="prevBtn">Previous</button>
            <p style="color: black;"> Page Number: {{pagenum}}</p>
            <button v-if="!lastpage" class="button-1" v-on:click="nextBtn">Next</button>
        </div>
        <p style="color: black;">Click on cards for more details!</p>
        <br />
        <ul class="cards">
            <li v-for="(coObj,index) in comicsData" :key="index">
                <div v-if="comicsData" class="card" v-on:click="()=>{this.$router.push({ name: 'comicPg', params: {id: coObj.id} })}">
                    <img :src="coObj.thumbnail.path+'/portrait_incredible.'+coObj.thumbnail.extension" class="card__image" alt="Character Image" />
                    <div class="card__overlay">
                        <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                        <div class="card__header-text">
                            <h3 class="card__title">{{coObj.title}}</h3>            
                            <span class="card__status">Characters: {{coObj.characters.available}}</span><br />
                            <span class="card__status">Stories: {{coObj.stories.available}}</span><br />
                            <span class="card__status">Total Pages: {{coObj.pageCount}}</span>
                        </div>
                        </div>
                        <p class="card__description">{{setDes(coObj)}}</p>
                    </div>
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
    name: 'ComicsPage',
    data() {
        return {
        pagenum: this.$route.params.page,
        comicsData: null,
        lastpage: true
        };
    },
    methods: {
        setDes(coObj) {
            try {
                let des = "No description available";
                if (coObj && coObj.description && coObj.description.trim().length > 0){
                    des = coObj.description.trim();
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
                return this.$router.push({name: 'comics', params: {page: this.pagenum}})
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
        },
        prevBtn() {
            try {
                this.pagenum = Number(this.pagenum) - 1;
                return this.$router.push({name: 'comics', params: {page: this.pagenum}})
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
        },
        async comicDataFetch() {
            console.log(`Fetching data for comics page ${this.pagenum}...`);
            try {
                check.isValidNum(this.pagenum);
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
            try {
                const { data } = await axios.get('http://localhost:4000/api/comics/page/'+(parseInt(this.pagenum)-1));
                console.log(`Data recieved for comics page ${this.pagenum}!`);
                if ( (this.pagenum*data.limit >= data.total) || (data.offset + data.count >= data.total)){
                    this.lastpage = true;
                }
                else {
                    this.lastpage = false;
                }
                this.comicsData = data.results;
                // console.log(this.comicsData)
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
