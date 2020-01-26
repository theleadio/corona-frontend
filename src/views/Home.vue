<template>
    <div>
        <div class="container">
            <Logo/>
        </div>
        <Nav/>
        <div class="container">
            <Search class="mt-4 mb-8"/>
            <div class="flex flex-wrap -mx-2">
                <div class="w-full md:w-2/3 px-2">
                    <Card title="Trending News">
                    </Card>

                    <News/>

                    <div class="flex flex-wrap -mx-2">
                        <div class="w-full md:w-1/2 px-2">
                            <News/>
                        </div>
                        <div class="w-full md:w-1/2 px-2">
                            <News/>
                        </div>
                        <div class="w-full md:w-1/2 px-2">
                            <News/>
                        </div>
                        <div class="w-full md:w-1/2 px-2">
                            <News/>
                        </div>
                    </div>

                </div>
                <div class="w-full md:w-1/3 px-2">
                    <div class="mb-4">
                        <Card title="Recent News">
                        </Card>
                        <RecentNews v-for="index in 4" :key="index"/>
                    </div>

                    <NotifyCard/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from "../components/Card";
    import Logo from "../components/Logo";
    import Nav from "../components/Nav";
    import News from "../components/News";
    import NotifyCard from "../components/NotifyCard";
    import RecentNews from "../components/RecentNews";
    import Search from "../components/Search";

    export default {
        components: {
            Card,
            Logo,
            Nav,
            News,
            NotifyCard,
            RecentNews,
            Search
        }
    }
</script>
