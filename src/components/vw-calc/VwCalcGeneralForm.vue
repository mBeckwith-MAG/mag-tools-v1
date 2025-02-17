<template>
    <FormSection>
        <FormItem id="invoiceAmt" v-model="invoiceAmt">
            <template #label>Invoice</template>
        </FormItem>
        <FormItem id="msrpAmt" v-model="msrpAmt">
            <template #label>MSRP</template>
        </FormItem>
        <FormItem id="baseMsrpAmt" v-model="baseMsrpAmt">
            <template #label>Base MSRP</template>
        </FormItem>
        <FormItem id="destinationAmt" v-model="destinationAmt">
            <template #label>Destination</template>
        </FormItem>
        <ResultItem>
            <template #label>Total</template>
            <template #result>{{ getTotal }}</template>
        </ResultItem>
    </FormSection>
    <FormSection v-if="canCalculate">
        <ResultItem :is-red="true">
            <template #label>Holdback</template>
            <template #result>{{ getHoldback }}</template>
        </ResultItem>
        <ResultItem :is-red="true">
            <template #label>FPA</template>
            <template #result>{{ getFPA }}</template>
        </ResultItem>
        <ResultItem :is-red="true">
            <template #label>IDM</template>
            <template #result>{{ getIDM }}</template>
        </ResultItem>
        <ResultItem :is-red="true">
            <template #label>Trans Credit</template>
            <template #result>{{ getTrans }}</template>
        </ResultItem>
        <ResultItem :is-red="true">
            <template #label>VPB</template>
            <template #result>{{ getVPB }}</template>
        </ResultItem>
    </FormSection>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useVwCalcStore } from '@/stores/vw-calc';
import FormSection from '@/components/vw-calc/FormSection.vue'
import FormItem from '@/components/vw-calc/FormItem.vue'
import ResultItem from '@/components/vw-calc/ResultItem.vue'

const store = useVwCalcStore()
const {
    invoiceAmt,
    msrpAmt,
    baseMsrpAmt,
    destinationAmt,
    getTotal,
    getHoldback,
    getFPA,
    getIDM,
    getTrans,
    getVPB,
    canCalculate
} = storeToRefs(store)
</script>
