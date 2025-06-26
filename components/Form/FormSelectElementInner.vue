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
        floating: false,
        autocomplete: undefined,
        native: false,
        canClear: false,
        items: undefined,
    },
);
</script>

<template>
    <slot name="select-element">
        <SelectElement
            :id="id"
            :name="name"
            :placeholder="placeholder"
            :label="label"
            :messages="messages"
            :rules="rules"
            :native="native"
            :can-clear="canClear"
            :items="items"
            :columns="cols"
            @change="(value: string) => $emit('on-change')"
        />
    </slot>
</template>
