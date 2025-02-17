import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

interface Salesman {
	id: number,
	name: string
}

interface Spiff {
    description: string,
    amount: number
}

export const useSlsBnsStore = defineStore('sls-bns', () => {
    const report0432: Ref<string[] | number[] | boolean[] | unknown[]> = ref([]);
    const currentSalesman = ref(null);
    const addSpiffModal = ref(false);
    const spiffs = ref([])

	const salesmen = computed(() => {
		return report0432.value
	})

    return { report0432, currentSalesman, addSpiffModal, spiffs, salesmen }
})