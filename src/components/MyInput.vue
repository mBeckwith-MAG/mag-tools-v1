<template>
    <label :for="id">{{ labelText }}</label>
    <input :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" :id="id" />
  </template>
  
  <script setup lang="ts">

  defineProps<{
    id: String,
    labelText: String,
    modelValue: String
  }>()
  </script>
  