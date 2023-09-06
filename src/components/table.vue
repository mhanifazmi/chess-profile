<template>
    <DataTable :data="items" :columns="columns" class="table table-bordered">
        <thead>
            <tr>
                <th v-for="item in columns" :key="item['key']">{{ item['label'] }}</th>
            </tr>
        </thead>
    </DataTable>
</template>
<style>
@import 'bootstrap';
@import 'datatables.net-bs5';

.mr-2 {
    margin-right: 5px;
}
</style>

<script>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

export default {
    components: {
        DataTable,
    },
    props: {
        columns: {
            type: Array,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
    },
    mounted() {
        console.log(this.columns)
    },
}
</script>
