<template>
    <div class="bg-primary flex">
        <div class="container flex flex-col md:flex-row font-bold text-white text-lg">
            <router-link
                class="mr-4 hover:text-green-200"
                :to="{ name: 'page.causes' }"
            >
                Causes
            </router-link>
            <router-link
                class="mr-4 hover:text-green-200"
                :to="{ name: 'page.prevention' }"
            >
                Prevention
            </router-link>
            <router-link
                class="mr-4 hover:text-green-200"
                :to="{ name: 'page.sources' }"
            >
                Sources
            </router-link>
            <router-link
                class="mr-4 hover:text-green-200"
                :to="{ name: 'page.countries' }"
            >
                Countries
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style scoped>

</style>
