<template>
    <Navbar />
    <Header :title="currentPageTitle" />
    <section class="page-section portfolio" id="portfolio">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </section>
    <Footer />
</template>

<script>
const default_layout = "default-layout";
import Header from "../layout/components/header"
import Navbar from "../layout/components/navbar"
import Footer from "../layout/components/footer"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    components: {
        Header,
        Navbar,
        Footer,
        'font-awesome-icon': FontAwesomeIcon,
    },
    data() {
        return {
            title: 'test', // Initialize the currentPageTitle data property
        };
    },
    computed: {
        layout() {
            return this.$route.meta.layout || default_layout;
        },
        currentPageTitle() {
            return this.$route.meta.title || 'Default Title'; // Use the route's meta title
        },
    }
}
</script>
