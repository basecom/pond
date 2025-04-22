<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useDateFormat } from '@vueuse/core'


const props = withDefaults(
    defineProps<{
      cartItemDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
      cartItemDeliveryPosition: undefined
    },
);

</script>
<template>
  <span>
    {{$t('deliveryPeriod')}}
  </span>:
  <span>
    <!-- todo: locale -->
    {{ useDateFormat(cartItemDeliveryPosition.deliveryDate.earliest, 'DD/MM/YYYY') }}
    -
    {{ useDateFormat(cartItemDeliveryPosition.deliveryDate.latest, 'DD/MM/YYYY') }}
  </span>

</template>