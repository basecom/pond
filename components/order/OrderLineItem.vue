<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  lineItem: Schemas['OrderLineItem'];
}>();
</script>

<template>
    <OrderLineItemInner :line-item="lineItem">
        <template #line-item>
            <slot name="line-item" />
        </template>
        <template #line-item-cover>
            <slot name="line-item-cover" />
        </template>
        <template #line-item-information>
            <slot name="line-item-information" />
        </template>
        <template #quantity>
            <slot name="quantity" />
        </template>
        <template #unit-price>
            <slot name="unit-price" />
        </template>
        <template #total-price>
            <slot name="total-price" />
        </template>
    </OrderLineItemInner>
</template>
