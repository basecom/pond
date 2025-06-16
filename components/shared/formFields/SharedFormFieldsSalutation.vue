<script setup lang="ts">
defineProps<{
  componentField: { string: string };
  defaultValue?: string | null;
}>();
</script>

<template>
    <SharedFormFieldsSalutationInner :component-field="componentField" :default-value="defaultValue">
        <template #label>
            <slot name="label" />
        </template>
    </SharedFormFieldsSalutationInner>
</template>
