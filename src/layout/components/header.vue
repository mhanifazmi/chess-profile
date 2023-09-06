
<template>
    <header class="masthead bg-primary text-white text-center">
        <p class="masthead-subheading font-weight-light mb-0">{{ title }}</p>
    </header>
</template>

<script>

export default {
    name: 'Header',
    components: {

    },
    props: {
        title: String,
    }
}
</script>
