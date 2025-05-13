<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      cartItemTotalPrice?: string
    }>(),
    {
        cartItemTotalPrice: undefined,
    },
);
</script>
<template>
    <span class="font-bold">
        <slot name="totalPrice">
            {{ cartItemTotalPrice }}*
        </slot>
    </span>

</template>
