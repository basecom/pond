<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { LineItemOption } from '~/types/framework/LineItem';

const props = withDefaults(
    defineProps<{
        cartItem: Schemas['LineItem'];
        itemOptions?: LineItemOption[];
        isRemovable?: boolean;
        isStackable?: boolean;
        itemQuantity?: number;
        itemTotalPrice?: number;
    }>(),
    {
        itemOptions: undefined,
        isRemovable: false,
        isStackable: false,
        itemQuantity: undefined,
        itemTotalPrice: undefined,
    },
);

defineEmits<{
    'remove-item': [];
    'change-quantity': [quantity: number];
}>();

const { getStyle } = usePondStyle();
const { getFormattedPrice } = usePrice();

// we need the cast it
// the type definition says wrongly that cover has a media object in it, but it's not the case
const cover = computed(() => props.cartItem?.cover as unknown as Schemas['Media']|undefined);
</script>

<template>
    <div class="grid grid-cols-[max-content_auto] gap-2">
        <NuxtLinkLocale>
            <ProductCover
                :is-video="cover?.mimeType?.includes('video')"
                :src-path="cover?.url"
                :alt-text="cover?.translated?.alt"
                :title="cover?.translated?.title"
                :label="cartItem.label"
                :product-classes="getStyle('cart.lineItem.cover.product')"
                :fallback-classes="getStyle('cart.lineItem.cover.fallback')"
                :video-classes="getStyle('cart.lineItem.cover.video')"
            />
        </NuxtLinkLocale>

        <div>
            <div class="flex justify-between">
                <h5 class="line-clamp-2">
                    {{ cartItem.label }}
                </h5>

                <UiButton
                    v-if="isRemovable"
                    variant="link"
                    class="!p-0 h-min w-min"
                    @click="$emit('remove-item')"
                >
                    <Icon name="mdi:close" :class="getStyle('ui.sheet.title.icon')" />
                </UiButton>
            </div>

            <div class="grid gap-px mt-px text-sm text-gray-600">
                <p>
                    {{ cartItem.payload.productNumber }}
                </p>

                <p v-if="itemOptions">
                    <span
                        v-for="option in itemOptions"
                        :key="option.group"
                        class="grid gap-px"
                    >
                        {{ option.group }}: {{ option.option }}
                    </span>
                </p>
            </div>
        </div>
    </div>

    <CheckoutLineItemQuantity
        :cart-item="cartItem"
        :item-quantity="itemQuantity"
        :is-stackable="isStackable"
        @change-quantity="quantity => $emit('change-quantity', quantity)"
    />

    <div class="mt-4 text-right font-bold">
        {{ getFormattedPrice(itemTotalPrice) }}
    </div>
</template>
