<template>
    <component :is="tag">
        <template v-if="value">
            <timeago :title="title" :datetime="value" />
            <font-awesome-icon v-tippy="{ content: 'Hi!' }" :id="'clock-' + id" class="text-decoration-none p-0"
                :icon="['fas', 'clock']" style="margin-left: 5px;" data-toggle="tooltip" :title="title" />
        </template>

        <template v-else>
            -
        </template>
    </component>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas.faClock);
import { directive } from 'vue-tippy'

export default {
    props: {
        value: {
            default: 0
        },
        id: {
            default: ''
        },
        tag: {
            default: 'div'
        }
    },
    computed: {
        title() {
            return new Date(Date.parse(this.value)).toLocaleString();
        }
    },
    directives: {
        tippy: directive,
    }
}
</script>
