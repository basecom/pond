<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
      cartItem: undefined,
      cartDeliveryPosition: undefined
    },
);
</script>
<template>
  <div class="flex justify-between">
    <div>
      <div>
        <img :src="cartItem.cover.url"/>
      </div>
      <div>
        {{cartItem.label}}
      </div>
      <div>
        <span v-for="(property, index) in cartItem.payload.options">
          {{property.group}}: <span class="font-bold">{{property.option}}</span>
          <template v-if="index+1 < cartItem.payload.options.length">|</template>
        </span>
      </div>
      <div>{{cartItem.payload.productNumber}}</div>
      <div class="line-item-delivery-date">
        <template v-if="cartDeliveryPosition">
            {{cartDeliveryPosition.deliveryDate.earliest}} - {{cartDeliveryPosition.deliveryDate.latest}}
        </template>
      </div>
      <div>add-to-wishlist</div>
    </div>
    <div>remove</div>
  </div>
  <div>{{cartItem.price.quantity}}</div>
  <div>{{cartItem.price.totalPrice}}</div>
</template>