<template>
    <div class="d-flex justify-content-row p-2">
        <UploadFile
            id="0432"
            @file-data="handleUpload"
            @clear-data="handleClear"
        />
        <UploadFile
            id="Roster"
            @file-data="handleUpload"
            @clear-data="handleClear"
            class="ms-2"
        />
    </div>
    <SalesmenList />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSlsBnsStore } from "@/stores/sls-bns";
import UploadFile from "@/components/sls-bns/UploadFile.vue";
import SalesmenList from "@/components/sls-bns/SalesmenList.vue";

const store = useSlsBnsStore();
const { report0432Header, report0432, salesmen } = storeToRefs(store);

const roster = ref([]);

const handleUpload = (result) => {
    switch (result.id) {
        case "0432":
            [report0432Header.value, ...report0432.value] = result.data;
            salesmen.value;
            break;
        case "Roster":
            roster.value = result.data;
            break;
    }
};

const handleClear = (id) => {
    switch (id) {
        case "0432":
            report0432.value = [];
            break;
        case "Roster":
            roster.value = [];
            break;
    }
};
</script>
