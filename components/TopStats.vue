<template>
    <div>
        <Card title="COUNTRIES AFFECTED"></Card>
        <div class="my-2 font-bold text-xs text-gray-500 leading-tight">
            Source: National Health Commission of People's Republic of China and various international medias
        </div>
        <table class="table-auto w-full">
            <thead class="text-xs leading-tight border-b-2">
                <tr>
                    <th class="border px-2 py-2">Countries</th>
                    <th class="border px-1 py-2">Number Of Infections</th>
                    <th class="border px-1 py-2">Deaths</th>
                    <th class="border px-1 py-2">Cured</th>
                </tr>
            </thead>
            <tbody class="font-bold">
                <tr v-for="item in items" :key="item.country">
                    <td class="bg-gray-200 text-xs border px-2 py-2">{{item.country}}
                        <span :class="'flag-icon flag-icon-'+findCountryCode(item.country)"></span>
                    </td>
                    <td class="text-center border px-1 py-2">{{item.num_confirm}}</td>
                    <td class="text-center border px-1 py-2">{{item.num_dead}}</td>
                    <td class="text-center border px-1 py-2">{{item.num_heal}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Card from "../components/Card";

export default {
    name: "TopStats",
    components: {
        Card
    },
    data() {
        return {
            limit: '15',
            items: [],
            countries: [
                { code: "cn", name: "Mainland China" },
                { code: "hk", name: "Hong Kong" },
                { code: "id", name: "Indonesia" },
                { code: "jp", name: "Japan" },
                { code: "kr", name: "South Korea" },
                { code: "my", name: "Malaysia" },
                { code: "ph", name: "Philippines" },
                { code: "sg", name: "Singapore" },
                { code: "tw", name: "Taiwan" },
                { code: "th", name: "Thailand" },
                { code: "vn", name: "Vietnam" },
                { code: "us", name: "US" },
                { code: "de", name: "Germany" },
                { code: "au", name: "Australia" },
                { code: "ca", name: "Canada" },
                { code: "mo", name: "Macau" },
            ]
        }
    },
    methods: {
        findCountryCode(country) {
            const item = this.countries.filter(function(list) {
                return list.name == country;
            });
            if (item[0]) {
                return item[0].code;
            }
        }
    },
    created() {
        this.$api.stats.getTopStats(this.limit).then(data => this.items = data)
    }
}
</script>

<style scoped>

</style>
