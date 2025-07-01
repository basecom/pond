<script setup lang="ts">
import ProductAddToCartInner from '~/components/product/ProductAddToCartInner.vue';
import { useToast } from '~/components/ui/toast';
import { ApiClientError } from '@shopware/api-client';

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
        isLoading.value = false;
    } catch(error) {
        if (error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${ error.details.errors[0]?.code}`),
                variant: 'destructive',
            });
            return;
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <ProductAddToCartInner :is-loading="isLoading" @add-to-cart="addProductToCart" />
</template>
