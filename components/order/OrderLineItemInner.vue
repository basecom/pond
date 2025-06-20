<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
  lineItem: Schemas['OrderLineItem'];
}>();
</script>

<template>
  <div>
    orders
  </div>
</template>