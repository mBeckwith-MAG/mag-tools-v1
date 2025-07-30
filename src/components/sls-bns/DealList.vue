<template>
    <div class="container">
        <div v-for="deal in deals" :key="deal.id">
            <DealOverview :deal="deal" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useSlsBnsStore } from "@/stores/sls-bns";
import DealOverview from "./DealOverview.vue";

const store = useSlsBnsStore();
const { getDeals } = store;
const props = defineProps<{
    salesmanID: number;
}>();
const deals = getDeals(props.salesmanID);
</script>
