<script setup lang="ts">
const emits = defineEmits<{
  'on-change': [value: boolean];
}>();
</script>

<template>
    <FormCheckboxElementInner v-bind="$props" @onChange="(value: boolean) => emits('on-change', value)">
        <template #checkbox-element>
            <slot name="checkbox-element" />
        </template>
    </FormCheckboxElementInner>
</template>
