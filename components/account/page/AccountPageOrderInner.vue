<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    orders: Schemas['Order'][];
  }>();
console.log('orders', props.orders);
</script>

<template>
  <div>
    <h1>
      ORDERS
    </h1>
    <slot name="orders-overview">
      <div v-for="order in orders" :key="order.id">
        <!-- TODO: Akkordion für jede Order: Display Infos so wie im Core -->
        <UiAccordion type="single" collapsible>
          <UiAccordionItem value="my-account-order">
            <slot name="my-account-order-trigger">
              <UiAccordionTrigger class="text-lg font-bold">
                Order date: {{ useDateFormat(order.orderDate) }}
                Status: ---
                order number: ---
                Tabelle: shipping status, payment status, payment method, shipping method
              </UiAccordionTrigger>
            </slot>
            <slot name="my-account-order-content">
              <UiAccordionContent class="text-base">
                {{order.id}}
              </UiAccordionContent>
            </slot>
          </UiAccordionItem>
        </UiAccordion>
      </div>
    </slot>
  </div>
</template>