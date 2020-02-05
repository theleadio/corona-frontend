<template>
    <div>
        <div class="border-l-5 border-primary text-primary font-bold p-2 uppercase"><span class="ml-1">{{ title }}</span></div>
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
