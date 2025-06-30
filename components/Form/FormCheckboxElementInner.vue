<script setup lang="ts">
withDefaults(
    defineProps<{
      id?: string;
      label?: string;
      name?: string;
      rules?: string[] | string;
      messages?: {[key: string]: string};
      classes?: string;
    }>(),
    {
        id: undefined,
        label: undefined,
        name: undefined,
        rules: undefined,
        messages: undefined,
        classes: undefined,
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
            :class="classes"
        >
            {{ label }}
        </CheckboxElement>
    </slot>
</template>
