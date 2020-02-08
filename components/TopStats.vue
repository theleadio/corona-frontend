<template>
    <div>
        <Card title="COUNTRIES AFFECTED"></Card>
        <div class="my-2 font-bold text-xs text-gray-500 leading-tight">
            Source: National Health Commission of People's Republic of China and various international medias
        </div>
        <table class="table-auto w-full">
            <thead class="text-xs leading-tight border-b-2">
                <tr>
                    <th class="border px-2 py-2">Country</th>
                    <th class="border px-1 py-2">Confirmed</th>
                    <th class="border px-1 py-2">Recovered</th>
                    <th class="border px-1 py-2">Deaths</th>
                </tr>
            </thead>
            <tbody class="font-bold">
                <tr v-for="item in items" :key="item.country">
                    <td class="bg-gray-200 text-xs border px-2 py-2">
                        <span :class="'flag-icon flag-icon-'+findCountryCode(item.country)"></span>
                        {{item.country}}
                    </td>
                    <td class="text-center border px-1 py-2">{{item.num_confirm | formatThousands}}</td>
                    <td class="text-center border px-1 py-2">{{item.num_heal | formatThousands}}</td>
                    <td class="text-center border px-1 py-2">{{item.num_dead | formatThousands}}</td>
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
            limit: 15,
            items: [],
            countries: [
                { code: "cn", name: "China" },
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
            const item = this.countries.find(a => a.name === country);
            return item && item.code;
        }
    },
    async created() {
        const data = await this.$api.stats.getTopStats(this.limit)
        this.items = data
          .filter(a => a.country !== 'Others')
          .map(a => {
              if (a.country === 'Mainland China') {
                  a.country = 'China';
              }

              return a;
          });
    }
}
</script>

<style scoped>

</style>
