<script setup lang="ts">
import ProductCardInner from '~/components/product/ProductCardInner.vue';
import type { BoxLayout, DisplayMode } from '@shopware/composables';
import type { Schemas } from '@shopware/api-client/api-types';

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

useProduct(props.product);

const configStore = useConfigStore();
const allowBuyInListing = configStore.get('core.listing.allowBuyInListing');
const autoPlayVideoInListing = configStore.get('core.listing.autoplayVideoInListing');

</script>

<template>
    <ProductCardInner
        :layout-type="layoutType"
        :is-product-listing="isProductListing"
        :display-mode="displayMode"
        :allow-buy-in-listing="!!allowBuyInListing"
        :auto-play-video-in-listing="!!autoPlayVideoInListing"
    />
</template>
