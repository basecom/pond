<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/SwListingProductPrice.vue
// Changed: Use snippets instead of translations & pond style config
import { useProductPrice } from '@shopware/composables';
import { toRefs } from 'vue';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
  product: Schemas['Product'];
}>();

const { product } = toRefs(props);

const {
    price,
    unitPrice,
    displayFromVariants,
    displayFrom,
    isListPrice,
    regulationPrice,
} = useProductPrice(product);
const { getStyle } = usePondStyle();
</script>

<template>
    <div :id="product.id">
        <SwSharedPrice
            v-if="isListPrice"
            :class="getStyle('listing.price.listPrice.outer')"
            :value="price?.listPrice?.price"
        />
        <template v-if="!isListPrice">
            <div :class="getStyle('listing.price.listPrice.placeholder')"><!-- placeholder --></div>
        </template>
        <SwSharedPrice
            v-if="displayFromVariants"
            :class="getStyle('listing.price.variantPrice.outer')"
            :value="displayFromVariants"
        >
            <template #beforePrice>
                <span v-if="displayFromVariants" :class="getStyle('listing.price.variantPrice.inner')">
                    {{ $t('listing.price.variantsFrom') }}
                </span>
            </template>
        </SwSharedPrice>
        <SwSharedPrice
            class="text-gray-900 basis-2/6"
            :class="[getStyle('listing.price.unitPrice.outer.default'), {
                [getStyle('listing.price.unitPrice.outer.listPrice')]: isListPrice,
                [getStyle('listing.price.unitPrice.outer.position')]:
                    regulationPrice || !regulationPrice || !displayFromVariants,
            }]"
            :value="unitPrice"
        >
            <template #beforePrice>
                <span v-if="displayFrom || displayFromVariants" :class="getStyle('listing.price.unitPrice.inner')">
                    {{ $t('listing.price.from') }}
                </span>
            </template>
        </SwSharedPrice>
        <template v-if="regulationPrice">
            <div :class="getStyle('listing.price.regulationPrice.outer')">
                {{ $t('listing.price.previously') }}
                <SwSharedPrice :value="regulationPrice" />
            </div>
        </template>
        <template v-if="!regulationPrice">
            <div :class="getStyle('listing.price.regulationPrice.inner')"><!-- placeholder --></div>
        </template>
    </div>
</template>
