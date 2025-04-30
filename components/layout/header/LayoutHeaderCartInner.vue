<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import UiButton from '../../ui/button/UiButton.vue';
import CartItem from '../../lineItem/CartItem.vue';
import OffcanvasCartSummary from '../../checkout/OffcanvasCartSummary.vue';

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

const { cartDeliveries } = toRefs(props);
const hasLineItems = (cartItems?: Schemas['LineItem'][]) => cartItems && cartItems.length > 0;
const getCartDeliveryPositions = (cartDeliveries?: Schemas['CartDelivery'][]) => cartDeliveries?.find(() => true)?.positions;

const getCartDeliveryPosition = (id: string, cartDeliveryPositions?: Schemas['CartDeliveryPosition'][]) =>
    cartDeliveryPositions?.find(
        (cartDeliveryPosition) => cartDeliveryPosition.lineItem?.id === id,
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
                    <UiBadge v-if="hasLineItems(cartItems)" class="absolute -top-1 px-1 py-0 text-xs font-normal">
                        {{ cartItems.length }}
                    </UiBadge>
                </slot>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent class="overflow-y-scroll">
            <UiSheetHeader>
                <UiSheetTitle>
                  <slot name="offcanvasHeader">
                  <div class="flex justify-between mt-4 items-center">
                    <slot name="cartTitle">
                      <span>{{$t('checkout.cart')}}</span>
                      <span>{{cartItems.length}} {{$t('checkout.items')}}</span>
                    </slot>
                  </div>
                  </slot>
                </UiSheetTitle>
                <UiSheetDescription>
                  <slot name="offcanvasContent">
                    <div class="mb-4">
                        <template v-if="hasLineItems(cartItems)">
                            <template v-for="cartItem in cartItems">
                              <slot name="cartItem">
                                <CartItem
                                    :cart-item="cartItem"
                                    :cart-delivery-position="getCartDeliveryPosition(cartItem.id, getCartDeliveryPositions(cartDeliveries))"
                                />
                              </slot>
                            </template>
                        </template>

                        <template v-else>
                            <div class="w-full">
                              <slot name="noLineItemsLabel">
                                <UiAlert>
                                    <UiAlertDescription>{{ $t('checkout.noLineItems') }}</UiAlertDescription>
                                </UiAlert>
                              </slot>
                            </div>
                        </template>
                    </div>
                    <div>
                      <slot name="cartSummary">
                        <OffcanvasCartSummary :cart-deliveries="cartDeliveries" />
                      </slot>
                    </div>
                    <div class="flex w-full flex-col gap-1">
                        <div class="w-full text-center">
                          <slot name="proceedToCheckoutButton">
                            <NuxtLinkLocale to="/">
                                <UiButton :class="'w-full'">{{ $t('checkout.proceedToCheckout') }}</UiButton>
                            </NuxtLinkLocale>
                          </slot>
                        </div>
                        <div class="w-full text-center">
                          <slot name="proceedToCartButton">
                            <NuxtLinkLocale to="/">
                                <UiButton variant="link">{{ $t('checkout.proceedToCart') }}</UiButton>
                            </NuxtLinkLocale>
                          </slot>
                        </div>
                    </div>
                  </slot>
                </UiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
