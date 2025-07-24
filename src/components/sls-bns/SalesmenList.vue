<template>
    <div class="accordion" id="salesmanList">
        <div class="accordion-item" v-for="salesman in salesmen">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${salesman.id}`" aria-expanded="true" :aria-controls="`collapse${salesman.id}`">
                    {{ salesman.name }}
                </button>
            </h2>
            <div :id="`collapse${salesman.id}`" class="accordion-collapse collapse show" data-bs-parent="#salesmanList">
                <div class="accordion-body">
                    <pre v-for="deal in allDeals[salesman.id]" :key="deal.id">
                        {{ deal }}
                    </pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSls0432Store } from "@/stores/sls-0432";

const store = useSls0432Store();
const { salesmen, allDeals } = storeToRefs(store);
</script>
<style scoped></style>