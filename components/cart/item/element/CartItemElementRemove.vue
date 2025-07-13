<script setup lang="ts">
const emits = defineEmits<{
  removeCartItem: [],
}>();

</script>
<template>
    <CartItemElementRemoveInner
        @remove-cart-item="emits('removeCartItem')"
    />
</template>
