<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

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
      isLoggedIn?: boolean;
      isLoading?: {
        wishlist: boolean,
        container: boolean
      };
    }>(),
    {
        cartDeliveryPosition: undefined,
        itemTotalPrice: 0,
        itemRegularPrice: 0,
        itemOptions: undefined,
        quantity: 1,
        itemQuantity: 1,
        productUrl: undefined,
        isInWishlist: false,
        isLoggedIn: false,
        isLoading: () => ({
            wishlist: false,
            container: false,
        }),
    },
);

const emits = defineEmits<{
  'remove-cart-item': [],
  'change-cart-item-quantity': [number],
  'remove-product-from-wishlist': [],
  'add-product-to-wishlist': [],
}>();

const { cartItem, isLoading } = toRefs(props);

const isProduct = computed(() => cartItem.value?.type === 'product');

// Determines if an item should be treated as a discount based on:
// - Not being a "good" (physical product)
// - Having negative or zero price
// - Explicitly being a discount type
const isDiscount = computed(() => {
    const isNotGood = !cartItem.value?.good;
    const hasNegativeOrZeroPrice = (cartItem.value?.price?.totalPrice ?? 0) <= 0;
    const isDiscountType = cartItem.value?.type === 'discount';
    return (isNotGood && hasNegativeOrZeroPrice) || isDiscountType;
});

const componentMap = {
    product: 'CartItemElementTypeProduct',
    discount: 'CartItemElementTypeDiscount',
    generic: 'CartItemElementTypeProduct',
};

const currentComponent = computed(() => {
    if (isProduct.value) return componentMap.product;
    if (isDiscount.value) return componentMap.discount;
    return componentMap.generic;
});

const currentProps = computed(() => {
    if (isDiscount.value) {
        return {
            'cart-item': cartItem,
            'item-total-price': props.itemTotalPrice,
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
        'is-logged-in': props.isLoggedIn,
        'is-loading': props.isLoading,
    };
});

const eventHandlers = computed(() => {
    if(!isDiscount.value) return {
        'change-cart-item-quantity': (quantityInput: number) => emits('change-cart-item-quantity', quantityInput),
        'remove-product-from-wishlist': () => emits('remove-product-from-wishlist'),
        'add-product-to-wishlist': () => emits('add-product-to-wishlist'),
    };
    return {};
});
</script>

<template>
    <slot name="wrapper">
        <LayoutLoader :is-loading="isLoading.container">
            <template #loading-spinner-content>
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
                                v-if="cartItem?.removable"
                                @remove-cart-item="emits('remove-cart-item')"
                            />
                        </slot>
                    </div>
                </slot>
            </template>
        </LayoutLoader>
    </slot>
</template>
