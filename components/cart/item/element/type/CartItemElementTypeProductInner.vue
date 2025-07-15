<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import {getMainImageUrl} from '@shopware-pwa/helpers-next';

const props = withDefaults(
    defineProps<{
      cartItem: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition'];
      itemTotalPrice?: number;
      itemRegularPrice?: number;
      itemOptions?: Schemas['LineItem']['payload']['options'];
      quantity?: number;
      itemQuantity?: number;
      isInWishlist?: boolean;
      isLoading?: {
        wishlist: boolean,
        container: boolean
      };
      isLoggedIn?: boolean;
      productUrl?: string;
    }>(),
    {
        cartDeliveryPosition: undefined,
        itemTotalPrice: 0,
        itemRegularPrice: 0,
        itemOptions: undefined,
        quantity: 1,
        itemQuantity: 1,
        isInWishlist: false,
        isLoggedIn: false,
        isLoading: () => ({
            wishlist: false,
            container: false,
        }),
        productUrl: undefined,
    },
);
const {cartItem, quantity} = toRefs(props);

defineEmits<{
  'change-cart-item-quantity': [number],
  'remove-product-from-wishlist': [],
  'add-product-to-wishlist': [],
}>();

const configStore = useConfigStore();

const showDeliveryTime = configStore.get('core.cart.showDeliveryTime') as boolean;
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled') as boolean;
const cartItemFallbackCover = configStore.get('BasecomPondCompanionPlugin.config.productFallBackCover') as string;
</script>

<template>
    <slot name="product-content">
        <slot name="wrapper">
            <div class="order-1 mb-4 flex w-5/6 flex-col text-left">
                <div class="mb-2 w-auto">
                    <slot name="cart-image">
                        <CartItemElementImage
                            :cart-item-image="getMainImageUrl(cartItem)"
                            fallback="mdi:image"
                            :product-url="productUrl"
                            :cart-item-fallback-cover="cartItemFallbackCover"
                        />
                    </slot>
                </div>
                <slot name="label-wrapper">
                    <div class="font-bold">
                        <NuxtLinkLocale :to="productUrl">
                            <slot name="label">
                                {{ cartItem?.label }}
                            </slot>
                        </NuxtLinkLocale>
                    </div>
                </slot>
                <slot name="options-wrapper">
                    <div class="my-2 text-xs">
                        <slot name="options">
                            <CartItemElementOptions :cart-item-options="itemOptions" />
                        </slot>
                    </div>
                </slot>
                <slot name="product-number-wrapper">
                    <div class="mb-2 text-xs">
                        <slot name="product-number">
                            {{ $t('checkout.cartItemInfoId') }}: {{ cartItem.payload.productNumber }}
                        </slot>
                    </div>
                </slot>
                <slot name="delivery-position-wrapper">
                    <div v-if="showDeliveryTime" class="text-xs">
                        <slot name="deliveryPosition">
                            <CartItemElementDeliveryPosition :cart-item-delivery-position="cartDeliveryPosition" />
                        </slot>
                    </div>
                </slot>
                <slot name="wishlist-wrapper">
                    <div v-if="wishlistEnabled && isLoggedIn" class="mt-2 text-xs">
                        <slot name="wishlist">
                            <CartItemElementAddToWishlist
                                :is-in-wishlist="isInWishlist"
                                :is-loading="isLoading.wishlist"
                                @remove-product-from-wishlist="$emit('remove-product-from-wishlist')"
                                @add-product-to-wishlist="$emit('add-product-to-wishlist')"
                            />
                        </slot>
                    </div>
                </slot>
            </div>
            <slot name="additional-wrapper" />
        </slot>
        <slot name="quantity-wrapper">
            <div class="order-3 mb-4 flex w-full items-center justify-between">
                <slot name="quantity">
                    <CartItemElementQuantity
                        :cart-item="cartItem"
                        :quantity="quantity"
                        :item-quantity="itemQuantity"
                        @change-cart-item-quantity="(quantityInput: number) => $emit('change-cart-item-quantity', quantityInput)"
                    />
                </slot>
            </div>
        </slot>
        <slot name="unit-price-wrapper">
            <div v-if="itemQuantity > 1" class="order-5 flex w-full justify-end text-xs">
                <slot name="unitPrice">
                    <CartItemElementPriceUnit :cart-item-unit-price="itemRegularPrice" />
                </slot>
            </div>
        </slot>
        <slot name="total-price-wrapper">
            <div class="order-4 flex w-full justify-end">
                <slot name="total-price">
                    <CartItemElementPriceTotal :cart-item-total-price="itemTotalPrice" />
                </slot>
            </div>
        </slot>
    </slot>
</template>
