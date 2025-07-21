<template>
    <div v-if="!hasData">
        <input
            :id="id"
            type="file"
            accept=".xlsx, .xls"
            @change="handleUpload"
        />
        <label :for="id" class="btn btn-secondary">
            <slot name="label"></slot>
        </label>
    </div>
    <div v-else>
        <button @click="handleClear" class="btn btn-secondary">CLEAR</button>
    </div>
</template>
<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { read, utils } from "xlsx";

defineProps<{
    id: string;
}>();

const hasData = ref(false);

const emit = defineEmits(["fileData", "clearData"]);

const handleUpload = (event: Event) => {
    const file = event.target?.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const workbook = read(e.target?.result);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
        emit("fileData", jsonData);
        hasData.value = true;
    };
    reader.readAsArrayBuffer(file);
};

const handleClear = () => {
    emit("clearData");
    hasData.value = false;
};
</script>
<style scoped>
input {
    display: none;
}
</style>
