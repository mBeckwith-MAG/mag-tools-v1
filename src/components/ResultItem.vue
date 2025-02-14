<template>
    <div class="row" :class="{ 'text-danger fw-bold': isRed }">
        <label class="col col-form-label">
            <slot name="label"></slot>
        </label>
        <label class="col col-form-label">
            <slot name="result"></slot>
        </label>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    isRed: false
})
</script>