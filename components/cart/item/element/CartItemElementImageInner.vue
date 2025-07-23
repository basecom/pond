<script setup lang="ts">
import { NuxtLinkLocale } from '#components';
withDefaults(
    defineProps<{
      cartItemImage?: string;
      cartItemFallbackCover?: string;
      fallback?: string;
      productUrl?: string;
      altText?: string;
    }>(),
    {
        cartItemImage: undefined,
        cartItemFallbackCover: undefined,
        fallback: 'mdi:image',
        productUrl: undefined,
        altText: 'Product image',
    },
);
const { getStyle } = usePondStyle();
</script>

<template>
    <slot name="container">
        <div :class="getStyle('cart.imageContainer')">
            <component :is="productUrl ? NuxtLinkLocale : 'div'" :to="productUrl">
                <template v-if="cartItemImage">
                    <slot name="image">
                        <img :src="cartItemImage" :alt="altText" :class="getStyle('cart.image')">
                    </slot>
                </template>
                <template v-else-if="cartItemFallbackCover">
                    <slot name="fallback-image">
                        <img :src="cartItemFallbackCover" :alt="altText" :class="getStyle('cart.fallbackImage')">
                    </slot>
                </template>
                <template v-else>
                    <slot name="icon">
                        <div :class="getStyle('cart.iconContainer')">
                            <Icon :name="fallback" :class="getStyle('cart.icon')" />
                        </div>
                    </slot>
                </template>
            </component>
        </div>
    </slot>
</template>
