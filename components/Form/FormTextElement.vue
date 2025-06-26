<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

const props = withDefaults(
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
        floating: undefined,
        autocomplete: undefined,
    },
);
</script>

<template>
    <FormTextElementInner v-bind="props">
        <template #text-element>
            <slot name="text-element" />
        </template>
    </FormTextElementInner>
</template>
