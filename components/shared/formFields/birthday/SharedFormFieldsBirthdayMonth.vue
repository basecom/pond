<script setup lang="ts">
const props = defineProps<{
  componentField: { string: string };
  defaultValue?: number | null;
}>();
</script>

<template>
  <SharedFormFieldsBirthdayMonthInner :component-field="componentField" :default-value="defaultValue">
    <template #label>
      <slot name="label" />
    </template>
  </SharedFormFieldsBirthdayMonthInner>
</template>