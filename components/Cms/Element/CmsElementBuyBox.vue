<script setup lang="ts">
import type { CmsElementBuyBox } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementBuyBox;
}>();

const { product } = useProduct(props.element.data.product);
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');
</script>

<template>
    <div class="relative flex flex-wrap items-end justify-between gap-6">
        <ProductVariantSelection :product="product" />

        <ProductPrice :product="product" />

        <span class="text-gray">
            {{ product.productNumber }}
        </span>

        <ProductAvailability :product="product" />

        <ProductAddToCart
            :product="product"
            :label="true"
        />

        <div
            v-if="wishlistEnabled"
            class="content-center rounded-md border border-gray-medium bg-white"
        >
            <ClientOnly>
                <ProductAddToWishlist :product="product" />

                <template #fallback>
                    <div class="size-[42px] animate-pulse rounded bg-gray-medium" />
                </template>
            </ClientOnly>
        </div>
    </div>
</template>
