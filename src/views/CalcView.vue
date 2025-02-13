<script setup lang="ts">
import { storeToRefs } from 'pinia'
import FormItem from '@/components/FormItem.vue';
import ResultItem from '@/components/ResultItem.vue';
import { useVwCalcStore } from '@/stores/vw-calc';

const store = useVwCalcStore()
const { 
    modelChoice,
    invoiceAmt,
    msrpAmt,
    baseMsrpAmt,
    destinationAmt,
    optionsAmt,
    paintAmt,
    canCalculate,
    getTotal,
    getHoldback,
    getOptionsHB,
    getPaintHB,
    getTotalHB,
    getFPA,
    getIDM,
    getTrans,
    getVPB
} = storeToRefs(store)
const { clear } = store
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="d-flex justify-content-between">
                <div class="justify-content-start">
                    <div class="form-check form-check-inline">
                        <input class="btn-check" type="radio" name="modelOptions" id="genRadio" value="gen" v-model="modelChoice">
                        <label class="btn btn-outline-info btn-sm btn-block" for="genRadio">General</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="btn-check" type="radio" name="modelOptions" id="idRadio" value="other" v-model="modelChoice">
                        <label class="btn btn-outline-info btn-sm btn-block" for="idRadio">ID.4 / BUZZ</label>
                    </div>
                </div>
                <div class="btn btn-outline-danger btn-sm btn-block" v-if="canCalculate" @click="clear">
                    <span class="material-icons">delete</span>
                </div>
            </div>
        </div>
        <div v-if="modelChoice === 'gen'">
            <FormItem class="mt-4" :input-value="invoiceAmt">
                <template #label>Invoice</template>
            </FormItem>
            <FormItem class="mt-1" :input-value="msrpAmt">
                <template #label>MSRP</template>
            </FormItem>
            <FormItem class="mt-1" :input-value="baseMsrpAmt">
                <template #label>Base MSRP</template>
            </FormItem>
            <FormItem class="mt-1" :input-value="destinationAmt">
                <template #label>Destination</template>
            </FormItem>
            <ResultItem>
                <template #label>Total</template>
                <template #result>{{ getTotal }}</template>
            </ResultItem>
            <ResultItem class="mt-4" is-red="true">
                <template #label>Holdback</template>
                <template #result>{{ getHoldback }}</template>
            </ResultItem>
            <ResultItem is-red="true">
                <template #label>FPA</template>
                <template #result>{{ getFPA }}</template>
            </ResultItem>
            <ResultItem is-red="true">
                <template #label>IDM</template>
                <template #result>{{ getIDM }}</template>
            </ResultItem>
            <ResultItem is-red="true">
                <template #label>Trans Credit</template>
                <template #result>{{ getTrans }}</template>
            </ResultItem>
            <ResultItem is-red="true">
                <template #label>VPB</template>
                <template #result>{{ getVPB }}</template>
            </ResultItem>
        </div>
        <div v-else>
            <FormItem class="mt-4" :input-value="baseMsrpAmt">
                <template #label>Base MSRP</template>
            </FormItem>
            <FormItem :input-value="optionsAmt">
                <template #label>Options Total</template>
            </FormItem>
            <FormItem :input-value="paintAmt">
                <template #label>Paint</template>
            </FormItem>
            <ResultItem>
                <template #label>Holdback</template>
                <template #result>{{ getHoldback }}</template>
            </ResultItem>
            <ResultItem>
                <template #label>Options Holdback</template>
                <template #result>{{ getOptionsHB }}</template>
            </ResultItem>
            <ResultItem>
                <template #label>Paint Holdback</template>
                <template #result>{{ getPaintHB }}</template>
            </ResultItem>
            <ResultItem class="mt-4" is-red="true">
                <template #label>Total Holdback</template>
                <template #result>{{ getTotalHB }}</template>
            </ResultItem>
            <ResultItem is-red="true">
                <template #label>IDM</template>
                <template #result>{{ getIDM }}</template>
            </ResultItem>
        </div>
    </div>
</template>