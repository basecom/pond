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
      native?: boolean;
      canClear?: boolean;
      items?: [];
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
        native: undefined,
        canClear: undefined,
        items: undefined,
    },
);
</script>

<template>
    <FormSelectElementInner v-bind="props">
        <template #select-element>
            <slot name="select-element" />
        </template>
    </FormSelectElementInner>
</template>
