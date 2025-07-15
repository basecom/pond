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
      floating?: boolean;
      autocomplete?: string;
      isNative?: boolean;
      canClear?: boolean;
      canDeselect?: boolean;
      items?: [];
      defaultValue?: string;
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
        floating: false,
        autocomplete: undefined,
        isNative: false,
        canClear: false,
        items: undefined,
        defaultValue: undefined,
        canDeselect: false,
        classes: undefined,
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
            :native="isNative"
            :can-clear="canClear"
            :can-deselect="canDeselect"
            :items="items"
            :columns="columns"
            :default="defaultValue"
            :floating="floating"
            :class="classes"
            @change="(value: string) => $emit('on-change', value)"
        />
    </slot>
</template>
