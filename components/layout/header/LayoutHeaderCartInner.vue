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

const { getStyle } = usePondStyle();
defineEmits<{
  open: [value: boolean];
}>();

const cartCount = computed(() => props?.cartItems?.length);
const hasLineItems = computed(() => cartCount.value > 0);
</script>

<template>
    <UiSheet @update:open="(value: boolean) => $emit('open', value)">
        <slot name="cart-trigger">
            <UiSheetTrigger
                id="open-offcanvas-cart"
                :class="getStyle('header.actions.cart.trigger')"
                aria-label="open-offcanvas-cart"
            >
                <div :class="getStyle('cart.headerCartTrigger')">
                    <span class="flex">
                        <slot name="cart-icon">
                            <span> <Icon
                                name="mdi:cart-outline"
                                :class="getStyle('header.actions.cart.icon')"
                            /> </span>
                        </slot>
                        <slot name="cart-amount">
                            <ClientOnly>
                                <span v-if="props.cartPriceTotal" :class="getStyle('cart.headerCartAmount')">
                                    {{ props.cartPriceTotal }}*
                                </span>
                            </ClientOnly>
                        </slot>
                    </span>
                    <slot name="cart-badge">
                        <ClientOnly>
                            <UiBadge v-if="hasLineItems" :class="getStyle('header.actions.cart.badge')" aria-label="$t('checkout.itemsInCart', { count: cartCount })">
                                {{ cartCount }}
                            </UiBadge>
                        </ClientOnly>
                    </slot>

                </div>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent class="overflow-y-scroll">
            <UiSheetHeader>
                <UiSheetTitle>
                    <slot name="offcanvasHeader">
                        <div :class="getStyle('cart.headerCartTitleRow')">
                            <slot name="cartTitle">
                                <span>{{ $t('checkout.cart') }}</span>
                                <span :class="getStyle('cart.headerCartTitleCount')">{{ cartCount }} {{ $t('checkout.items') }}</span>
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
                            <div :class="getStyle('cart.headerCartEmpty')">{{ $t('checkout.cartEmpty') }}</div>
                        </template>
                    </slot>
                </UiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
