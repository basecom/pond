<script setup lang="ts">
import ProductAddToCartInner from '~/components/product/ProductAddToCartInner.vue';
import { useToast } from '~/components/ui/toast';

const { product } = useProduct();
const { t } = useI18n();
const { addToCart } = useAddToCart(product);
const { toast } = useToast();

const isLoading = ref(false);

const addProductToCart = async () => {
    isLoading.value = true;

    try {
        await addToCart();
        toast({
            title: t('product.productAddedToCart', {product: product.value.translated.name}),
        });
    } catch {
        toast({
            title: t('error.generalHeadline'),
            description: t('error.addToCartErrorDefault'),
            variant: 'destructive',
        });
        return;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <ProductAddToCartInner :is-loading="isLoading" @add-to-cart="addProductToCart" />
</template>
