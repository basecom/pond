<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition'],
    }>(),
    {
        cartItem: undefined,
        cartDeliveryPosition: undefined,
    },
);
const {cartItem} = toRefs(props);
const {
    itemOptions,
} = useCartItem(cartItem);
const {getFormattedPrice} = usePrice();
const {
    itemTotalPrice,
    itemRegularPrice,
} = useCartItem(cartItem);
const configStore = useConfigStore();
const showDeliveryTime = configStore.get('core.cart.showDeliveryTime') as boolean;

const emits = defineEmits<{
  isLoading: [boolean]
}>();
</script>

<template>
    <slot name="wrapper">
        <div class="order-1 mb-4 flex w-5/6 flex-col">
            <div class="mb-2 w-auto">
                <slot name="cart-image">
                    <CartItemElementImage :cart-item-image="cartItem.cover?.url" fallback="mdi:image" />
                </slot>
            </div>
            <slot name="labelWrapper">
                <div class="font-bold">
                    <NuxtLinkLocale to="/">
                        <slot name="label">
                            {{ cartItem.label }}
                        </slot>
                    </NuxtLinkLocale>
                </div>
            </slot>
            <slot name="optionsWrapper">
                <div class="my-2 text-xs">
                    <slot name="options">
                        <CartItemElementOptions :cart-item-options="itemOptions" />
                    </slot>
                </div>
            </slot>
            <slot name="productNumberWrapper">
                <div class="mb-2 text-xs">
                    <slot name="productNumber">
                        {{ $t('checkout.cartItemInfoId') }}: {{ cartItem.payload.productNumber }}
                    </slot>
                </div>
            </slot>
            <slot name="deliveryPositionWrapper">
                <div v-if="showDeliveryTime" class="text-xs">
                    <slot name="deliveryPosition">
                        <CartItemElementDeliveryPosition :cart-item-delivery-position="cartDeliveryPosition" />
                    </slot>
                </div>
            </slot>
            <slot name="wishlistWrapper">
                <div class="mt-2 text-xs">
                    <slot name="wishlist">
                        <CartItemElementAddToWishlist :referenced-id="cartItem.referencedId" />
                    </slot>
                </div>
            </slot>
        </div>
    </slot>
    <slot name="quantityWrapper">
        <div class="order-3 mb-4 flex w-full items-center justify-between">
            <slot name="quantity">
                <CartItemElementQuantity
                    :cart-item="cartItem"
                    @is-loading="(isLoadingEmit: boolean) => {emits('isLoading', isLoadingEmit)}"
                />
            </slot>
        </div>
    </slot>
    <slot name="unitPriceWrapper">
        <div class="order-5 flex w-full justify-end text-xs">
            <slot name="unitPrice">
                <CartItemElementPriceUnit :cart-item-unit-price="getFormattedPrice(itemRegularPrice)" />
            </slot>
        </div>
    </slot>
    <slot name="totalPriceWrapper">
        <div class="order-4 flex w-full justify-end">
            <slot name="totalPrice">
                <CartItemElementPriceTotal :cart-item-total-price="getFormattedPrice(itemTotalPrice)" />
            </slot>
        </div>
    </slot>
</template>
