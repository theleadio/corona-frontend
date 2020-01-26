<template>
    <div class="flex items-center py-3 cursor-pointer" v-on:click="goHome">
        <img src="logo.png" class="h-16 w-auto mr-4"/>
        <div class="text-3xl font-bold">Corona<span class="text-red-600">Tracker</span></div>
    </div>
</template>

<script>
    export default {
        name: "Logo",
        methods: {
            goHome: function () {        
                // eslint-disable-next-line no-console
                if (this.$route.name !== "page.home") this.$router.push({name: "page.home"});
                
            }
        }
    }
</script>

<style scoped>

</style>
