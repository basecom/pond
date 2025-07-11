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
const addToCart = () => {
    emit('addToCart');
};

const emit = defineEmits<{
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
            class="w-full"
            :is-loading="isLoading"
            @click="addToCart"
        >
            {{ $t('product.addToCart') }}
            <slot name="is-in-cart-icon">
                <div v-if="isProductInCart" class="flex ml-2 items-center">
                    <Icon name="mdi:cart-outline" class="size-4 mr-1" />
                    {{ productCount }}
                </div>
            </slot>
        </UiButton>
    </slot>
</template>
