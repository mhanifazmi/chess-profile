<template>
    <div class=" container">
        <div class="row">
            <div class="col-12">
                <form @submit.prevent="submitForm">
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <div class="form-group">
                                <label for="email">Name</label>
                                <input v-model="form.name" type="text" class="form-control" id="email">
                            </div>
                            <div class="form-group">
                                <label for="pwd">URL</label>
                                <input v-model="form.url" type="text" class="form-control" id="pwd">
                            </div>
                            <div style="text-align: right;">
                                <a type="button" class="btn btn-secondary mt-2" style="margin-right: 5px;"
                                    href="/references">Back</a>
                                <button type="submit" class="btn btn-danger mt-2"
                                    @click="deleteConfirmation()">Delete</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import axios from "axios";
import moment from "moment";
import { apiUrl } from '../../constants/index'


export default {
    components: {
    },
    data: () => ({
        id: null,
        references: [],
        form: {
            name: "",
            url: "",
        },
        columns: [
            {
                key: 'id',
                width: "5%",
                label: '#',
                data: null, render: function (data, type, row, meta) {
                    return `${meta.row + 1}`
                }
            },
            {
                key: 'name',
                label: 'name',
                data: 'name',
            },
            {
                key: 'actions',
                width: "20%",
                label: 'Actions',
                data: null,
                render: function (data, type, row, meta) {
                    return "<a target='_blank' class='btn btn-primary' href=" + row.url + ">View</a>"
                }
            },
        ],
    }),
    mounted() {
        const route = useRoute();
        this.id = computed(() => route.params.id);
        this.getData();
    },
    methods: {
        async submitForm() {
            try {
                axios.post(apiUrl + 'references/' + this.id + '/edit', this.form)
                    .then(response => {
                        this.$router.push('/references');
                    })
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while submitting the form.");
            }
        },
        async getData() {
            const self = this
            await axios.get(apiUrl + 'references/' + this.id)
                .then(function (response) {
                    self.form.name = response.data.data.reference.name
                    self.form.url = response.data.data.reference.url
                })
        },
    },
}
</script>
