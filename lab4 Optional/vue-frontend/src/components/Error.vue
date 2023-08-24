<template>
    <div class="body">
        <h1>Error Occured!</h1>
        <main>
            <p class="error">{{message}}</p>
        </main>
    </div>

</template>

<script>
export default {
    name: 'ErrorPage',
    data() {
        return {
            message: this.$route.params.message
        }
    }
}

</script>

<style scoped>
</style>