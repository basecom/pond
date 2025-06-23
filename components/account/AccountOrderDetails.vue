<script setup lang="ts">
const props = defineProps<{
  orderId: string;
}>();
const {
    loadOrderDetails,
    order,
    paymentMethod,
    shippingCosts,
    total,
} = await useOrderDetails(props.orderId);

onMounted(async () => {
    await loadOrderDetails();
});

</script>

<template>
    <AccountOrderDetailsInner
        :order="order"
        :payment-method-name="paymentMethod?.name ?? ''"
        :shipping-costs="shippingCosts"
        :total="total"
        :payment-state="order?.transactions?.[0]?.stateMachineState?.name ?? ''"
        :shipping-method-name="order?.deliveries?.[0]?.shippingMethod?.name ?? ''"
        :shipping-state="order?.deliveries?.[0]?.stateMachineState?.name ?? ''"
        :tracking-codes="order?.deliveries?.[0]?.trackingCodes"
    />
</template>
