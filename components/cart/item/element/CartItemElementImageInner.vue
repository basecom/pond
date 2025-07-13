<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemImage?: string;
      cartItemFallbackCover?: string;
      fallback?: string;
      productUrl?: string;
    }>(),
    {
        cartItemImage: undefined,
        cartItemFallbackCover: undefined,
        fallback: 'mdi:image',
        productUrl: undefined,
    },
);
</script>

<template>
    <slot name="container">
        <div>
            <template v-if="cartItemImage">
                <div class="w-20 text-center">
                    <slot name="link">
                        <NuxtLinkLocale :to="productUrl">
                            <slot name="cart-image">
                                <img :src="cartItemImage" alt="image" class="h-20 border object-contain p-1">
                            </slot>
                        </NuxtLinkLocale>
                    </slot>
                </div>
            </template>
            <template v-else-if="cartItemFallbackCover">
                <slot name="fallback-container-cover">
                    <NuxtLinkLocale :to="productUrl">
                        <slot name="cart-image">
                            <img :src="cartItemFallbackCover" alt="image" class="h-20 border object-contain p-1">
                        </slot>
                    </NuxtLinkLocale>
                </slot>
            </template>
            <template v-else>
                <slot name="fallback-container-icon">
                    <div class="flex size-20 items-center justify-center border text-center">
                        <slot name="fallback-link">
                            <NuxtLinkLocale :to="productUrl">
                                <slot name="fallback-icon">
                                    <Icon :name="fallback" class="size-8" />
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </div>
                </slot>
            </template>
        </div>
    </slot>

</template>
