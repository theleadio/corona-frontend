<template>
    <div>
        <div class="bg-blue-100 rounded border border-blue-200 p-3">
            <div class="flex mb-4">
                <img :src="health" class="h-full w-auto" alt="health"/>
                <div class="flex flex-wrap ml-3 content-around">
                    <div class="font-bold text-md"><span class="text-green-600">Steps</span> to prevent coronavirus</div>
                    <div class="text-gray-600 text-sm">Read and share this with others</div>
                </div>
            </div>
            <nuxt-link class="block py-3 w-full bg-blue-500 rounded text-white text-center" to="prevention">Learn how</nuxt-link>
        </div>
    </div>
</template>

<script>
    import health from '~/assets/image/health-insurance-icon.png';
    
    export default {
        name: "LearnPrevention",
        data() {
            return {
                health
            }
        }
    }
</script>

<style scoped>

</style>
