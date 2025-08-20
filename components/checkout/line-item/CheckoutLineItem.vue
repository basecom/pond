<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
        cartItem: Schemas['LineItem'];
        cartDeliveries?: Schemas['CartDelivery'][];
    }>(), {
        cartDeliveries: undefined,
    },
);

const configStore = useConfigStore();
const showDeliveryTime = configStore.get('core.cart.showDeliveryTime') as boolean;

const reactiveCartItem = toRef(props, 'cartItem');
const {
    itemOptions,
    removeItem,
    itemTotalPrice,
    itemRegularPrice,
    itemQuantity,
    isPromotion,
    isRemovable,
    isStackable,
    changeItemQuantity,
} = useCartItem(reactiveCartItem);

const deliveryInformation = computed(() => {
    if (!showDeliveryTime || !props.cartDeliveries) return undefined;

    return props.cartDeliveries
        ?.flatMap(delivery => delivery.positions || [])
        ?.find(position => position.lineItem?.id === props.cartItem.id);
});
</script>

<template>
    <CheckoutLineItemInner
        :cart-item="reactiveCartItem"
        :delivery-information="deliveryInformation"
        :item-options="itemOptions"
        :is-removable="isRemovable"
        :is-stackable="isStackable"
        :is-promotion="isPromotion"
        :item-quantity="itemQuantity"
        :item-total-price="itemTotalPrice"
        :item-regular-price="itemRegularPrice"
        @remove-item="() => removeItem()"
        @change-quantity="quantity => changeItemQuantity(quantity)"
    />
</template>
