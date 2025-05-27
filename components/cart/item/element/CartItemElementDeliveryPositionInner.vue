<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useDateFormat } from '@vueuse/core';
const formatDate = (date: string | undefined) => useDateFormat(date, 'DD/MM/YYYY');

withDefaults(
    defineProps<{
      cartItemDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
        cartItemDeliveryPosition: undefined,
    },
);

</script>
<template>
    <slot name="delivery-container">
        <template v-if="cartItemDeliveryPosition && cartItemDeliveryPosition.deliveryDate">
            <slot name="deliveryLabel">
                <span>
                    {{ $t('checkout.deliveryPeriod') }}:
                </span>
            </slot>
            <slot name="delivery-dates">
                <span>
                    {{ formatDate(cartItemDeliveryPosition.deliveryDate.earliest) }}
                    -
                    {{ formatDate(cartItemDeliveryPosition.deliveryDate.latest) }}
                </span>
            </slot>
        </template>
    </slot>
</template>
