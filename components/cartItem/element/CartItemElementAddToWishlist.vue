<script setup lang="ts">

const props = withDefaults(
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
