<script setup lang="ts">
withDefaults(
    defineProps<{
        wishlistItems?: array;
        isLoading?: boolean;
    }>(),
    {
        wishlistItems: [],
        isLoading: false,
    },
);
</script>

<template>
    <slot name="wrapper">
        <slot name="headline">
            <h1 class="mb-6 text-xl font-bold md:text-2xl">{{ $t('account.wishlist') }}</h1>
        </slot>

        <slot name="no-products-message">
            <p v-if="!isLoading && (!wishlistItems || wishlistItems.length == 0)">
                {{ $t('account.wishlistNoProducts') }}
            </p>
        </slot>

        <slot name="loading-indicator">
            <div v-if="isLoading" class="grid-cols mb-6 grid animate-pulse gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <LayoutSkeletonProductCard />
                <LayoutSkeletonProductCard />
                <LayoutSkeletonProductCard />
            </div>
        </slot>

        <slot name="products">
            <template v-if="!isLoading && wishlistItems.length > 0">
                <div class="grid-cols mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <template v-for="item in wishlistItems" :key="item.id">
                        <slot name="product-card" :item="item">
                            <!-- TODO: Dummy product card, replace with product listing box later -->
                            <div class="flex-column flex size-full flex-wrap rounded-lg border border-gray-200 px-4 py-3">
                                <h2 class="text-xs text-gray-300">
                                    {{ item.productNumber }}
                                </h2>
                                <img src="/fallback-product-cover.svg"  alt="fallback-image">
                                <h2 class="text-lg text-gray-900">
                                    {{ item.translated.name }}
                                </h2>
                                <div class="text-sm text-gray-700">{{ item.translated.description }}</div>
                                <div class="w-full text-right text-lg">{{ item.calculatedPrice.unitPrice }}</div>
                            </div>
                        </slot>
                    </template>
                </div>
            </template>
        </slot>
    </slot>
</template>
