<template>
    <div>
        <div class="container">
            <Logo/>
        </div>
        <Nav/>
        <div class="container">
            <Search class="mt-4"/>
        </div>
    </div>
</template>

<script>
    import Logo from "../components/Logo";
    import Nav from "../components/Nav";
    import Search from "../components/Search";
    export default {
        components: {
            Logo,
            Nav,
            Search
        }
    }
</script>
