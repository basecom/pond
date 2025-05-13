<script setup lang="ts">

withDefaults(
    defineProps<{
      referencedId?: string
    }>(),
    {
        referencedId: undefined,
    },
);
</script>
<template>
    <CartItemElementAddToWishlistInner :referenced-id="referencedId" />

</template>
