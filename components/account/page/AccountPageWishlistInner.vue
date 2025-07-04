<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      products?: Schemas['Product'];
      isLoading?: boolean;
    }>(),
    {
        products: undefined,
        isLoading: false,
    },
);
</script>

<template>
    <div class="gap-5 grid">
        <h1>
            {{ $t('wishlist.headline') }}
        </h1>

        <div
            v-if="isLoading"
            class="grid grid-cols-2 md:grid-cols-3 gap-2.5"
        >
            <div v-for="n in 12" :key="n">
                <UiSkeleton
                    class="w-full h-15"
                />
            </div>
        </div>
        <div
            v-else-if="products && products.length > 0"
            class="grid grid-cols-2 md:grid-cols-3 gap-2.5"
        />
        <!-- No products -->
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
