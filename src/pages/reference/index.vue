<template>
    <div class=" container">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-md-12 d-flex justify-content-end mb-4">
                        <a href="/references/create"><button class="btn btn-primary">Create</button></a>
                    </div>
                    <div class="col-md-12">
                        <Table :items="references" :columns="columns"></Table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { apiUrl } from '../../constants/index'
import Table from "../../components/table"

export default {
    components: {
        Table,
    },
    data: () => ({
        references: [],
        columns: [
            {
                key: 'id',
                label: '#',
                data: null, render: function (data, type, row, meta) {
                    return `${meta.row + 1}`
                }
            },
            {
                key: 'name',
                label: 'Name',
                data: 'name',
            },
            {
                key: 'url',
                label: 'URL',
                data: null,
                render: function (data, type, row, meta) {
                    return "<a target='_blank' href='" + row.url + "'>" + row.url + "</a>";
                }
            },
            {
                key: 'actions',
                label: 'Actions',
                data: null,
                render: function (data, type, row, meta) {
                    return "<a class='btn btn-primary mr-2' href='/references/" + row.id + "'>View</a><a class='btn btn-warning mr-2' href='/references/" + row.id + "/edit'> Edit</>";
                }
            },
        ],
    }),
    mounted() {
        this.updateTableData();
    },
    methods: {
        async updateTableData() {
            const self = this
            await axios.get(apiUrl + 'references',
                {
                    withCredentials: false // or omit this line, as false is the default
                })
                .then(function (response) {
                    self.references = response.data.data.references
                })
                .catch(error => {
                    console.log(error)
                });
        },
        deleteReference() {
        }
    },
}
</script>
