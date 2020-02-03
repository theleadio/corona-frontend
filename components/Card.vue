<template>
    <div>
        <div class="bg-primary text-white font-bold p-2">{{ title }}</div>
        <div class="bg-gray-100">
            <slot></slot>
        </div>
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
