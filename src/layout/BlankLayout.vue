<template>
    <v-app id="app">
        <component :is="layout">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </component>
    </v-app>
</template>

<script>
const default_layout = "loading-page";

export default {
    computed: {
        layout() {
            return this.$route.meta.layout || default_layout;
        }
    }
}
</script>
