import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useVwCalcStore = defineStore('vw-calc', () => {
    const modelChoice = ref('gen')
    const invoiceAmt = ref(0)
    const msrpAmt = ref(0)
    const baseMsrpAmt = ref(0)
    const destinationAmt = ref(0)
    const optionsAmt = ref(0)
    const paintAmt = ref(0)

    const canCalculate = computed(() => {
        if(modelChoice.value === 'gen') {
            if(
            invoiceAmt.value != 0 &&
            msrpAmt.value != 0 &&
            baseMsrpAmt.value != 0 &&
            destinationAmt.value != 0
            ) return true
        } else {
            if(
            baseMsrpAmt.value != 0 &&
            optionsAmt.value != 0 &&
            paintAmt.value != 0
            ) return true
        }
        return false
    })

    const getTotal = computed(() => {
        if(canCalculate) {
            return Math.round(msrpAmt.value - destinationAmt.value).toFixed(2)
        }
        return 0.00
    })

    const getHoldback = computed(() => {
        if(canCalculate) {
            if(modelChoice.value === "other") {
                return (baseMsrpAmt.value * 0.048).toFixed(2)
            } else {
                return Math.round(Number(getTotal.value) * 0.02).toFixed(2)
            }
        }
        return 0.00
    })

    const getOptionsHB = computed(() => {
        if(modelChoice.value === "other") {
            if(optionsAmt.value > 0) {
                return Math.round(optionsAmt.value * 0.02).toFixed(2)
            }
            return 0.00
        }
        return 0.00
    })

    const getPaintHB = computed(() => {
        if(modelChoice.value === "other") {
            if(paintAmt.value > 0) {
                return Math.round(paintAmt.value * 0.078).toFixed(2)
            }
                return 0.00
        }
        return 0.00
    })

    const getTotalHB = computed(() => {
        if(modelChoice.value === "other") {
            const hb = Number(getHoldback.value)
            const opt = Number(getOptionsHB.value)
            const pnt = Number(getPaintHB.value)
            const ttl = hb + opt + pnt

            if(hb === 0 || opt === 0) return 0.00
            return Math.floor(ttl + 1).toFixed(2)
        }
        return (0).toFixed(2)
    })

    const getFPA = computed(() => {
        return Math.round(baseMsrpAmt.value * 0.015).toFixed(2)
    })

    const getIDM = computed(() => {
        if(modelChoice.value === "other") {
            return Math.round(baseMsrpAmt.value * 0.02).toFixed(2)
        }
        return Math.round(baseMsrpAmt.value * 0.008).toFixed(2)
    })

    const getTrans = computed(() => {
        return (baseMsrpAmt.value * 0.0135).toFixed(2)
    })

    const getVPB = computed(() => {
        return Math.round(baseMsrpAmt.value * 0.019).toFixed(2)
    })

    function clear() {
        modelChoice.value = 'gen'
        invoiceAmt.value = 0
        msrpAmt.value = 0
        baseMsrpAmt.value = 0
        destinationAmt.value = 0
        optionsAmt.value = 0
        paintAmt.value = 0
    }

    return { modelChoice, invoiceAmt, msrpAmt, baseMsrpAmt, destinationAmt, optionsAmt, paintAmt, canCalculate, getTotal, getHoldback, getOptionsHB, getPaintHB, getTotalHB, getFPA, getIDM, getTrans, getVPB, clear }
})