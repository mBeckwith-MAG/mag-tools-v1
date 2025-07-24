import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useSlsBnsStore = defineStore('sls-bns', () => {
    const colNames = [
        "Date",
        "Reference#",
        "Salesperson#",
        "Salesperson Name",
        "Customer#",
        "Customer Name",
        "Stock#",
        "Description",
        "Sale Type",
        "COMMBL GROSS",
        "Units",
        "Gross%",
        "Commission Amount",
        "Remarks"
    ];
    const report0432: Ref<string[] | number[] | boolean[] | unknown[]> = ref([]);
    const currentSalesman = ref(null);
    const addSpiffModal = ref(false);
    const spiffs = ref([])

	const salesmen = computed(() => {
        const arr = [];
        report0432.value.forEach(row => {

        });
		return report0432.value;
	})

    return { report0432, currentSalesman, addSpiffModal, spiffs, salesmen }
})