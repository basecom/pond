<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { LineItemOption } from '~/types/framework/LineItem';

const props = withDefaults(
    defineProps<{
        cartItem: Schemas['LineItem'];
        itemOptions?: LineItemOption[];
        deliveryInformation?: Schemas['CartDeliveryPosition']
        isRemovable?: boolean;
        isStackable?: boolean;
        itemQuantity?: number;
        itemTotalPrice?: number;
        itemRegularPrice?: number;
    }>(),
    {
        itemOptions: undefined,
        deliveryInformation: undefined,
        isRemovable: false,
        isStackable: false,
        itemQuantity: undefined,
        itemTotalPrice: undefined,
        itemRegularPrice: undefined,
    },
);

defineEmits<{
    removeItem: [];
    changeQuantity: [quantity: number];
}>();

const { getStyle } = usePondStyle();
const { getFormattedPrice } = usePrice();
const { formatLocaleDate } = usePondDate();

// we need the cast it
// the type definition says wrongly that cover has a media object in it, but it's not the case
const cover = computed(() => props.cartItem?.cover as unknown as Schemas['Media']|undefined);

const earliest = computed(() => formatLocaleDate(props.deliveryInformation?.deliveryDate?.earliest ?? ''));
const latest = computed(() => formatLocaleDate(props.deliveryInformation?.deliveryDate?.latest ?? ''));
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
                :show-wishlist-icon="true"
                :product-id="cartItem.id"
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
                    @click="$emit('removeItem')"
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

                <span v-if="deliveryInformation?.deliveryDate">
                    {{ $t('checkout.lineItemDeliveryDate', { earliest, latest }) }}
                </span>
            </div>
        </div>
    </div>

    <CheckoutLineItemQuantity
        :cart-item="cartItem"
        :item-quantity="itemQuantity"
        :is-stackable="isStackable"
        @change-quantity="quantity => $emit('changeQuantity', quantity)"
    />

    <div class="mt-4 text-right">
        <div class="font-bold">
            {{ getFormattedPrice(itemTotalPrice) }}
        </div>

        <div v-if="itemQuantity > 1" class="text-sm">
            {{ getFormattedPrice(itemRegularPrice) }} / {{ $t('checkout.lineItemUnitPriceDescriptor') }}
        </div>
    </div>
</template>
