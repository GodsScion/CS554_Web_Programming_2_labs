<template>
    <div class='App'>
    <header class='App-header'>
        <div class='flex'> 
          <img src='./assets/marvel.png' class='logo' alt='logo'/>
          <h1 class='App-title'>Marvel API</h1>    
        </div>
        <nav class='flex'>
          <router-link to="/" class="showlink">Home</router-link>
          <router-link :to="{name: 'chars', params: {page: 1}}" class="showlink">Characters</router-link>
          <router-link :to="{name: 'comics', params: {page: 1}}" class="showlink">Comics</router-link>
          <router-link :to="{name: 'stories', params: {page: 1}}" class="showlink">Stories</router-link>
        </nav>
    </header>
    <br />
    <br />
    <div class='App-body'>
      <RouterView/>
    </div>
  </div>
  <br/>
  <!-- <AboutPage/> -->
</template>

<script>
// import AboutPage from './components/AboutPage.vue'


export default {
  name: 'App'
  // components: {
  //   AboutPage
  // }
}
</script>

<style>
.bigcard {
  max-width: 15cm;
}

.body {
  background-color: azure;
  border-radius: 8px;
  padding: 1cm;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1px;
}


.App {
  text-align: center;
}

body {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 800%;
  animation: gradient 15s ease infinite;
  height: 100vh;
}
@keyframes gradient {
  0% {
      background-position: 0% 50%;
  }

  50% {
      background-position: 100% 50%;
  }

  100% {
      background-position: 0% 50%;
  }
}

.App-header {
  background-color: #282c34;
  max-height: 3cm;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-title {
  margin-left: 1cm;
}

.logo {
  height: 1cm;
  padding: 0.25cm;
  margin-left: 1cm;
}

.App-link {
  color: #61dafb;
}
 
.flex {
  display: flex;
  align-items: center;
  align-content: space-between;
  width: 100%;
}

.showlink {
  color: azure;
  margin-right: 1cm;
  font-weight: bolder;
  font-size: larger;
}

.row-box {
  display: inline-flex;
  align-content: space-between;
}


/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/*
.flex2 {
  display: flex;
  align-items: center;
  align-content: space-between; 
  width: 100%;
  max-height: 2cm;
} */

:root {
  --surface-color: rgb(217, 215, 215);
  --curve: 40;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans JP', sans-serif;
  background-color: #fef8f8;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 5vw;
  padding: 0;
  list-style-type: none;
}

.card {
  position: relative;
  display: block;
  height: 100%;
  min-height: 5cm;  
  border-radius: calc(var(--curve) * 1px);
  overflow: hidden;
  text-decoration: none;
}

.card__image {      
  width: 100%;
  height: auto;
}

.card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;      
  border-radius: calc(var(--curve) * 1px);    
  background-color: var(--surface-color);      
  transform: translateY(100%);
  transition: .2s ease-in-out;
}

.card:hover .card__overlay {
  transform: translateY(0);
}

.card__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 2em;
  border-radius: calc(var(--curve) * 1px) 0 0 0;    
  background-color: var(--surface-color);
  transform: translateY(-100%);
  transition: .2s ease-in-out;
}

.card__arc {
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 100%;
  right: 0;      
  z-index: 1;
}

.card__arc path {
  fill: var(--surface-color);
  /* d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z"); */
}       

.card:hover .card__header {
  transform: translateY(0);
}

.card__thumb {
  flex-shrink: 0;
  width: 50px;
  height: 50px;      
  border-radius: 50%;      
}

.card__title {
  font-size: 1.5em;
  font-weight: bolder;
  margin: 0 0 .3em;
  color: #000000;
}

.card__tagline {
  display: block;
  margin: 1em 0;
  font-family: "MockFlowFont";  
  font-size: .8em; 
  color: #D7BDCA;  
}

.card__status {
  margin-left: 0.3cm;
  margin-right: 0.7cm;
  font-size: .8em;
  font-weight: bolder;
  color: #232122;
}

.card__description {
  padding: 0 2em 2em;
  margin: 0;
  color: #000000;
  font-family: "MockFlowFont";   
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}    



/* CSS */
.button-1 {
  background-color: #000000;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin-left: 1cm;
  margin-right: 1cm;
  width: 3cm;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-1:hover,
.button-1:focus {
  background-color: #272727;
}

.link-text {
  color: darkblue;
  font-weight: bolder;
}
</style>
