<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItems?: Schemas['LineItem'][];
      cartDeliveries?: Schemas['CartDelivery'][];
      cartPriceTotal?: string
    }>(),
    {
        cartItems: () => [],
        cartDeliveries: () => [],
        cartPriceTotal: '',
    },
);

const getCartCount = (items: Schemas['LineItem'][] = []) => items.length;
const cartCount = computed(() => getCartCount(props.cartItems));
const hasLineItems = computed(() => cartCount.value > 0);
</script>

<template>
    <UiSheet>
        <slot name="cart-trigger">
            <UiSheetTrigger id="open-offcanvas-cart" class="size-5 cursor-pointer" aria-label="open-offcanvas-cart">
                <div class="relative">
                    <slot name="cart-icon">
                        <Icon name="mdi:cart-outline" class="size-5" />
                    </slot>
                    <slot name="cart-badge">
                        <ClientOnly>
                            <UiBadge v-if="hasLineItems" class="absolute -right-2 -top-1.5 px-1 py-0 text-xs font-normal" aria-label="$t('checkout.itemsInCart', { count: cartCount })">
                                {{ cartCount }}
                            </UiBadge>
                        </ClientOnly>
                    </slot>
                </div>
            </UiSheetTrigger>
            <UiSheetTrigger>
                <slot name="cart-amount">
                    <ClientOnly>
                        <span v-if="props.cartPriceTotal" class="text-gray-900 underline underline-offset-4 cursor-pointer">
                            {{ props.cartPriceTotal }}*
                        </span>
                    </ClientOnly>
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
                                <span class="pr-2">{{ cartCount }} {{ $t('checkout.items') }}</span>
                            </slot>
                        </div>
                    </slot>
                </UiSheetTitle>
                <UiSheetDescription>
                    <slot name="offcanvasContent">
                        <template v-if="hasLineItems">
                            <CheckoutOffcanvasCart :cart-deliveries="props.cartDeliveries" :cart-items="props.cartItems" />
                        </template>
                        <template v-else>
                            <div class="p-4 text-center text-gray-500">{{ $t('checkout.cartEmpty') }}</div>
                        </template>
                    </slot>
                </UiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
