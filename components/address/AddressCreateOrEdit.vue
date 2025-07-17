<script setup lang="ts">
import type { AddressData } from '~/types/vueForm/Address';

defineEmits<{
  onSubmit: [value: AddressData];
}>();
</script>

<template>
    <AddressCreateOrEditInner v-bind="$props" @on-submit="(value: AddressData) => $emit('onSubmit', value)" />
</template>
