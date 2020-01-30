<template>
    <div>
        <div class="px-3 py-3">
            <span v-for="option in options" :key="option[valuekey]">
                <a v-if="itemSelected(option[valuekey])" class="inline-block bg-primary rounded-full px-3 py-1 text-sm text-white mr-2"
                @click="unselectItem(option[valuekey])">
                    {{option[displaykey]}} <i class="fas fa-times"></i>
                </a>
                <a v-else class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm mr-2"
                @click="selectItem(option[valuekey])">
                    {{option[displaykey]}} <i class="fas fa-plus"></i>
                </a>
            </span>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: "Multiselect",
        props: {
            options: Array,
            valuekey: String,
            displaykey: String,
            selectedValues: 
            {
                type: Array,
                default:function(){
                    return [];
                }
            }
        },
        data: function(){
            return {
                values: []
            }
        },
        watch: {
            selectedValues: function(){
                this.values = this.selectedValues
            }
        },
        methods:{
            itemSelected(value){
                return this.values.includes(value);
            },
            selectItem(value){
                this.values.push(value);
            },
            unselectItem(value){
                this.values = this.values.filter(item => item !== value);
            }
        },
        created(){
            this.values = this.selectedValues;
        },

    }
</script>

<style scoped>

</style>
