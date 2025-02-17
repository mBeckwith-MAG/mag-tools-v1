<template>
    <div v-if="!hasReport">
        <input type="file" accept=".xlsx" @change="handleFileUpload">
    </div>
    <div v-else>
        <div v-for="salesman in salesmen" :key="salesman">
            {{ salesman }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSlsBnsStore } from "@/stores/sls-bns";
import { read, utils } from 'xlsx'

const store = useSlsBnsStore()
const { report0432, salesmen } = storeToRefs(store)

const hasReport = ref(false)

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });

        // Access the first worksheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert worksheet data to JSON
        let jsonData = await utils.sheet_to_json(worksheet, { header: 1 });
        // jsonData = removeFirst(jsonData);
        report0432.value = jsonData;
        hasReport.value = true
    };
    reader.readAsArrayBuffer(file);
}
</script>