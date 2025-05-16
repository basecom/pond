<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import {toast} from '../ui/toast';
import {ApiClientError} from '@shopware/api-client';

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
        cartItem: undefined,
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
} = useCartItem(cartItem);

const {
    itemTotalPrice,
    itemRegularPrice,
} = useCartItem(cartItem);


const emits = defineEmits<{
  isLoading: [boolean]
}>();

const {
    itemQuantity,
    changeItemQuantity,
} = useCartItem(cartItem);

const {refreshCart} = useCart();

const quantity = ref();

syncRefs(itemQuantity, quantity);
const {getWishlistProducts} = useWishlist();
getWishlistProducts();

const removeCartItem = async () => {
    try {
        isLoading.value.container = true;
        await removeItem();
        toast({
            description: t('checkout.removeSuccess'),
        });

    } catch (error) {
        if(error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${error.details.errors[0]?.code ?? 'DEFAULT'}`),
                variant: 'destructive',
            });
        }
    }
    isLoading.value.container = false;
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
        if (error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${error.details.errors[0]?.code ?? 'DEFAULT'}`),
                variant: 'destructive',
            });
        }
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
        if(error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${ error.details.errors[0]?.code}`),
                variant: 'destructive',
            });

        }
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
        if(error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${error.details.errors[0]?.code} ?? 'DEFAULT'`),
                variant: 'destructive',
            });
        }
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
        :is-loading="isLoading"
        :is-in-wishlist="isInWishlist"
        @remove-cart-item="removeCartItem"
        @change-cart-item-quantity="(quantityInput: number)=> changeCartItemQuantity(quantityInput)"
        @add-product-to-wishlist="addProductToWishlist"
        @remove-product-from-wishlist="removeProductFromWishlist"
    />

</template>
