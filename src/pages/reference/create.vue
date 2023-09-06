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
                            <button type="submit" class="btn btn-primary mt-2">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { apiUrl } from '../../constants/index'


export default {
    components: {
    },
    data: () => ({
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
    },
    methods: {
        async submitForm() {
            console.log(this.form)
            try {
                axios.post(apiUrl + 'references/create', this.form)
                    .then(response => {
                        this.$router.push('/references');
                    })
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while submitting the form.");
            }
        },
    },
}
</script>
