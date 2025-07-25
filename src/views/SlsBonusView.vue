<template>
    <div class="d-flex justify-content-row p-2">
        <UploadFile id="0432" @file-data="handleUpload" @clear-data="handleClear" />
        <UploadFile
            id="Roster"
            @file-data="handleUpload"
            @clear-data="handleClear"
            class="ms-2"
        />
    </div>
    
    <div v-if="!currentSalesman">
        <SalesmenList />
    </div>
    <div v-else>
        <pre>{{ deals }}</pre>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSls0432Store } from "@/stores/sls-0432";
import UploadFile from "@/components/sls-bns/UploadFile.vue";
import SalesmenList from "@/components/sls-bns/SalesmenList.vue";

const store = useSls0432Store();
const { reportHeader, report, salesmen, currentSalesman, deals, getUnitCount } = storeToRefs(store);

const roster = ref([]);

const handleUpload = (result) => {
    switch(result.id) {
        case '0432':
            [reportHeader.value, ...report.value] = result.data;
            salesmen.value;
        break;
        case 'Roster': roster.value = result.data;
        break; 
    }
};

const handleClear = (id) => {
    currentSalesman.value = null;
    switch(id) {
        case '0432': report.value = [];
        break;
        case 'Roster': roster.value = [];
        break; 
    }
};
</script>
