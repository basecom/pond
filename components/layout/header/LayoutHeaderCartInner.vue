<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
        cartItems?: Schemas['LineItem'][];
        cartDeliveries?: Schemas['CartDelivery'][];
        cartItemCount?: number;
    }>(),
    {
        cartItems: undefined,
        cartDeliveries: undefined,
        cartItemCount: undefined,
    },
);

const { getStyle } = usePondStyle();
</script>

<template>
    <UiSheet>
        <slot name="cart-trigger">
            <UiSheetTrigger
                id="open-offcanvas-cart"
                :class="getStyle('header.actions.cart.trigger')"
                aria-label="open-offcanvas-cart"
            >
                <slot name="cart-icon">
                    <Icon
                        name="mdi:cart-outline"
                        :class="getStyle('header.actions.cart.icon')"
                    />
                </slot>

                <slot name="cart-badge">
                    <UiBadge
                        v-if="cartItemCount > 0"
                        :class="getStyle('header.actions.cart.badge')"
                    >
                        {{ cartItemCount }}
                    </UiBadge>
                </slot>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent>
            <UiSheetHeader>
                <UiSheetTitle>
                    <slot name="cart-offcanvas-header">
                        <span>{{ $t('checkout.cartHeader') }}</span>
                    </slot>
                </UiSheetTitle>

                <UiSheetDescription>
                    <slot name="cart-offcanvas-description">
                        <template v-if="cartItemCount > 0">
                            {{ $t('checkout.itemCounter', { count: cartItemCount }) }}
                        </template>
                    </slot>
                </UiSheetDescription>

                <slot name="cart-offcanvas-content">
                    <TransitionGroup name="cart-item" tag="ul" class="grid gap-4">
                        <li v-for="cartItem in cartItems" :key="cartItem.id">
                            <CheckoutLineItem
                                :cart-item="cartItem"
                                :cart-deliveries="cartDeliveries"
                            />

                            <UiSeparator class="mt-4" />
                        </li>
                    </TransitionGroup>

                    <CheckoutSummary />

                    <div :class="getStyle('cart.summary.links.outer')">
                        <slot name="proceed-to-checkout-button">
                            <NuxtLinkLocale to="/checkout/confirm">
                                <UiButton :class="getStyle('cart.summary.links.confirm')">
                                    {{ $t('checkout.proceedToCheckout') }}
                                </UiButton>
                            </NuxtLinkLocale>
                        </slot>

                        <slot name="proceed-to-cart-button">
                            <NuxtLinkLocale to="/checkout/cart">
                                <UiButton variant="link" :class="getStyle('cart.summary.links.cart')">
                                    {{ $t('checkout.proceedToCart') }}
                                </UiButton>
                            </NuxtLinkLocale>
                        </slot>
                    </div>
                </slot>

                <slot name="cart-offcanvas-no-content">
                    <div v-if="cartItemCount === 0" :class="getStyle('cart.empty')">
                        {{ $t('checkout.noLineItems') }}
                    </div>
                </slot>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>

<style scoped>
.cart-item-leave-active {
    @apply
    absolute w-full z-10
    motion-safe:transition-[all_0.3s_cubic-bezier(0.4,0,0.2,1)]
}

.cart-item-leave-to {
    @apply
    motion-safe:opacity-0
    motion-safe:translate-y-[-10px]
    motion-safe:scale-95
    motion-safe:overflow-hidden;
}

.cart-item-move {
    @apply motion-safe:transition-[all_0.3s_cubic-bezier(0.4,0,0.2,1)];
}
</style>
