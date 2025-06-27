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
      columns?: Columns,
      floating?: boolean;
      autocomplete?: string;
      native?: boolean;
      canClear?: boolean;
      canDeselect?: boolean;
      items?: [];
      defaultValue?: string;
    }>(),
    {
        id: undefined,
        label: undefined,
        name: undefined,
        placeholder: undefined,
        rules: undefined,
        messages: undefined,
        columns: undefined,
        floating: false,
        autocomplete: undefined,
        native: false,
        canClear: false,
        items: undefined,
        defaultValue: undefined,
        canDeselect: false,
    },
);

defineEmits<{
  'on-change': [value: string];
}>();
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
            :can-deselect="canDeselect"
            :items="items"
            :columns="columns"
            :default="defaultValue"
            :floating="floating"
            @change="(value: string) => $emit('on-change', value)"
        />
    </slot>
</template>
