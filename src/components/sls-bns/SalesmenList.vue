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
                <span>{{ salesman.id }}</span>
                <span class="ms-2 me-2">-</span>
                <span>{{ salesman.name }}</span>
                <span class="ms-4 me-2 badge bg-light text-dark">{{ getUnitCount[salesman.id] }}</span>
                </button>
            </h2>
            <div
                :id="`collapse${salesman.id}`"
                class="accordion-collapse collapse show"
                data-bs-parent="#salesmanList"
            >
                <div class="accordion-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style="width: 10%">Reference</th>
                                <th scope="col" style="width: 10%">Date</th>
                                <th scope="col">Vehicle</th>
                                <th scope="col" style="width: 10%">Gross</th>
                                <th scope="col" style="width: 10%">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="deal in allDeals[salesman.id]" :key="deal.id">
                            <th scope="row">{{ deal.id }}</th>
                            <td>{{ deal.date }}</td>
                            <td>
                                <span>{{ deal.vehicle.year }}</span>
                                <span class="ms-2 me-2">{{ deal.vehicle.make }}</span>
                                <span>{{ deal.vehicle.model }}</span> 
                            </td>
                            <td :class="{ 'text-danger fw-bold': deal.commission.gross < 0 }">{{ deal.commission.gross }}</td>
                            <td>{{ deal.commission.amount }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-between">
                        <div class="col-9">TOTAL</div>
                        <div class="me-3">Gross</div>
                        <div class="me-5">Amount</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSls0432Store } from "@/stores/sls-0432";

const store = useSls0432Store();
const { salesmen, allDeals, getUnitCount } = storeToRefs(store);
</script>
<style scoped></style>
