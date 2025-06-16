<script setup lang="ts">
const props = defineProps<{
  componentField: { string: string };
  defaultValue?: string | null;
}>();
</script>

<template>
  <SharedFormFieldsSalutationInner :componentField="componentField" :defaultValue="defaultValue">
    <template #label>
      <slot name="label" />
    </template>
  </SharedFormFieldsSalutationInner>
</template>