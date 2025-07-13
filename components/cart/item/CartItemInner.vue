<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

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
        itemTotalPrice: 0,
        itemRegularPrice: 0,
        itemOptions: undefined,
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

const emits = defineEmits<{
  removeCartItem: [],
  changeCartItemQuantity: [number],
  removeProductFromWishlist: [],
  addProductToWishlist: [],
}>();

const { cartItem, isLoading } = toRefs(props);

const isProduct = computed(() => cartItem.value?.type === 'product');
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
        'is-loading': props.isLoading,
    };
});

const eventHandlers = computed(() => {
    if(!isDiscount.value) return {
        'changeCartItemQuantity': (quantityInput: number) => emits('changeCartItemQuantity', quantityInput),
        'removeProductFromWishlist': () => emits('removeProductFromWishlist'),
        'addProductToWishlist': () => emits('addProductToWishlist'),
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
                                v-if="cartItem.removable"
                                @remove-cart-item="emits('removeCartItem')"
                            />
                        </slot>
                    </div>
                </slot>
            </template>
        </LayoutLoader>
    </slot>
</template>
