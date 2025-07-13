<script setup lang="ts">
const { cartItems, cart, refreshCart } = useCart();
const {getFormattedPrice} = usePrice();
</script>

<template>
    <LayoutHeaderCartInner 
        :cart-items="cartItems" 
        :cart-deliveries="cart?.deliveries" 
        :cart-price-total="getFormattedPrice(cart?.price?.totalPrice)"
        @open="(value: boolean) => {if(value) refreshCart; }"
    />
</template>
