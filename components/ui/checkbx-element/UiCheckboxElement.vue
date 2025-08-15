<script setup lang="ts">
import type { Columns } from '~/types/vueForm/Form';

withDefaults(
    defineProps<{
      id?: string;
      name?: string;
      rules?: string[] | string;
      messages?: {[key: string]: string};
      classes?: string;
      columns?: Columns,
    }>(),
    {
        id: undefined,
        name: undefined,
        rules: undefined,
        messages: undefined,
        classes: undefined,
        columns: undefined,
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
            :columns="columns"
        >
            <slot name="checkbox-element-content" />
        </CheckboxElement>
    </slot>
</template>
