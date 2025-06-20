<script setup lang="ts">
import ProductAddToCartInner from '~/components/product/ProductAddToCartInner.vue';
import { useToast } from '~/components/ui/toast';

const { product } = useProduct();
const { t, te } = useI18n();
const { addToCart } = useAddToCart(product);
const { getErrorsCodes } = useCartNotification();
const { resolveCartError } = useCartErrorParamsResolver();
const { toast } = useToast();

const addProductToCart = async () => {
    await addToCart();
    const errors = getErrorsCodes();

    if (!errors.length){
        toast({
            title: `${product.value.translated.name} added to cart`,
        });
        return;
    }

    for (const error of errors) {
        const { messageKey, params } = resolveCartError(error);
        const key = `error.${messageKey}`;

        const translatedMessage = te(key)
            ? t(key, params ?? {})
            : t('error.addToCartErrorDefault');

        toast({
            title: t('error.generalHeadline'),
            description: t(translatedMessage),
            variant: 'destructive',
        });
    }
};
</script>

<template>
    <ProductAddToCartInner @add-to-cart="addProductToCart" />
</template>
