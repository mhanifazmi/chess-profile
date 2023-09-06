<template>
    <div class=" container">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-md-6 mx-auto">
                        <div class="form-group">
                            <label for="email">Name</label>
                            <input disabled v-model="form.name" type="text" class="form-control" id="email">
                        </div>
                        <div class="form-group">
                            <label for="pwd">URL</label>
                            <input disabled v-model="form.url" type="text" class="form-control" id="pwd">
                        </div>
                        <button type="submit" class="btn btn-danger mt-2" @click="deleteConfirmation()">Delete</button>
                    </div>
                </div>
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
import Swal from 'sweetalert2'

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
        async deleteConfirmation() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteReferences()
                }
            })
        },
        deleteReferences() {
            try {
                axios.get(apiUrl + 'references/' + this.id + '/delete', this.form)
                    .then(response => {
                        this.$router.push('/references');
                    })
            } catch (error) {
                console.error("Error:", error);
            }
        }
    },
}
</script>
