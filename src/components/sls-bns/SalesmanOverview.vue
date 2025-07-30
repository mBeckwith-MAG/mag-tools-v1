<template>
    <div class="container fw-bold">
        <div class="row d-flex justify-content-between">
            <div class="col-6">
                <div class="row">
                    {{ salesman.id }}
                </div>
                <div class="row">
                    <h3>{{ salesman.name }}</h3>
                </div>
            </div>
            <div class="col d-flex flex-column ms-2 align-self-end">
                <div class="row text-center">
                    <div class="col">{{ units }}</div>
                    <div class="col" :class="{'text-danger' : gross < 0}">{{ gross }}</div>
                    <div class="col">{{ amount }}</div>
                </div>
                <div class="row text-center">
                    <div class="col">Units</div>
                    <div class="col">Gross</div>
                    <div class="col">Amount</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSlsBnsStore } from "@/stores/sls-bns";
import type { Salesman } from "@/utils";

const store = useSlsBnsStore();
const { getGross, getAmount, getUnitCount } = store;
const props = defineProps<{
    salesman: Salesman;
}>();
const units = ref(getUnitCount(props.salesman.id));
const gross = ref(getGross(props.salesman.id));
const amount = ref(getAmount(props.salesman.id));
</script>
