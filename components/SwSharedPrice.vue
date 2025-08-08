<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/SwSharedPrice.vue
// Changed: Use usePondPrice instead of usePrice
const { getFormattedPrice } = usePondPrice();
const props = defineProps<{
  value: number | undefined;
}>();

const getPrice = computed<string>(() => getFormattedPrice(props.value ?? 0));
</script>

<template>
    <p class="flex gap-1">
        <slot name="beforePrice" />
        <span>{{ getPrice }}</span>
        <slot name="afterPrice" />
    </p>
</template>
