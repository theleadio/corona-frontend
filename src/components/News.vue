<template>
    <div class="bg-cover bg-center bg-no-repeat h-64 w-full relative mb-4" style="background-image: url('bg.png')">
        <div class="content  absolute bottom-0 w-full px-2 py-4 text-black">
            <h2 class="font-bold text-2xl">Title Here</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "News"
    }
</script>

<style scoped>
    .content {
        background: rgba(196, 196, 196, 0.7);
    }
</style>
