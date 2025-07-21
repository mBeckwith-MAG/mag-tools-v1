<template>
    <!-- <input type="file" accept=".xlsx" @change="handleFileUpload" /> -->
    <UploadFile id="upload0432" @file-data="handle0432" @clear-data="clear0432">
        <template #label>Upload 0432</template>
    </UploadFile>
    <pre>
        <div v-for="salesman in salesmen">
            {{ salesman }}
        </div>
    </pre>

    <UploadFile
        id="uploadRoster"
        @file-data="handleRoster"
        @clear-data="clearRoster"
    >
        <template #label>Upload Roster</template>
    </UploadFile>

    <pre>
        <div v-for="rost in roster">
            {{ rost }}
        </div>
    </pre>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSlsBnsStore } from "@/stores/sls-bns";
import UploadFile from "@/components/sls-bns/UploadFile.vue";

const store = useSlsBnsStore();
const { report0432, salesmen } = storeToRefs(store);

const roster = ref([]);

const handle0432 = (data) => {
    report0432.value = data;
};

const clear0432 = () => {
    report0432.value = [];
};

const handleRoster = (data) => {
    roster.value = data;
};

const clearRoster = () => {
    roster.value = [];
};
</script>
