<script setup lang="ts">
import type { Columns } from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      id?: string;
      label?: string;
      name?: string;
      placeholder?: string;
      rules?: string[] | string;
      messages?: {[key: string]: string};
      columns?: Columns,
      floating?: string;
      autocomplete?: string;
      conditions?: string[][];
      inputType?: string;
      debounce?: number;
      classes?: string;
    }>(),
    {
        id: undefined,
        label: undefined,
        name: undefined,
        placeholder: undefined,
        rules: undefined,
        messages: undefined,
        columns: undefined,
        floating: undefined,
        autocomplete: undefined,
        conditions: undefined,
        inputType: undefined,
        debounce: undefined,
        classes: undefined,
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
            :columns="columns"
            :floating="floating"
            :autocomplete="autocomplete"
            :conditions="conditions"
            :input-type="inputType"
            :debounce="debounce"
            :class="classes"
        />
    </slot>
</template>
