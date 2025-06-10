<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import {toast} from '../../ui/toast';
import {getProductUrl} from '@shopware-pwa/helpers-next';

const props = withDefaults(
    defineProps<{
      cartItem: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
        cartDeliveryPosition: undefined,
    },
);

const { cartItem } = toRefs(props);

const {addToWishlist, isInWishlist, removeFromWishlist } = useProductWishlist(cartItem.value?.referencedId ?? '');


const {removeItem} = useCartItem(cartItem);
const { t } = useI18n();

const isLoading = ref({
    wishlist: false,
    container: false,
});


const {
    itemOptions,
    itemTotalPrice,
    itemRegularPrice,
    itemQuantity,
    changeItemQuantity,
} = useCartItem(cartItem);

const {getWishlistProducts} = useWishlist();

const {refreshCart} = useCart();

const quantity = ref();

const productUrl = cartItem?.value?.referencedId && cartItem?.value?.type === 'product' ?
    getProductUrl({id: cartItem?.value?.referencedId}) : '';

syncRefs(itemQuantity, quantity);

getWishlistProducts();

const {handleError} = usePondHandleError();

const removeCartItem = async () => {
    isLoading.value.container = true;
    try {
        await removeItem();
        toast({
            description: t('checkout.removeSuccess'),
        });
    } catch (error) {
        handleError(error, true, {show: true});
    } finally {
        isLoading.value.container = false;
    }
};

const changeCartItemQuantity = async (quantityInput: number) => {
    try {
        isLoading.value.container = true;
        const response = await changeItemQuantity(Number(quantityInput));
        await refreshCart(response);
        toast({
            description: t('checkout.success'),
        });
    } catch (error) {
        handleError(error, true, {show: true, description: 'DEFAULT'});
    }
    isLoading.value.container = false;
    quantity.value = itemQuantity.value;
};
const addProductToWishlist = async () => {
    try {
        isLoading.value.wishlist = true;
        await addToWishlist();
        toast({
            description: t('checkout.addToWishlistSuccess'),
        });
    } catch(error) {
        handleError(error, true, {show: true});
    }
    isLoading.value.wishlist = false;
};
const removeProductFromWishlist = async () => {
    try {
        isLoading.value.wishlist = true;
        await removeFromWishlist();
        toast({
            description: t('checkout.removeFromWishlistSuccess'),
        });
    } catch(error) {
        handleError(error, true, {show: true});
    }
    isLoading.value.wishlist = false;
};

</script>
<template>
    <CartItemInner
        :cart-item="cartItem"
        :cart-delivery-position="cartDeliveryPosition"
        :item-quantity="itemQuantity"
        :quantity="quantity"
        :item-regular-price="itemRegularPrice"
        :item-total-price="itemTotalPrice"
        :item-options="itemOptions"
        :product-url="productUrl"
        :is-loading="isLoading"
        :is-in-wishlist="isInWishlist"
        @remove-cart-item="removeCartItem"
        @change-cart-item-quantity="(quantityInput: number)=> changeCartItemQuantity(quantityInput)"
        @add-product-to-wishlist="addProductToWishlist"
        @remove-product-from-wishlist="removeProductFromWishlist"
    />

</template>
