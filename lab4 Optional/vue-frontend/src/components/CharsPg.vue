<template>
    <div>
        <h2 style="color: black;">All Characters</h2>
        <div class='row-box'>
            <button v-if="pagenum > 1" class="button-1" v-on:click="prevBtn">Previous</button>
            <p style="color: black;"> Page Number: {{pagenum}}</p>
            <button v-if="!lastpage" class="button-1" v-on:click="nextBtn">Next</button>
        </div>
        <p style="color: black;">Click on cards for more details!</p>
        <br />
        <ul class="cards">
            <li v-for="(chObj,index) in charsData" :key="index">
                <div v-if="charsData" class="card" v-on:click="()=>{this.$router.push({ name: 'chPg', params: {id: chObj.id} })}">
                    <img :src="chObj.thumbnail.path+'/portrait_incredible.'+chObj.thumbnail.extension" class="card__image" alt="Character Image" />
                    <div class="card__overlay">
                        <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                        <div class="card__header-text">
                            <h3 class="card__title">{{chObj.name}}</h3>            
                            <span class="card__status">Comics: {{chObj.comics.available}}</span><br />
                            <span class="card__status">Series: {{chObj.series.available}}</span><br />
                            <span class="card__status">Stories: {{chObj.stories.available}}</span>
                        </div>
                        </div>
                        <p class="card__description">{{setDes(chObj)}}</p>
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
    name: 'CharsPage',
    data() {
        return {
        pagenum: this.$route.params.page,
        charsData: null,
        lastpage: true
        };
    },
    methods: {
        setDes(chObj) {
            try {
                let des = "No description available";
                if (chObj && chObj.description && chObj.description.trim().length > 0){
                    des = chObj.description.trim();
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
                return this.$router.push({name: 'chars', params: {page: this.pagenum}})
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
        },
        prevBtn() {
            try {
                this.pagenum = Number(this.pagenum) - 1;
                return this.$router.push({name: 'chars', params: {page: this.pagenum}})
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
        },
        async dataFetch() {
            console.log(`Fetching data for characters page ${this.pagenum}...`);
            try {
                check.isValidNum(this.pagenum);
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
            try {
                const { data } = await axios.get('http://localhost:4000/api/characters/page/'+(this.pagenum-1));
                console.log(`Data recieved for characters page ${this.pagenum}!`);
                // parseInt(pagenum);
                if ( (this.pagenum*data.limit >= data.total) || (data.offset + data.count >= data.total)){
                    this.lastpage = true;
                }
                else {
                    this.lastpage = false;
                }
                // if (data) {setchdata(data);}
                this.charsData = data.results;
                // Cards = data.results.map( (x) => {return buildCard(x)})
                // console.log('Succesfully generated cards');
            } catch (error) {
                console.error(error.message || error);
                return this.$router.push({ name: 'error', params: {message: error.message || error} })
            }
        }
  
    },
    created() {
        this.dataFetch();
    },
    watch: {
        pagenum(){
            this.dataFetch()
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
</style>