<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import {Loader2} from 'lucide-vue-next';

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition'];
      itemTotalPrice?: number;
      itemRegularPrice?: number;
      itemOptions?: Schemas['LineItem']['payload']['options'];
      quantity?: number;
      itemQuantity?: number;
      productUrl?: string
      isInWishlist?: boolean;
      isLoading?: {
        wishlist: boolean,
        container: boolean
      };
    }>(),
    {
        cartItem: undefined,
        cartDeliveryPosition: undefined,
        itemOptions: undefined,
        itemTotalPrice: 0,
        itemRegularPrice: 0,
        quantity: 0,
        itemQuantity: 0,
        productUrl: undefined,
        isInWishlist: false,
        isLoading: () => ({
            wishlist: false,
            container: false,
        }),
    },
);
const { cartItem, isLoading } = toRefs(props);

const isProduct = computed(() => cartItem.value?.type === 'product');
const isDiscount = computed(() => {
    const isNotGood = !cartItem.value?.good;
    const hasNegativeOrZeroPrice = (cartItem.value?.price?.totalPrice ?? 0) <= 0;
    const isDiscountType = cartItem.value?.type === 'discount';
    return (isNotGood && hasNegativeOrZeroPrice) || isDiscountType;
});
const emits = defineEmits<{
  removeCartItem: [],
  changeCartItemQuantity: [number],
  isLoading: [boolean],
  removeProductFromWishlist: [],
  addProductToWishlist: [],
}>();

</script>
<template>
    <slot name="wrapper">

        <div :class="isLoading.container ? 'pointer-events-none opacity-50':''">
            <div class="relative">
                <div v-if="isLoading.container" class="absolute flex size-full items-center justify-center pb-4">
                    <slot name="loading-spinner">
                        <Loader2 class="size-12 animate-spin" />
                    </slot>
                </div>
                <div class="flex flex-wrap border-b py-4">
                    <template v-if="isProduct">
                        <slot name="product-wrapper">
                            <slot name="product">
                                <CartItemElementTypeProduct
                                    :cart-item="cartItem"
                                    :cart-delivery-position="cartDeliveryPosition"
                                    :item-total-price="itemTotalPrice"
                                    :item-regular-price="itemRegularPrice"
                                    :item-options="itemOptions"
                                    :product-url="productUrl"
                                    :quantity="quantity"
                                    :item-quantity="itemQuantity"
                                    :is-in-wishlist="isInWishlist"
                                    :is-loading="isLoading"
                                    @is-loading="(isLoadingEmit: boolean) => emits('isLoading', isLoadingEmit)"
                                    @change-cart-item-quantity="(quantityInput: number)=> emits('changeCartItemQuantity', quantityInput)"
                                    @remove-product-from-wishlist="emits('removeProductFromWishlist')"
                                    @add-product-to-wishlist="emits('addProductToWishlist')"
                                />
                            </slot>
                            <div class="order-2 flex w-1/6 justify-end">
                                <slot name="promotion-remove">
                                    <CartItemElementRemove
                                        :cart-item="cartItem"
                                        @remove-cart-item="emits('removeCartItem')"
                                    />
                                </slot>
                            </div>
                        </slot>
                    </template>
                    <template v-else-if="isDiscount">
                        <slot name="discount-wrapper">
                            <slot name="discount">
                                <CartItemElementTypeDiscount :cart-item="cartItem" />
                            </slot>
                            <div class="order-2 flex w-1/6 justify-end">
                                <slot name="discount-remove">
                                    <CartItemElementRemove
                                        :cart-item="cartItem"
                                        @remove-cart-item="emits('removeCartItem')"
                                    />
                                </slot>
                            </div>
                        </slot>
                    </template>
                    <template v-else>
                        <slot name="additional-type-wrapper" />
                        <slot name="generic-type-wrapper">
                            <slot name="generic">
                                <CartItemElementTypeProduct
                                    :cart-item="cartItem"
                                    :cart-delivery-position="cartDeliveryPosition"
                                    :item-total-price="itemTotalPrice"
                                    :item-regular-price="itemRegularPrice"
                                    :item-options="itemOptions"
                                    :quantity="quantity"
                                    :item-quantity="itemQuantity"
                                    :product-url="productUrl"
                                    @is-loading="(isLoadingEmit: boolean) => emits('isLoading', isLoadingEmit)"
                                    @change-cart-item-quantity="(quantityInput: number)=> emits('changeCartItemQuantity', quantityInput)"
                                    @remove-product-from-wishlist="emits('removeProductFromWishlist')"
                                    @add-product-to-wishlist="emits('addProductToWishlist')"
                                />
                            </slot>
                            <div class="order-2 flex w-1/6 justify-end">
                                <slot name="generic-remove">
                                    <CartItemElementRemove
                                        :cart-item="cartItem"
                                        @remove-cart-item="emits('removeCartItem')"
                                    />
                                </slot>
                            </div>
                        </slot>
                    </template>
                </div>
            </div>
        </div>
    </slot>
</template>
