<script setup lang="ts">
import ProductCardInner from "~/components/product/ProductCardInner.vue";
import type {Schemas} from "#shopware";
import type {BoxLayout, DisplayMode} from "@shopware/composables";
import {toRefs} from "vue";

const props = withDefaults(
    defineProps<{
        product: Schemas["Product"];
        layoutType?: BoxLayout;
        isProductListing?: boolean;
        displayMode?: DisplayMode;
    }>(),
    {
        layoutType: "standard",
        displayMode: "standard",
        isProductListing: false,
    },
);

const { product } = toRefs(props);

const configStore = useConfigStore();
const allowBuyInListing = configStore.get('core.listing.allowBuyInListing') ?? false;
const autoPlayVideoInListing = configStore.get('core.listing.autoplayVideoInListing') ?? false;

const addProductToCart = () => {
    //TODO:Add to cart
    console.log('added product to cart');
}
</script>

<template>
    <ProductCardInner
        @add-to-cart="addProductToCart"
        :product="product"
        :layout-type="layoutType"
        :is-product-listing="isProductListing"
        :display-mode="displayMode"
        :allow-buy-in-listing="allowBuyInListing"
        :auto-play-video-in-listing="autoPlayVideoInListing"
    />
</template>
