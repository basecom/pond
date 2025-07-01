<script setup lang="ts">
import type { BoxLayout, DisplayMode } from '@shopware/composables';
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
        product: Schemas['Product'];
        layoutType?: BoxLayout;
        displayMode?: DisplayMode;
    }>(),
    {
        layoutType: 'standard',
        displayMode: 'standard',
    },
);

useProduct(props.product);

const configStore = useConfigStore();
const allowBuyInListing = configStore.get('core.listing.allowBuyInListing') as boolean;
const autoPlayVideoInListing = configStore.get('core.listing.autoplayVideoInListing') as boolean;
</script>

<template>
    <ProductCardInner
        :layout-type="layoutType"
        :display-mode="displayMode"
        :allow-buy-in-listing="!!allowBuyInListing"
        :auto-play-video-in-listing="!!autoPlayVideoInListing"
    />
</template>
