<template>
    <div v-for="deal in deals" :key="deal.id">
        <DealOverview
            :deal="deal"
            class="border-bottom rounded-pill pb-2 pt-2"
        />
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useSlsBnsStore } from "@/stores/sls-bns";
import DealOverview from "./DealOverview.vue";

const store = useSlsBnsStore();
const { getDeals } = store;
const props = defineProps<{
    salesmanID: number;
}>();
const deals = getDeals(props.salesmanID);
</script>
