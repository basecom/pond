<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      cartItems?: Schemas['LineItem'][];
      cartDeliveries?: Schemas['CartDelivery'][];
      cartPriceTotal?: string
    }>(),
    {
        cartItems: undefined,
        cartDeliveries: undefined,
        cartPriceTotal: '',
    },
);
const hasLineItems = (cartItems?: Schemas['LineItem'][]) => cartItems && cartItems.length > 0;
</script>

<template>
    <UiSheet>
        <slot name="cart-trigger">
            <UiSheetTrigger class="size-5">
                <div class="relative">
                    <slot name="cart-icon">
                        <Icon name="mdi:cart-outline" class="size-5" />
                    </slot>

                    <slot name="cart-badge">
                        <UiBadge v-if="hasLineItems(cartItems)" class="absolute -right-2 -top-1.5 px-1 py-0 text-xs font-normal">
                            {{ cartItems.length }}
                        </UiBadge>
                    </slot>
                </div>
            </UiSheetTrigger>
            <UiSheetTrigger>
                <slot name="cart-amount">
                    <span v-if="cartPriceTotal" class="text-gray-900 underline underline-offset-4">
                        {{ cartPriceTotal }}*
                    </span>
                </slot>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent class="overflow-y-scroll">
            <UiSheetHeader>
                <UiSheetTitle>
                    <slot name="offcanvasHeader">
                        <div class="mt-4 flex w-full items-center justify-between">
                            <slot name="cartTitle">
                                <span>{{ $t('checkout.cart') }}</span>
                                <span class="pr-2">{{ cartItems.length }} {{ $t('checkout.items') }}</span>
                            </slot>
                        </div>
                    </slot>
                </UiSheetTitle>
                <UiSheetDescription>
                    <slot name="offcanvasContent">
                        <CheckoutOffcanvasCart :cart-deliveries="cartDeliveries" :cart-items="cartItems" />
                    </slot>
                </UiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
