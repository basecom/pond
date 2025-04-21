<script setup lang="ts">
const { cartItems, cart } = useCart();
</script>

<template>
    <LayoutHeaderCartInner :cart-items="cartItems" :cart-deliveries="cart?.deliveries" />
</template>
