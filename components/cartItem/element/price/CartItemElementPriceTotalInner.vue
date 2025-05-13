<script setup lang="ts">
withDefaults(
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
