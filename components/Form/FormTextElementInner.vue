<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      id?: string;
      label?: string;
      name?: string;
      placeholder?: string;
      rules?: string[] | string;
      messages?: {[key: string]: string};
      cols?: Columns,
      floating?: boolean;
      autocomplete?: string;
    }>(),
    {
        id: undefined,
        label: undefined,
        name: undefined,
        placeholder: undefined,
        rules: undefined,
        messages: undefined,
        cols: undefined,
        floating: false,
        autocomplete: undefined,
    },
);
</script>

<template>
    <slot name="text-element">
        <TextElement
            :id="id"
            :label="label"
            :name="name"
            :placeholder="placeholder"
            :rules="rules"
            :messages="messages"
            :columns="cols"
            :floating="floating"
            :autocomplete="autocomplete"
        />
    </slot>
</template>
