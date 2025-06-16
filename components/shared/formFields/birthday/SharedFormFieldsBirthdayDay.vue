<script setup lang="ts">
defineProps<{
  componentField: { string: string };
  defaultValue?: number | null;
}>();
</script>

<template>
    <SharedFormFieldsBirthdayDayInner :component-field="componentField" :default-value="defaultValue">
        <template #label>
            <slot name="label" />
        </template>
    </SharedFormFieldsBirthdayDayInner>
</template>
