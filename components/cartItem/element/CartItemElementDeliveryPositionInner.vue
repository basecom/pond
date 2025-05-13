<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useDateFormat } from '@vueuse/core';


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
    <template v-if="cartItemDeliveryPosition && cartItemDeliveryPosition.deliveryDate">
        <slot name="deliveryLabel">
            <span>
                {{ $t('checkout.deliveryPeriod') }}:
            </span>
        </slot>
        <slot name="deliveryDates">
            <span>
                {{ useDateFormat(cartItemDeliveryPosition.deliveryDate.earliest, 'DD/MM/YYYY') }}
                -
                {{ useDateFormat(cartItemDeliveryPosition.deliveryDate.latest, 'DD/MM/YYYY') }}
            </span>
        </slot>
    </template>
</template>
