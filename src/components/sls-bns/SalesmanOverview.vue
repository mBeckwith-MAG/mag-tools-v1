<template>
    <div class="container">
        <div class="row">
            <div class="col">{{ salesman.id }}</div>
        </div>
        <div class="row d-flex justify-content-between">
            <div class="col-5">{{ salesman.name }}</div>
            <div class="col-6 d-flex justify-content-evenly">
                <div class="col">{{ getUnitCount(salesman.id) }}</div>
                <div class="col">{{ getGross(salesman.id) }}</div>
                <div class="col">{{ getAmount(salesman.id) }}</div>
            </div>
        </div>
        <br />
        <div class="row d-flex justify-content-between fw-bold">
            <div class="col-5 d-flex justify-content-evenly">
                <div class="col">Deal</div>
                <div class="col">Vehicle</div>
            </div>
            <div class="col-6 col-md-5 col-lg-4 d-flex justify-content-evenly">
                <div class="col">Unit</div>
                <div class="col">Gross</div>
                <div class="col">Amount</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useSlsBnsStore } from "@/stores/sls-bns";
import type { Salesman } from "@/utils";

const store = useSlsBnsStore();
const { getGross, getAmount, getUnitCount } = store;
const props = defineProps<{
    salesman: Salesman;
}>();
</script>
