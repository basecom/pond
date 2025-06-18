<script setup lang="ts">
import type {Schemas} from '#shopware';
import type {BoxLayout, DisplayMode} from '@shopware/composables';
import {buildUrlPrefix, getProductName, getProductRoute, getSmallestThumbnailUrl} from '@shopware/helpers';
import {useUrlResolver} from '#imports';
import {RouterLink} from 'vue-router';
import {computed, toRefs} from 'vue';

const props = withDefaults(
    defineProps<{
        product: Schemas['Product'];
        layoutType?: BoxLayout;
        isProductListing?: boolean;
        displayMode?: DisplayMode;
        allowBuyInListing?: boolean;
        autoPlayVideoInListing?: boolean;
    }>(),
    {
        layoutType: 'standard',
        displayMode: 'standard',
        isProductListing: false,
        allowBuyInListing: false,
        autoPlayVideoInListing: false,
    },
);

console.log(props.layoutType);
const emit = defineEmits<{
    (event: 'addToCart'): void;
}>();

const { product } = toRefs(props);
const { messages } = useI18n();

const addToCart = () => {
    emit('addToCart');
};

const { getUrlPrefix } = useUrlResolver();

const mediaType = product.value?.cover?.media?.mimeType?.split('/')[0];
const showControls = ref(false);

const srcPath = computed(() => getSmallestThumbnailUrl(
    product.value?.cover?.media,
) ?? product.value?.cover?.media?.url);
</script>

<template>
    <slot name="wrapper">
        <div
            class="sw-product-card hover:scale-101 group relative flex max-w-full flex-col justify-between rounded-lg border border-gray-200 bg-white transition duration-300"
        >
            <slot name="product-image">
                <RouterLink
                    :to="buildUrlPrefix(getProductRoute(product), getUrlPrefix())"
                    :class="[
                        'group relative inline-block flex-none w-full overflow-hidden rounded-t-lg',
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
                                class="absolute inset-0 size-full rounded-t-lg"
                                :class="{
                                    'object-cover':
                                        displayMode === 'cover' ||
                                        (displayMode === 'standard' && layoutType === 'image'),
                                    'object-contain': displayMode === 'contain',
                                    'object-scale-down':
                                        displayMode === 'standard' && layoutType !== 'image',
                                }"
                            >
                        </slot>
                    </template>
                    <template v-else-if="mediaType === 'video'">
                        <slot name="product-cover-video">
                            <video
                                :src="srcPath"
                                class="absolute inset-0 size-full rounded-t-lg"
                                :class="{
                                    'object-cover':
                                        displayMode === 'cover' ||
                                        (displayMode === 'standard' && layoutType === 'image'),
                                    'object-contain': displayMode === 'contain',
                                    'object-scale-down':
                                        displayMode === 'standard' && layoutType !== 'image',
                                }"
                                :autoplay="autoPlayVideoInListing"
                                loop
                                muted
                                playsinline
                                :controls="showControls"
                                @mouseenter="showControls = true"
                                @mouseleave="showControls = false"
                            />
                        </slot>
                    </template>
                    <template v-else>
                        <slot name="fallback-cover">
                            <img
                                src="/fallback-product-cover.svg"
                                :alt="getProductName({ product }) || ''"
                                class="m-auto h-full object-contain p-8 brightness-[0.6] contrast-[0.7] invert"
                            >
                        </slot>
                    </template>
                </RouterLink>
            </slot>

            <slot name="product-info">
                <div class="p-4 h-full flex flex-col justify-between">
                    <div>
                        <slot name="variant-characteristics">
                            <div class="min-h-4 mt-4 text-xs text-gray-600">
                                <p
                                    v-for="option in product?.options"
                                    :key="option.id"
                                >
                                    {{ option.group.translated.name }}:
                                    <span class="font-bold">{{ option.translated.name }}</span>
                                </p>
                            </div>
                        </slot>

                        <slot name="title">
                            <RouterLink
                                class="mt-4 line-clamp-2"
                                :to="buildUrlPrefix(getProductRoute(product), getUrlPrefix())"
                            >
                                <h2>
                                    {{ getProductName({ product }) }}
                                </h2>
                            </RouterLink>
                        </slot>

                        <template v-if="layoutType === 'standard'">
                            <slot name="product-description">
                                <p class="mt-6 text-sm text-gray-600">{{ product.translated.description }}</p>
                            </slot>
                        </template>

                    </div>

                    <div>
                        <slot name="price">
                            <SwListingProductPrice
                                :product="product"
                                class="ml-auto"
                            />
                        </slot>

                        <slot name="product-action">
                            <template v-if="allowBuyInListing && product.availableStock > 0 && !product.childCount">
                                <UiButton
                                    class="w-full"
                                    @click="addToCart"
                                >
                                    {{ $t('product.addToCart') }}
                                </UiButton>
                            </template>

                            <template v-else>
                                <RouterLink
                                    :to="buildUrlPrefix(getProductRoute(product), getUrlPrefix())"
                                >
                                    <UiButton variant="secondary" class="w-full">
                                        {{ $t('product.details') }}
                                    </UiButton>
                                </RouterLink>
                            </template>
                        </slot>
                    </div>
                </div>
            </slot>
        </div>
    </slot>
</template>
