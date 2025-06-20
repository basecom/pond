<script setup lang="ts">
const { product } = useProduct();
const { isInCart, count } = useAddToCart(product);
const addToCart = () => {
    emit('addToCart');
};

const emit = defineEmits<{
    (event: 'addToCart'): void;
}>();

</script>

<template>
    <slot name="wrapper">
        <UiButton
            class="w-full"
            @click="addToCart"
        >
            {{ $t('product.addToCart') }}
            <slot name="is-in-cart-icon">
                <div v-if="isInCart" class="flex ml-2 items-center">
                    <Icon name="mdi:cart-outline" class="size-4 mr-1" />
                    {{ count }}
                </div>
            </slot>
        </UiButton>
    </slot>
</template>
