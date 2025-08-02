<template>
    <div class="d-flex justify-content-row p-2">
        <UploadFile
            id="0432"
            @file-data="handleUpload"
            @clear-data="handleClear"
        />
        <UploadFile
            id="90"
            @file-data="handleUpload"
            @clear-data="handleClear"
            class="ms-2"
        />
        <UploadFile
            id="3213"
            @file-data="handleUpload"
            @clear-data="handleClear"
            class="ms-2"
        />
        <UploadFile
            id="SPIFFS"
            @file-data="handleUpload"
            @clear-data="handleClear"
            class="ms-2"
        />
    </div>
    <SalesmenList />
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSlsBnsStore } from "@/stores/sls-bns";
import UploadFile from "@/components/sls-bns/UploadFile.vue";
import SalesmenList from "@/components/sls-bns/SalesmenList.vue";

const store = useSlsBnsStore();
const { report0432Header, report0432 } = storeToRefs(store);



const handleUpload = (result) => {
    switch (result.id) {
        case "0432":
            [report0432Header.value, ...report0432.value] = result.data;
            break;
        case "90":
            [report90Header.value, ...report90.value] = result.data;
            break;
        case "3213":
            [report3213Header.value, ...report3213.value] = result.data;
            break;
        case "SPIFFS":
            [reportSpiffsHeader.value, ...reportSpiffs.value] = result.data;
            break;
    }
};

const handleClear = (id) => {
    switch (id) {
        case "0432":
            report0432Header.value, report0432.value = [];
            break;
        case "90":
            report90Header.value, report90.value  = [];
            break;
        case "3213":
            report3213Header.value, report3213.value  = [];
            break;
        case "SPIFFS":
            reportSpiffsHeader.value, reportSpiffs.value  = [];
            break;
    }
};
</script>
