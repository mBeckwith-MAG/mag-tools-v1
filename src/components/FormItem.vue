<template>
    <div class="row">
        <label class="col col-form-label">
            <slot name="label"></slot>
        </label>
        <div class="col">
            <input
                class="form-control" 
                :type="type" 
                :min="min" 
                :max="max" 
                :step="step" 
                :placeholder="placeholder"
                :value="modelValue"
                @input="$emit('inputValue', $event.target.value)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: Number || null || undefined,
        required: false
    },
    type: {
        type: String,
        default: 'number'
    },
    min: {
        type: Number,
        default: 0.00
    },
    max: {
        type: Number,
        default: 10000000.00
    },
    step: {
        type: Number,
        default: 0.01
    },
    placeholder: {
        type: String,
        default: '0.00'
    }
})

const emit = defineEmits(['inputValue'])
</script>