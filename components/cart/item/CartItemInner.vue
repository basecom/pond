<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import {Loader2} from 'lucide-vue-next';

const props = withDefaults(
    defineProps<{
      cartItem: Schemas['LineItem'];
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

const componentMap = {
    product: 'CartItemElementTypeProduct',
    generic: 'CartItemElementTypeProduct',
    discount: 'CartItemElementTypeDiscount',
};

const currentComponent = computed(() => {
    if (isProduct.value) return componentMap.product;
    if (isDiscount.value) return componentMap.discount;
    return componentMap.generic;
});

const currentProps = computed(() => {
    if (isProduct.value) {
        return {
            'cart-item': cartItem,
            'cart-delivery-position': props.cartDeliveryPosition,
            'item-total-price': props.itemTotalPrice,
            'item-regular-price': props.itemRegularPrice,
            'item-options': props.itemOptions,
            'product-url': props.productUrl,
            'quantity': props.quantity,
            'item-quantity': props.itemQuantity,
            'is-in-wishlist': props.isInWishlist,
            'is-loading': props.isLoading,
        };
    }
    if (isDiscount.value) {
        return {
            'cart-item': cartItem,
        };
    }
    return {
        'cart-item': cartItem,
        'cart-delivery-position': props.cartDeliveryPosition,
        'item-total-price': props.itemTotalPrice,
        'item-regular-price': props.itemRegularPrice,
        'item-options': props.itemOptions,
        'product-url': props.productUrl,
        'quantity': props.quantity,
        'item-quantity': props.itemQuantity,
        'is-in-wishlist': props.isInWishlist,
        'is-loading': props.isLoading,
    };
});

const eventHandlers = computed(() => {
    if(!isDiscount.value) return {
        'isLoading': (isLoadingEmit: boolean) => emits('isLoading', isLoadingEmit),
        'changeCartItemQuantity': (quantityInput: number) => emits('changeCartItemQuantity', quantityInput),
        'removeProductFromWishlist': () => emits('removeProductFromWishlist'),
        'addProductToWishlist': () => emits('addProductToWishlist'),
    };
    return {};
});

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
                    <slot name="component-type-wrapper">
                        <slot name="component-type">
                            <component
                                :is="currentComponent"
                                v-bind="currentProps"
                                v-on="eventHandlers"
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
                </div>
            </div>
        </div>
    </slot>
</template>
