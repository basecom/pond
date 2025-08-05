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

const { getStyle } = usePondStyle();
</script>

<template>
    <div :class="getStyle('account.wishlist.outer')">
        <slot name="headline">
            <h1>
                {{ $t('wishlist.headline') }}
            </h1>
        </slot>

        <div
            v-if="isLoading"
            :class="getStyle('account.wishlist.loading.outer')"
        >
            <slot name="loading">
                <div v-for="n in 12" :key="n">
                    <UiSkeleton
                        :class="getStyle('account.wishlist.loading.skeleton')"
                    />
                </div>
            </slot>
        </div>

        <template
            v-else-if="products && products.length > 0"
        >
            <slot name="wishlist-product">
                <div :class="getStyle('account.wishlist.product')">
                    <ProductCard v-for="product in products" :key="product.id" :product="product" />
                </div>
            </slot>

            <slot name="wishlist-pagination">
                <div :class="getStyle('account.wishlist.pagination')">
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
                <UiAlert :class="getStyle('account.wishlist.noProducts.outer')">
                    <Icon name="mdi:alert-circle-outline" :class="getStyle('account.wishlist.noProducts.icon')" />
                    <UiAlertTitle :class="getStyle('account.wishlist.noProducts.inner')"> {{ $t('wishlist.noProducts') }} </UiAlertTitle>
                </UiAlert>
            </slot>
        </template>
    </div>
</template>
