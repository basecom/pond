<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useDateFormat } from '@vueuse/core';


const props = withDefaults(
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
        <span>
            {{ $t('checkout.deliveryPeriod') }}
        </span>:
        <span>
            {{ useDateFormat(cartItemDeliveryPosition.deliveryDate.earliest, 'DD/MM/YYYY') }}
            -
            {{ useDateFormat(cartItemDeliveryPosition.deliveryDate.latest, 'DD/MM/YYYY') }}
        </span>
    </template>
</template>
