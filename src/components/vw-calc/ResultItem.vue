<template>
    <div class="row" :class="{ 'text-danger fw-bold': isRed }">
        <label class="col col-form-label">
            <slot name="label"></slot>
        </label>
        <label class="col col-form-label ms-4">
            <slot name="result"></slot>
        </label>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    isRed?: Boolean
}>()
</script>