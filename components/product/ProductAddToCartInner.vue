<script setup lang="ts">
withDefaults(
    defineProps<{
      isLoading?: boolean;
    }>(),
    {
        isLoading: false,
    },
);

const { product } = useProduct();
const { isInCart, count } = useAddToCart(product);
const { getStyle } = usePondStyle();

defineEmits<{
    (event: 'addToCart'): void;
}>();

// Set isProductInCard and productCount in onMounted. Otherwise, there are hydration mismatched
const isProductInCart = ref(false);
const productCount = ref(0);

onMounted(() => {
    isProductInCart.value = isInCart.value;
    productCount.value = count.value;
});
</script>

<template>
    <slot name="wrapper">
        <UiButton
            :class="getStyle('product.add.outer')"
            :is-loading="isLoading"
            @click="$emit('addToCart')"
        >
            {{ $t('product.addToCart') }}
            <slot name="is-in-cart-icon">
                <div v-if="isProductInCart" :class="getStyle('product.add.inner')">
                    <Icon name="mdi:cart-outline" :class="getStyle('product.add.icon')" />
                    {{ productCount }}
                </div>
            </slot>
        </UiButton>
    </slot>
</template>
