<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      products?: Schemas['Product'][];
      currentPage: number;
      totalPages: number;
      isLoading?: boolean;
    }>(),
    {
        products: undefined,
        isLoading: false,
    },
);

defineEmits<{
  'change-page': [page: number];
}>();
</script>

<template>
    <div class="gap-5 grid">
        <slot name="headline">
            <h1>
                {{ $t('wishlist.headline') }}
            </h1>
        </slot>

        <div
            v-if="isLoading"
            class="grid grid-cols-2 md:grid-cols-3 gap-2.5"
        >
            <slot name="loading">
                <div v-for="n in 12" :key="n">
                    <UiSkeleton
                        class="w-full h-50"
                    />
                </div>
            </slot>
        </div>

        <template
            v-else-if="products && products.length > 0"
        >
            <slot name="wishlist-product">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2.5">

                    <ProductCard v-for="product in products" :key="product.id" :product="product" />
                </div>
            </slot>

            <slot name="wishlist-pagination">
                <div class="flex w-full justify-center mt-5 gap-2.5">
                    <SwPagination
                        :total="totalPages"
                        :current="currentPage"
                        @change-page="(page: number) => $emit('change-page', page)"
                    />
                </div>
            </slot>
        </template>

        <template v-else>
            <slot name="wishlist-no-products">
                <UiAlert class="flex gap-4 items-center">
                    <Icon name="mdi:alert-circle-outline" class="size-4 shrink-0" />
                    <UiAlertTitle class="mb-0"> {{ $t('wishlist.noProducts') }} </UiAlertTitle>
                </UiAlert>
            </slot>
        </template>
    </div>
</template>
