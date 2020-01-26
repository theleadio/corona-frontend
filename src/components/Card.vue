<template>
    <div>
        <div class="bg-primary text-white font-bold p-2">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
