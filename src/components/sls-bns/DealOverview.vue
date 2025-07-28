<template>
    <div class="container">
        <div class="row d-flex justify-content-between">
            <div class="col-5 d-flex justify-content-evenly">
                <div class="col-2">{{ deal.date }}</div>
                <div class="col-2">{{ deal.id }}</div>
                <div class="col">
                    <div class="row">
                        {{ deal.vehicle.id }}
                    </div>
                    <div class="row d-flex justify-content-evenly">
                        <div class="col">{{ deal.vehicle.year }}</div>
                        <div class="col">{{ deal.vehicle.make }}</div>
                        <div class="col">{{ deal.vehicle.model }}</div>
                    </div>
                </div>
            </div>
            <div class="col-4 d-flex justify-content-evenly">
                <div class="col">{{ deal.unitCount }}</div>
                <div class="col">{{ deal.commission.gross }}</div>
                <div class="col">{{ deal.commission.amount }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useSlsBnsStore } from "@/stores/sls-bns";
import type { Deal } from "@/utils";

const store = useSlsBnsStore();
const { getGross, getAmount, getUnitCount } = store;
const props = defineProps<{
    deal: Deal;
}>();
</script>
