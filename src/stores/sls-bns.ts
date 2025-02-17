import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { removeFirst } from '@/utils'
import XLSX from 'xlsx'

interface Spiff {
    description: string,
    amount: number
}

export const useSlsBnsStore = defineStore('sls-bns', () => {
    const report0432: Ref<string>[] | null = ref(null);
    const currentSalesman = ref(null);
    const addSpiffModal = ref(false);
    const spiffs = ref([])

    const handle0432 = (event) => {
			const file = event.target.files[0];
			const reader = new FileReader();

			reader.onload = (e) => {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: 'array' });

				// Access the first worksheet
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];

				// Convert worksheet data to JSON
				let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
				jsonData = removeFirst(jsonData);
				report0432.value = jsonData;
			};
			reader.readAsArrayBuffer(file);
		};

    return { report0432, currentSalesman, addSpiffModal, spiffs }
})