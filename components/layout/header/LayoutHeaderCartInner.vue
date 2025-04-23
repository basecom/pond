<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import UiButton from "../../ui/button/UiButton.vue";
import CartItem from "../../lineItem/CartItem.vue";

const props = withDefaults(
    defineProps<{
      cartItems?: Schemas['LineItem'][];
      cartDeliveries?: Schemas['CartDelivery'][];
    }>(),
    {
        cartItems: undefined,
        cartDeliveries: undefined,
    },
);

const hasLineItems = () => props.cartItems && props.cartItems?.length > 0;

const cartDeliveryPositions = () => props.cartDeliveries?.find(() => true)?.positions;

const getCartDeliveryPosition = (id: string) => cartDeliveryPositions()?.find(
    (cartDelivery) => cartDelivery.lineItem?.id === id
);
</script>

<template>
    <UiSheet>
        <slot name="cart-trigger">
            <UiSheetTrigger class="size-5">
                <slot name="cart-icon">
                    <Icon name="mdi:cart-outline" class="size-5" />
                </slot>

                <slot name="cart-badge">
                    <UiBadge v-if="hasLineItems()" class="absolute -top-1 px-1 py-0 text-xs font-normal">
                        {{ cartItems.length }}
                    </UiBadge>
                </slot>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent class="overflow-y-scroll">
            <UiSheetHeader>
                <UiSheetTitle>Cart</UiSheetTitle>
                <UiSheetDescription>

                    <template v-if="hasLineItems()">
                        <template v-for="cartItem in cartItems">
                            <CartItem :cart-item="cartItem" :cart-delivery-position="getCartDeliveryPosition(cartItem.id)">

                            </CartItem>
                        </template>
                    </template>
                  <template v-else>
                    <div class="w-full">
                      <UiAlert>
                        <UiAlertDescription>Your shopping cart is empty.</UiAlertDescription>
                      </UiAlert>
                    </div>
                  </template>
                  <div class="flex flex-col w-full gap-1">
                    <div class="text-center w-full"><NuxtLinkLocale to="/"><UiButton :class="'w-full'">{{$t('proceedToCheckout')}}</UiButton></NuxtLinkLocale></div>
                    <div class="text-center w-full"><NuxtLinkLocale to="/"><UiButton variant="link">{{$t('proceedToCart')}}</UiButton></NuxtLinkLocale></div>
                  </div>
                </UiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
