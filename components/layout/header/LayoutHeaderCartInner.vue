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

        <UiSheetContent :class="getStyle('cart.sheet.content')">
            <UiSheetHeader>
                <UiSheetTitle>
                    <slot name="cart-offcanvas-header">
                        <span>{{ $t('checkout.cartHeader') }}</span>
                    </slot>
                </UiSheetTitle>
            </UiSheetHeader>

            <UiSheetDescription :class="getStyle('cart.sheet.description')">
                <slot name="cart-offcanvas-description">
                    <template v-if="cartItemCount > 0">
                        {{ $t('checkout.itemCounter', { count: cartItemCount }) }}
                    </template>
                </slot>
            </UiSheetDescription>

            <slot name="cart-offcanvas-content">
                <template v-if="cartItemCount > 0">
                    <slot name="cart-offcanvas-line-items">
                        <TransitionGroup name="cart-item" tag="ul" :class="getStyle('cart.sheet.transitionGroup')">
                            <li v-for="cartItem in (cartItems ?? [])" :key="cartItem.id">
                                <CheckoutLineItem
                                    :cart-item="cartItem"
                                    :cart-deliveries="cartDeliveries"
                                />

                                <UiSeparator :class="getStyle('cart.sheet.separator')" />
                            </li>
                        </TransitionGroup>
                    </slot>
                </template>

                <CheckoutSummary />

                <div :class="getStyle('cart.summary.links.outer')">
                    <slot name="cart-offcanvas-confirm">
                        <NuxtLinkLocale to="/checkout/confirm">
                            <UiButton :class="getStyle('cart.summary.links.confirm')">
                                {{ $t('checkout.proceedToCheckout') }}
                            </UiButton>
                        </NuxtLinkLocale>
                    </slot>

                    <slot name="cart-offcanvas-cart">
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
        </UiSheetContent>
    </UiSheet>
</template>

<style scoped>
.cart-item-leave-active {
    @apply motion-safe:transition-all duration-300 ease-in-out;
}

.cart-item-leave-to {
    @apply opacity-0 -translate-y-2 scale-95;
}

.cart-item-move {
    @apply motion-safe:transition-all duration-300 ease-in-out;
}
</style>
