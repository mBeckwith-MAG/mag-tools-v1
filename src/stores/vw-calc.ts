import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useVwCalcStore = defineStore('vw-calc', () => {
    const modelChoice = ref('gen')
    const invoiceAmt = ref(null)
    const msrpAmt = ref(null)
    const baseMsrpAmt = ref(null)
    const destinationAmt = ref(null)
    const optionsAmt = ref(null)
    const paintAmt = ref(null)

    const canCalculate = computed((): boolean => {
        if(modelChoice.value === 'gen') {
            if(invoiceAmt.value != null && msrpAmt.value != null && baseMsrpAmt.value != null && destinationAmt.value != null) return true
        } else {
            if( baseMsrpAmt.value != null && optionsAmt.value != null) return true
        }
        return false
    })

    const getTotal = computed(() => {
        // MSRP - Destination
        if(canCalculate) {
            if (msrpAmt.value != null && destinationAmt.value != null) {
                return Number(Math.round(Number(msrpAmt.value) - Number(destinationAmt.value)).toFixed(2))
            }
        }
        return Number(0.00)
    })

    const getHoldback = computed(() => {
        // Base MSRP * 4.8% || Base MSRP * 2%
        if(canCalculate) {
            if(modelChoice.value === "other") {
                if (baseMsrpAmt.value != null) {
                    return Number((baseMsrpAmt.value * 0.048).toFixed(2))
                }
            } else {
                return Math.round(Number(getTotal.value) * 0.02).toFixed(2)
            }
        }
        return Number(0.00)
    })

    const getOptionsHB = computed(() => {
        // Options Amount * 2%
        if (optionsAmt.value != null) {
            if(modelChoice.value === "other") {
                if(optionsAmt.value > 0) {
                    return Math.round(optionsAmt.value * 0.02).toFixed(2)
                }
            }
        }
        return 0.00
    })

    const getPaintHB = computed(() => {
        // Paint Amount * 7.8%
        if (paintAmt.value != null) {
            if(modelChoice.value === "other") {
                if(paintAmt.value > 0) {
                    return Math.round(paintAmt.value * 0.078).toFixed(2)
                }
            }
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
        return 0.00
    })

    const getFPA = computed(() => {
        // Base MSRP * 1.5%
        if (baseMsrpAmt.value != null) {
            return Math.round(baseMsrpAmt.value * 0.015).toFixed(2)
        }
        return 0.00
    })

    const getIDM = computed(() => {
        // Base MSRP * 2% || Base MSRP * 0.8%
        if (baseMsrpAmt.value != null) {
            if(modelChoice.value === "other") {
                return Math.round(baseMsrpAmt.value * 0.02).toFixed(2)
            } else {
                return Math.round(baseMsrpAmt.value * 0.008).toFixed(2)
            }
        }
        return 0.00
    })

    const getTrans = computed(() => {
        // Base MSRP * 1.35%
        // if value is under 50 (any hundred amount) round down, else round up next dollar amount
        if (baseMsrpAmt.value != null) {
            const value = (baseMsrpAmt.value * 0.0135).toFixed(2)
            let val = Math.floor(Math.round(Number(value)))
            const dollarVal = val % 100
            if (dollarVal > 50) return (val + 1).toFixed(2)
            return (val).toFixed(2)
        }
        return 0.00
    })

    const getVPB = computed(() => {
        // Base MSRP * 1.9%
        if (baseMsrpAmt.value != null) {
            return Math.round(baseMsrpAmt.value * 0.019).toFixed(2)
        }
        return 0.00
    })

    function clear() {
        modelChoice.value = 'gen'
        invoiceAmt.value = null
        msrpAmt.value = null
        baseMsrpAmt.value = null
        destinationAmt.value = null
        optionsAmt.value = null
        paintAmt.value = null
    }

    return { modelChoice, invoiceAmt, msrpAmt, baseMsrpAmt, destinationAmt, optionsAmt, paintAmt, getTotal, getHoldback, getOptionsHB, getPaintHB, getTotalHB, getFPA, getIDM, getTrans, getVPB, canCalculate, clear }
})