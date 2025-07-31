<script setup lang="ts">
import type { BoxLayout, DisplayMode } from '@shopware/composables';
import { getProductName, getProductRoute } from '@shopware/helpers';

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
const { isListPrice } = useProductPrice(product);
const { getStyle } = usePondStyle();

const showReview = configStore.get('core.listing.showReview') as boolean;
</script>

<template>
    <slot name="wrapper">
        <div
            :class="getStyle('product.card.outer')"
        >
            <slot name="product-badges">
                <div :class="getStyle('product.card.badge.outer')">
                    <ProductBadges :is-new="product?.isNew" :is-topseller="product?.markAsTopseller" :is-sale="isListPrice" />
                </div>
            </slot>
            <slot name="product-image">
                <NuxtLinkLocale
                    :to="getProductRoute(product)"
                    :class="[getStyle('product.card.cover.outer.default'), {
                        [getStyle('product.card.cover.outer.layout')]: layoutType === 'image',
                    }]"
                    :aria-label="`navigate-to-${getProductName({ product })}`"
                >
                    <ProductCover
                        :is-video="product?.cover?.media?.mimeType.includes('video')"
                        :src-path="product?.cover?.media?.url"
                        :alt-text="product?.cover?.media?.translated?.alt"
                        :title="product?.cover?.media?.translated?.title"
                        :label="product.name"
                        :video-classes="[getStyle('product.card.cover.default'), {
                            [getStyle('product.card.cover.object.cover')]: displayMode === 'cover' ||
                                (displayMode === 'standard' && layoutType === 'image'),
                            [getStyle('product.card.cover.object.contain')]: displayMode === 'contain',
                            [getStyle('product.card.cover.object.scale')]: displayMode === 'standard' && layoutType !== 'image',
                        }]"
                        :product-classes="[getStyle('product.card.cover.default'), {
                            [getStyle('product.card.cover.object.cover')]: displayMode === 'cover' ||
                                (displayMode === 'standard' && layoutType === 'image'),
                            [getStyle('product.card.cover.object.contain')]: displayMode === 'contain',
                            [getStyle('product.card.cover.object.scale')]: displayMode === 'standard' && layoutType !== 'image',
                        }]"
                        :fallback-classes="getStyle('product.card.cover.fallback')"
                        :auto-play="autoPlayVideoInListing"
                    />
                </NuxtLinkLocale>
            </slot>

            <slot name="product-info">
                <div :class="getStyle('product.card.information.outer')">
                    <slot name="variant-characteristics">
                        <div :class="getStyle('product.card.information.variant.outer')">
                            <slot name="product-rating">
                                <!-- Wrapper div, to ensure that elements align, when no rating is present -->
                                <div v-if="showReview" :class="getStyle('product.card.reviews.outer')">
                                    <ProductRating v-if="product.ratingAverage" :rating-average="Math.round(product.ratingAverage)" />
                                </div>
                            </slot>

                            <slot name="title">
                                <NuxtLinkLocale
                                    :class="getStyle('product.card.information.title.outer')"
                                    :to="getProductRoute(product)"
                                >
                                    <h2 :class="getStyle('product.card.information.title.inner')">
                                        {{ getProductName( product ) }}
                                    </h2>
                                </NuxtLinkLocale>
                            </slot>

                            <slot name="variant-characteristics">
                                <div v-if="product?.options" class="mt-4 text-xs text-gray-600">
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
                                    <NuxtLinkLocale
                                        :to="getProductRoute(product)"
                                        :aria-label="`navigate-to-${getProductName({ product })}`"
                                    >
                                        <UiButton variant="secondary" :class="getStyle('product.card.information.detailsButton')">
                                            {{ $t('product.details') }}
                                        </UiButton>
                                    </NuxtLinkLocale>
                                </template>
                            </slot>
                        </div>
                    </slot>
                </div>
            </slot>
        </div>
    </slot>
</template>
