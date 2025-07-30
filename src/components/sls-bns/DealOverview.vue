<template>
    <div class="container">
        <div class="row d-flex justify-content-between">
            <div class="col-6">
                <div class="row">
                    {{ deal.id }}
                </div>
                <div class="row">
                    <h5 class="col-12 col-md-6 col-lg-4 col-xl-3">{{ deal.vehicle.id }}</h5>
                    <div class="col-1">{{ deal.vehicle.year }}</div>
                    <div class="col d-none d-lg-block">{{ deal.vehicle.make }}</div>
                    <div class="col">{{ deal.vehicle.model }}</div>

                </div>
            </div>
            <div class="col d-flex flex-column align-self-center">
                <div class="row text-center">
                    <div class="col">{{ deal.unitCount }}</div>
                    <div class="col" :class="{'text-danger' : gross < 0}">{{ gross }}</div>
                    <div class="col">{{ deal.commission.amount }}</div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from "vue";
import type { Deal } from "@/utils";

const props = defineProps<{
    deal: Deal;
}>();

const gross = ref(props.deal.commission.gross);
</script>
