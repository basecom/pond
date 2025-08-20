<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
        cover?: Schemas['Media'];
        productId?: string;
        label?: string;
        videoClasses?: string | (string | { [key: string]: boolean })[];
        productClasses?: string | (string | { [key: string]: boolean })[];
        fallbackClasses?: string | (string | { [key: string]: boolean })[];
        promotionClasses?: string | (string | { [key: string]: boolean })[];
        promotionIconClasses?: string | (string | { [key: string]: boolean })[];
        isPromotion?: boolean;
        autoPlay?: boolean;
        showWishlistIcon?: boolean;
    }>(),
    {
        cover: undefined,
        productId: undefined,
        label: undefined,
        videoClasses: undefined,
        productClasses: undefined,
        fallbackClasses: undefined,
        promotionClasses: undefined,
        promotionIconClasses: undefined,
        isPromotion: false,
        autoPlay: false,
        showWishlistIcon: false,
    },
);
</script>

<template>
    <ProductCoverInner
        :is-video="Boolean(cover?.mimeType?.startsWith('video/'))"
        :src-path="cover?.url"
        :alt-text="cover?.translated?.alt || label || ''"
        :title="cover?.translated?.title"
        :product-id="productId"
        :label="label"
        :video-classes="videoClasses"
        :product-classes="productClasses"
        :fallback-classes="fallbackClasses"
        :promotion-classes="promotionClasses"
        :promotion-icon-classes="promotionIconClasses"
        :is-promotion="isPromotion"
        :auto-play="autoPlay"
        :show-wishlist-icon="showWishlistIcon"
    />
</template>
