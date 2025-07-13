<script setup lang="ts">
const emits = defineEmits<{
  'remove-cart-item': [],
}>();

</script>
<template>
    <CartItemElementRemoveInner
        @remove-cart-item="emits('remove-cart-item')"
    />
</template>
