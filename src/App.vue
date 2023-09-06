<template>
    <div id="app">
        <!-- Include a router-view to display the current route -->
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script>
const default_layout = "default-layout";

export default {
    name: 'App',
    computed: {
        layout() {
            // Get the layout from the current route's meta field
            const route = this.$route;
            const layout = route.meta && route.meta.layout;

            return layout || default_layout;
        },
    }
}
</script>
