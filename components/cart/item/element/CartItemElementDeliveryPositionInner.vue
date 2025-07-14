<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      cartItemDeliveryPosition?: Schemas['CartDeliveryPosition'];
    }>(),
    {
        cartItemDeliveryPosition: undefined,
    },
);

const { formatLocaleDate } = usePondDate();

const formatDate = (date: string ) => formatLocaleDate(date);
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
                    {{ formatDate(cartItemDeliveryPosition.deliveryDate.earliest || '') }}
                    -
                    {{ formatDate(cartItemDeliveryPosition.deliveryDate.latest || '') }}
                </span>
            </slot>
        </template>
    </slot>
</template>
