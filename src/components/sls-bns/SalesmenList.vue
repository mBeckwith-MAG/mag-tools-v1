<template>
    <div class="accordion" id="salesmanList">
        <div
            class="accordion-item"
            v-for="salesman in salesmen"
            :key="salesman.id"
        >
            <h2 class="accordion-header">
                <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#collapse${salesman.id}`"
                    aria-expanded="false"
                    :aria-controls="`collapse${salesman.id}`"
                >
                    <SalesmanOverview :salesman="salesman" />
                </button>
            </h2>
            <div
                :id="`collapse${salesman.id}`"
                class="accordion-collapse collapse show"
                data-bs-parent="#salesmanList"
            >
                <div class="accordion-body">
                    <DealList :salesman-i-d="salesman.id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSlsBnsStore } from "@/stores/sls-bns";
import DealList from "@/components/sls-bns/DealList.vue";
import SalesmanOverview from "@/components/sls-bns/SalesmanOverview.vue";

const store = useSlsBnsStore();
const { salesmen } = storeToRefs(store);
</script>
