<script setup lang="ts">
import FormItem from '@/components/FormItem.vue';
import ResultItem from '@/components/ResultItem.vue';
</script>

<template>
  <div>
    <FormItem>
      <template #label>Base MSRP</template>
    </FormItem>
    <FormItem>
      <template #label>Options Total</template>
    </FormItem>
    <FormItem>
      <template #label>Paint</template>
    </FormItem>
    <ResultItem>
      <template #label>Holdback</template>
      <template #result>0.00</template>
    </ResultItem>
    <ResultItem>
      <template #label>Options Holdback</template>
      <template #result>0.00</template>
    </ResultItem>
    <ResultItem>
      <template #label>Paint Holdback</template>
      <template #result>0.00</template>
    </ResultItem>
    <ResultItem is-red="true">
      <template #label>Total Holdback</template>
      <template #result>0.00</template>
    </ResultItem>
    <ResultItem is-red="true">
      <template #label>IDM</template>
      <template #result>0.00</template>
    </ResultItem>
  </div>
</template>