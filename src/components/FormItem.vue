<template>
    <div class="row">
        <label :for="id" class="col form-label">
            <slot name="label"></slot>
        </label>
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