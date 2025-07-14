<script setup lang="ts">
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
</script>

<template>
    <slot name="container">
        <div class="w-20 text-center">
            <NuxtLinkLocale :to="productUrl">
                <template v-if="cartItemImage">
                    <slot name="image">
                        <img :src="cartItemImage" :alt="altText" class="h-20 border object-contain p-1">
                    </slot>
                </template>
                <template v-else-if="cartItemFallbackCover">
                    <slot name="fallback-image">
                        <img :src="cartItemFallbackCover" :alt="altText" class="h-20 border object-contain p-1">
                    </slot>
                </template>
                <template v-else>
                    <slot name="icon">
                        <div class="flex size-20 items-center justify-center border text-center">
                            <Icon :name="fallback" class="size-8" />
                        </div>
                    </slot>
                </template>
            </NuxtLinkLocale>
        </div>
    </slot>
</template>
