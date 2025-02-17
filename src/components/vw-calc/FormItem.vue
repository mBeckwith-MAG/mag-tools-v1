<template>
    <div class="row mt-1">
        <label :for="id" class="col form-label">
            <slot name="label"></slot>
        </label>
        <div class="col">
            <input
                class="col form-control" 
                type="number" 
                min=0.00 
                max=1000000.00 
                step=0.01 
                placeholder="0.00"
                :value="modelValue"
                @input="handleInput"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

defineProps<{
    id: string,
    modelValue: number | null| undefined
}>()

function handleInput(event:Event) {
    if(event.target) {
        const target = event.target as HTMLInputElement
        emit('update:modelValue', Number(target.value))
    }
}
</script>
<style scoped>
/* Hide the up and down arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>