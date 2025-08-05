<script setup lang="ts">
const { cartItems, cart, count } = useCart();
</script>

<template>
    <LayoutHeaderCartInner 
        :cart-items="cartItems" 
        :cart-deliveries="cart?.deliveries"
        :cart-item-count="count"
    />
</template>
