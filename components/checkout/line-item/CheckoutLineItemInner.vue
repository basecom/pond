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
        isPromotion?: boolean;
        itemQuantity?: number;
        itemTotalPrice?: number;
        itemRegularPrice?: number;
    }>(),
    {
        itemOptions: undefined,
        deliveryInformation: undefined,
        isRemovable: false,
        isStackable: false,
        isPromotion: false,
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
    <div :class="getStyle('cart.lineItem.outer')">
        <NuxtLinkLocale>
            <ProductCover
                v-if="!isPromotion"
                :cover="cover"
                :label="cartItem.label"
                :product-classes="getStyle('cart.lineItem.cover.product')"
                :fallback-classes="getStyle('cart.lineItem.cover.fallback')"
                :video-classes="getStyle('cart.lineItem.cover.video')"
                :show-wishlist-icon="true"
                :product-id="cartItem.id"
            />

            <div v-else :class="[getStyle('cart.lineItem.cover.product'), 'flex items-center justify-center']">
                <Icon name="mdi:percent" class="size-8" />
            </div>
        </NuxtLinkLocale>

        <div>
            <div :class="getStyle('cart.lineItem.information.label.outer')">
                <h5 :class="getStyle('cart.lineItem.information.label.inner')">
                    {{ cartItem.label }}
                </h5>

                <UiButton
                    v-if="isRemovable"
                    variant="link"
                    :class="getStyle('cart.lineItem.information.remove')"
                    @click="$emit('removeItem')"
                >
                    <Icon name="mdi:close" :class="getStyle('ui.sheet.title.icon')" />
                </UiButton>
            </div>

            <div v-if="!isPromotion" :class="getStyle('cart.lineItem.information.description')">
                <p>
                    {{ cartItem.payload?.productNumber }}
                </p>

                <p v-if="itemOptions">
                    <span
                        v-for="option in itemOptions"
                        :key="option.group"
                        :class="getStyle('cart.lineItem.information.options')"
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
        v-if="!isPromotion"
        :cart-item="cartItem"
        :item-quantity="itemQuantity"
        :is-stackable="isStackable"
        @change-quantity="quantity => $emit('changeQuantity', quantity)"
    />

    <div :class="getStyle('cart.lineItem.price.outer')">
        <div :class="getStyle('cart.lineItem.price.total')">
            {{ getFormattedPrice(itemTotalPrice ?? cartItem.price?.totalPrice ?? 0) }}
        </div>
        <div
            v-if="(itemQuantity ?? 0) > 1 && itemRegularPrice !== undefined"
            :class="getStyle('cart.lineItem.price.regular')"
        >
            {{ getFormattedPrice(itemRegularPrice) }} / {{ $t('checkout.lineItemUnitPriceDescriptor') }}
        </div>
    </div>
</template>
