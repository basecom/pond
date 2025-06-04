<script setup lang="ts">
import type {Schemas} from "#shopware";
import type {BoxLayout, DisplayMode} from "@shopware/composables";
import {buildUrlPrefix, getProductName, getProductRoute, getSmallestThumbnailUrl} from "@shopware/helpers";
import {useUrlResolver} from "#imports";
import {RouterLink} from "vue-router";
import {computed, toRefs} from "vue";

const props = withDefaults(
    defineProps<{
        product: Schemas["Product"];
        layoutType?: BoxLayout;
        isProductListing?: boolean;
        displayMode?: DisplayMode;
        allowBuyInListing?: boolean;
        autoPlayVideoInListing?: boolean;
    }>(),
    {
        layoutType: "standard",
        displayMode: "standard",
        isProductListing: false,
        allowBuyInListing: false,
        autoPlayVideoInListing: false,
    },
);

const emit = defineEmits<{
    (event: 'addToCart'): void;
}>();

const { product } = toRefs(props);
const addToCart = () => {
    emit('addToCart');
}

const { getUrlPrefix } = useUrlResolver();

const mediaType = product.value?.cover?.media?.mimeType?.split('/')[0];
const showControls = ref(false);

const srcPath = computed(() => {
    console.log(product.value.cover);
    return getSmallestThumbnailUrl(
        product.value?.cover?.media,
    ) ?? product.value?.cover?.media?.url;
});
</script>

<template>
    <slot name="wrapper">
        <div
            class="sw-product-card group relative max-w-full bg-white border border-gray-200 rounded-lg transform transition duration-300 hover:scale-101"
            data-testid="product-box"
        >
            <slot name="product-image">
                <RouterLink
                    :to="buildUrlPrefix(getProductRoute(product), getUrlPrefix())"
                    :class="[
                    'relative group w-full inline-block overflow-hidden rounded-t-lg',
                    layoutType === 'image' ? 'h-80' : 'h-60',
                    mediaType === 'image' ? 'hover:opacity-75' : '',
                ]"
                >
                    <template v-if="mediaType === 'image'">
                        <slot name="product-cover-image">
                            <img
                                loading="lazy"
                                :src="srcPath"
                                :alt="getProductName({ product }) || ''"
                                class="absolute inset-0 w-full h-full rounded-t-lg"
                                :class="{
                                    'object-cover':
                                      displayMode === 'cover' ||
                                      (displayMode === 'standard' && layoutType === 'image'),
                                    'object-contain': displayMode === 'contain',
                                    'object-scale-down':
                                      displayMode === 'standard' && layoutType !== 'image',
                                }"
                                data-testid="product-box-img"
                            />
                        </slot>
                    </template>
                    <template v-else-if="mediaType === 'video'">
                        <slot name="product-cover-video">
                            <video
                                :src="srcPath"
                                class="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                                data-testid="product-box-video"
                                :autoplay="autoPlayVideoInListing"
                                loop
                                muted
                                playsinline
                                @mouseenter="showControls = true"
                                @mouseleave="showControls = false"
                                :controls="showControls"
                            ></video>
                        </slot>
                    </template>
                    <template v-else>
                        <slot name="fallback-cover">
                            <img
                                src="/fallback-product-cover.svg"
                                :alt="getProductName({ product }) || ''"
                                class="mx-auto my-auto p-8 h-full object-contain filter invert brightness-[0.6] contrast-[0.7]"
                            >
                        </slot>
                    </template>
                </RouterLink>
            </slot>

            <slot name="product-info">
                <div class="p-4 mt-auto">
                    <slot name="variant-characteristics">
                        <p class="text-xs text-gray-600 mt-4">Size: XS</p>
                    </slot>

                    <slot name="title">
                        <RouterLink
                            class="line-clamp-2 mt-4"
                            :to="buildUrlPrefix(getProductRoute(product), getUrlPrefix())"
                            data-testid="product-box-product-name-link"
                        >
                            <h2>
                                {{ getProductName({ product }) }}
                            </h2>
                        </RouterLink>
                    </slot>

                    <slot name="product-description">
                        <p class="text-sm text-gray-600 mt-6">{{ product.translated.description }}</p>
                    </slot>

                    <slot name="price">
                        <SwListingProductPrice
                            :product="product"
                            class="ml-auto"
                        />
                    </slot>

                    <slot name="product-action">
                        <template v-if="allowBuyInListing && product.availableStock > 0">
                            <UiButton
                                class="w-full"
                                @click="addToCart"
                                >
                                <!-- TODO: snippet -->
                                Add to Cart
                            </UiButton>
                        </template>

                        <template v-else>
                            <RouterLink
                                :to="buildUrlPrefix(getProductRoute(product), getUrlPrefix())"
                                data-testid="product-box-product-name-link"
                            >
                                <UiButton variant="secondary" class="w-full">Show Details</UiButton>
                            </RouterLink>
                        </template>
                    </slot>
                </div>
            </slot>
        </div>
    </slot>
</template>
