<script setup lang="ts">
import type { BoxLayout, DisplayMode } from '@shopware/composables';
import { buildUrlPrefix, getProductName, getProductRoute, getSmallestThumbnailUrl } from '@shopware/helpers';
import { useUrlResolver } from '#imports';
import { RouterLink } from 'vue-router';

withDefaults(
    defineProps<{
        layoutType?: BoxLayout;
        displayMode?: DisplayMode;
        allowBuyInListing?: boolean;
        autoPlayVideoInListing?: boolean;
    }>(),
    {
        layoutType: 'standard',
        displayMode: 'standard',
        allowBuyInListing: false,
        autoPlayVideoInListing: false,
    },
);

const configStore = useConfigStore();
const { product } = useProduct();
const { getUrlPrefix } = useUrlResolver();
const { getStyle } = usePondStyle();

const mediaType = product.value?.cover?.media?.mimeType?.split('/')[0];
const showControls = ref(false);
const productFallBackCover = configStore.get('BasecomPondCompanionPlugin.config.productFallBackCover') as string;
const showReview = configStore.get('core.listing.showReview') as boolean;

const srcPath = computed(() => getSmallestThumbnailUrl(
    product.value?.cover?.media,
) ?? product.value?.cover?.media?.url);
</script>

<template>
    <slot name="wrapper">
        <div
            :class="getStyle('product.card.outer')"
        >
            <slot name="product-image">
                <RouterLink
                    :to="buildUrlPrefix(getProductRoute(product), getUrlPrefix())"
                    :class="[getStyle('product.card.cover.outer.default'), {
                        [getStyle('product.card.cover.outer.layout')]: layoutType === 'image',
                        [getStyle('product.card.cover.outer.media')]: mediaType === 'image',
                    }]"
                    :aria-label="`navigate-to-${getProductName({ product })}`"
                >
                    <template v-if="mediaType === 'image'">
                        <slot name="product-cover-image">
                            <img
                                loading="lazy"
                                :src="srcPath"
                                :alt="getProductName({ product }) || $t('product.image')"
                                :title="$t('product.image')"
                                :class="[getStyle('product.card.cover.default'), {
                                    [getStyle('product.card.cover.object.cover')]: displayMode === 'cover' ||
                                        (displayMode === 'standard' && layoutType === 'image'),
                                    [getStyle('product.card.cover.object.contain')]: displayMode === 'contain',
                                    [getStyle('product.card.cover.object.scale')]: displayMode === 'standard' && layoutType !== 'image',
                                }]"
                            >
                        </slot>
                    </template>
                    <template v-else-if="mediaType === 'video'">
                        <slot name="product-cover-video">
                            <video
                                :src="srcPath"
                                :class="[getStyle('product.card.cover.default'), {
                                    [getStyle('product.card.cover.object.cover')]: displayMode === 'cover' ||
                                        (displayMode === 'standard' && layoutType === 'image'),
                                    [getStyle('product.card.cover.object.contain')]: displayMode === 'contain',
                                    [getStyle('product.card.cover.object.scale')]: displayMode === 'standard' && layoutType !== 'image',
                                }]"
                                :autoplay="autoPlayVideoInListing"
                                loop
                                muted
                                playsinline
                                :controls="showControls"
                                :aria-label="`product-video-${getProductName({ product })}`"
                                @mouseenter="showControls = true"
                                @mouseleave="showControls = false"
                            />
                        </slot>
                    </template>
                    <template v-else>
                        <slot name="fallback-cover">
                            <img
                                :src="productFallBackCover"
                                :alt="$t('product.fallback.alt', { product: getProductName({ product }) })"
                                :title="$t('product.fallback.title', { product: getProductName({ product }) })"
                                :class="getStyle('product.card.cover.fallback')"
                            >
                        </slot>
                    </template>
                </RouterLink>
            </slot>

            <slot name="product-info">
                <div :class="getStyle('product.card.information.outer')">
                    <div>
                        <slot name="variant-characteristics">
                            <div :class="getStyle('product.card.information.variant.outer')">
                                <slot name="product-rating">
                                    <!-- Wrapper div, to ensure that elements align, when no rating is present -->
                                    <div v-if="showReview" :class="getStyle('product.card.reviews.outer')">
                                        <ProductRating v-if="product.ratingAverage" :rating-average="Math.round(product.ratingAverage)" />
                                    </div>
                                </slot>

                                <slot name="title">
                                    <RouterLink
                                        :class="getStyle('product.card.information.title.outer')"
                                        :to="buildUrlPrefix(getProductRoute(product), getUrlPrefix())"
                                    >
                                        <h2 :class="getStyle('product.card.information.title.inner')">
                                            {{ getProductName({ product }) }}
                                        </h2>
                                    </RouterLink>
                                </slot>

                                <slot name="variant-characteristics">
                                    <div class="min-h-4 mt-4 text-xs text-gray-600">
                                        <span
                                            v-for="(option, index) in product?.options"
                                            :key="option.id"
                                        >
                                            {{ option.group.translated.name }}:
                                            <span class="font-bold">{{ option.translated.name }}</span><span v-if="index < (product?.options?.length ?? 0) - 1"> | </span>
                                        </span>
                                    </div>
                                </slot>

                                <template v-if="layoutType === 'standard'">
                                    <slot name="product-description">
                                        <p :class="getStyle('product.card.information.description')">{{ product.translated.description }}</p>
                                    </slot>
                                </template>
                            </div>

                            <div>
                                <slot name="price">
                                    <SwListingProductPrice
                                        :product="product"
                                        :class="getStyle('product.card.information.price')"
                                    />
                                </slot>

                                <slot name="product-action">
                                    <template v-if="allowBuyInListing && (product?.availableStock ?? 0) > 0 && !product.childCount">
                                        <ProductAddToCart />
                                    </template>

                                    <template v-else>
                                        <RouterLink
                                            :to="buildUrlPrefix(getProductRoute(product), getUrlPrefix())"
                                            :aria-label="`navigate-to-${getProductName({ product })}`"
                                        >
                                            <UiButton variant="secondary" :class="getStyle('product.card.information.detailsButton')">
                                                {{ $t('product.details') }}
                                            </UiButton>
                                        </RouterLink>
                                    </template>
                                </slot>
                            </div>
                        </slot></div>
                </div></slot>
        </div>
    </slot>
</template>
