<script setup lang="ts">
withDefaults(
    defineProps<{
        isVideo?: boolean;
        isPromotion?: boolean;
        productId?: string;
        srcPath?: string;
        altText?: string;
        title?: string;
        label?: string;
        videoClasses?: string | (string | { [key: string]: boolean })[];
        productClasses?: string | (string | { [key: string]: boolean })[];
        fallbackClasses?: string;
        promotionClasses?: string;
        promotionIconClasses?: string;
        autoPlay?: boolean;
        showWishlistIcon?: boolean;
    }>(),
    {
        isVideo: false,
        isPromotion: false,
        productId: undefined,
        srcPath: undefined,
        altText: undefined,
        title: undefined,
        label: undefined,
        videoClasses: undefined,
        productClasses: undefined,
        fallbackClasses: undefined,
        promotionClasses: undefined,
        promotionIconClasses: undefined,
        autoPlay: false,
        showWishlistIcon: false,
    },
);

const configStore = useConfigStore();

const fallBackCover = configStore.get('BasecomPondCompanionPlugin.config.productFallBackCover') as string;
const showControls = ref(false);
</script>

<template>
    <div class="relative">
        <template v-if="isPromotion">
            <slot name="promotion-cover">
                <div :class="promotionClasses">
                    <Icon name="mdi:percent" :class="promotionIconClasses" aria-hidden="true" />
                </div>
            </slot>
        </template>

        <template v-if="isVideo && srcPath">
            <slot name="video-cover">
                <video
                    :src="srcPath"
                    :title="title"
                    :class="videoClasses"
                    :aria-label="label"
                    loop
                    muted
                    playsinline
                    :autoplay="autoPlay"
                    :controls="showControls"
                    @mouseenter="showControls = true"
                    @mouseleave="showControls = false"
                />
            </slot>
        </template>

        <template v-if="!isVideo && srcPath">
            <slot name="product-cover">
                <img
                    loading="lazy"
                    :src="srcPath"
                    :alt="altText"
                    :title="title"
                    :class="productClasses"
                >
            </slot>
        </template>

        <template v-if="!isPromotion && !srcPath">
            <slot name="fallback-cover">
                <img
                    v-if="fallBackCover"
                    :src="fallBackCover"
                    :alt="$t('product.fallback.alt', { product: label })"
                    :title="$t('product.fallback.title', { product: label })"
                    :class="fallbackClasses"
                >
                <img
                    v-else
                    src="/fallback-product-cover.svg"
                    :alt="$t('product.fallback.alt', { product: label })"
                    :title="$t('product.fallback.title', { product: label })"
                    :class="fallbackClasses"
                >
            </slot>
        </template>

        <ProductWishlist v-if="showWishlistIcon && productId" :product-id="productId" />
    </div>
</template>
