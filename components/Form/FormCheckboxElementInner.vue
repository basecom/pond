<script setup lang="ts">
withDefaults(
    defineProps<{
      id?: string;
      label?: string;
      name?: string;
      rules?: string[] | string;
      messages?: {[key: string]: string};
    }>(),
    {
        id: undefined,
        label: undefined,
        name: undefined,
        rules: undefined,
        messages: undefined,
    },
);
</script>

<template>
    <slot name="checkbox-element">
        <CheckboxElement
            :id="id"
            :name="name"
            :rules="rules"
            :messages="messages"
        >
            {{ label }}
        </CheckboxElement>
    </slot>
</template>
