<template>
    <div class="d-flex justify-content-between">
        <div class="justify-content-start">
            <div class="form-check form-check-inline">
                <input class="btn-check" type="radio" name="modelOptions" id="genRadio" value="gen"
                    v-model="modelChoice">
                <label class="btn btn-outline-info btn-sm btn-block" for="genRadio">General</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="btn-check" type="radio" name="modelOptions" id="idRadio" value="other"
                    v-model="modelChoice">
                <label class="btn btn-outline-info btn-sm btn-block" for="idRadio">ID.4 / BUZZ</label>
            </div>
        </div>
        <div class="btn btn-outline-danger btn-sm btn-block" v-if="canCalculate" @click="clear">
            <delete-icon />
        </div>
    </div>
    <VwCalcGeneralForm v-if="modelChoice === 'gen'" />
    <VwCalcOtherForm v-else />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useVwCalcStore } from '@/stores/vw-calc';
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import VwCalcGeneralForm from '@/components/vw-calc/VwCalcGeneralForm.vue'
import VwCalcOtherForm from '@/components/vw-calc/VwCalcOtherForm.vue'

const store = useVwCalcStore()
const { modelChoice, canCalculate } = storeToRefs(store)
const { clear } = store
</script>