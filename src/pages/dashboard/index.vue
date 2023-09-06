<template>
    <div class=" container">
        <div class="row">
            <div class="col-3">
                <div class="card">
                    <div class="image">
                        <img :src="profile.avatar" alt="Image">
                    </div>
                    <div class="text">
                        {{ profile.name }}
                    </div>
                    <div class="line"></div>
                    <div class="text2">
                        {{ country }}
                    </div>
                    <a target="_blank" class="btn btn-dark" :href="profile.url">
                        Visit
                    </a>
                    <br>
                    <div class="icons d-block">
                        <div class="info-container">
                            <div class="label">Last Online</div>
                            <div class="value">
                                <Time :value="last_online" :id="profile.last_online" />
                            </div>
                        </div>
                        <div class="info-container">
                            <div class="label">Join Date</div>
                            <div class="value">
                                {{ joined }}
                            </div>
                        </div>
                        <div class="info-container">
                            <div class="label">League</div>
                            <div class="value">
                                {{ profile.league }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="row">
                    <div class="col-md-3 mb-3">
                        <label>Month:</label>
                        <select v-model="selectedMonth" class="form-control" @change="updateTableData">
                            <option v-for="(column, index) in months" :key="index" :value="index + 1">{{ column }}</option>
                        </select>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label>Year:</label>
                        <select v-model="selectedYear" class="form-control" @change="updateTableData">
                            <option v-for="(column, index) in years" :key="index">{{ column }}</option>
                        </select>
                    </div>
                    <div class="col-md-12">
                        <Table :items="tableData" :columns="columns"></Table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DataTable from 'datatables.net-vue3';
import axios from "axios";
import moment from "moment";
import Time from "../../components/time";
import { chessApiUrl, chessUsername } from '../../constants/index'
import MONTHS from "../../data/month";
import Table from "../../components/table"


export default {
    components: {
        Time,
        Table
    },
    data: () => ({
        profile: [],
        country: "",
        last_online: 0,
        joined: 0,
        tableData: [],
        years: [],
        months: MONTHS,
        tableColumns: [
            '#',
            'White',
            'Black',
            'Time Control',
            'Actions',
        ],
        columns: [
            {
                key: 'id',
                label: '#',
                data: null, render: function (data, type, row, meta) {
                    return `${meta.row + 1}`
                }
            },
            {
                key: 'white',
                label: 'White',
                data: 'white.username',
                createdCell: function (cell, data, row, index, colIndex) {
                    if (row.white.result == 'win') {
                        cell.classList.add('bg-win');
                    }
                },
            },
            {
                key: 'black',
                label: 'Black',
                data: 'black.username',
                createdCell: function (cell, data, row, index, colIndex) {
                    if (row.black.result == 'win') {
                        cell.classList.add('bg-win');
                    }
                },
            },
            {
                key: 'time_control',
                label: 'Time Control',
                data: null,
                render: function (data, type, row, meta) {
                    return row.time_class + " (" + row.time_control + ")"
                },
            },
            {
                key: 'actions',
                label: 'Actions',
                data: null,
                render: function (data, type, row, meta) {


                    return "<a target='_blank' class='btn btn-primary' href=" + row.url + ">View</a>"
                }
            },
        ],
        selectedMonth: moment().month(),
        selectedYear: moment().year(),
    }),
    mounted() {
        this.getProfile();
        this.updateTableData();
    },
    methods: {
        async getProfile() {
            const self = this;
            await axios.get(chessApiUrl + chessUsername)
                .then(function (response) {
                    self.profile = response.data;
                    self.last_online = moment.unix(self.profile.last_online).format('YYYY-MM-DDTHH:mm:ssZ');
                    self.joined = moment.unix(self.profile.joined).format('L');
                })
            this.getYear();

            await axios.get(self.profile.country)
                .then(function (response) {
                    self.country = response.data.name;
                })
        },
        async updateTableData() {
            let month = this.selectedMonth;

            for (let i in this.months) {
                if (this.months[i] == this.selectedMonth) {
                    month = parseInt(i) + 1;
                }
            }
            console.log(month)

            const self = this
            await axios.get(chessApiUrl + chessUsername + "/games/" + this.selectedYear + "/" + ('0' + month).slice(-2))
                .then(function (response) {
                    self.tableData = response.data.games;
                })
        },
        async getYear() {
            let start = moment(this.joined, "DD/MM/YYYY").year()
            let end = this.selectedYear;

            for (let i = start; i <= end; i++) {
                this.years.push(i)
            }
        },
    },
}
</script>
