<script setup lang="ts">
import ProductCardInner from '~/components/product/ProductCardInner.vue';
import type { Schemas } from '#shopware';
import type { BoxLayout, DisplayMode } from '@shopware/composables';
import { toRefs } from 'vue';
import { useToast } from '@/components/ui/toast/use-toast';

const props = withDefaults(
    defineProps<{
        product: Schemas['Product'];
        layoutType?: BoxLayout;
        isProductListing?: boolean;
        displayMode?: DisplayMode;
    }>(),
    {
        layoutType: 'standard',
        displayMode: 'standard',
        isProductListing: false,
    },
);

const { product } = toRefs(props);

const configStore = useConfigStore();
const allowBuyInListing = configStore.get('core.listing.allowBuyInListing') ?? false;
const autoPlayVideoInListing = configStore.get('core.listing.autoplayVideoInListing') ?? false;

const { t, te } = useI18n();
const { addToCart, isInCart, count } = useAddToCart(product);
const { getErrorsCodes } = useCartNotification();
const { resolveCartError } = useCartErrorParamsResolver();
const { toast } = useToast();

const addProductToCart = async () => {
    //await addToCart();
    await addToCart({ quantity: 999 });
    const errors = getErrorsCodes();

    if (!errors.length){
        toast({
            title: `${props.product?.translated.name} added to cart`,
        });
        return;
    }

    for (const error of errors) {
        const { messageKey, params } = resolveCartError(error);
        const key = `error.${messageKey}`;

        const translatedMessage = te(key)
            ? t(key, params)
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
    <ProductCardInner
        :product="product"
        :layout-type="layoutType"
        :is-product-listing="isProductListing"
        :display-mode="displayMode"
        :allow-buy-in-listing="allowBuyInListing"
        :auto-play-video-in-listing="autoPlayVideoInListing"
        @add-to-cart="addProductToCart"
    />
</template>
