<template>
  <div class="body">
    <h1>Home</h1>
    <br />
    <p>
        The purpose of this web app is to complete Extra Lab of CS 554 and to gain knowledge and marks, mainly marks.
    </p>
    <p>
        Jokes Aside!
    </p>
    <br />
    <p>
        This Marvel API app will let you view for different characters, stories and comics.
    </p>
    <p>
        Click on the top four links and feel free to explore.
    </p>
    <br />
    <p>Some useful links:</p>
    <nav>
      <router-link :to="{name: 'chars', params: {page: 1}}" class="showlink">Characters Listing</router-link><br/>
      <router-link :to="{name: 'comics', params: {page: 1}}" class="showlink">Comics Listing</router-link><br/>
      <router-link :to="{name: 'stories', params: {page: 1}}" class="showlink">Stories Listing</router-link><br/>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #144547;
}
</style>
