<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      cartItems?: Schemas['LineItem'][];
    }>(),
    {
        cartItems: undefined,
    },
);

const { getStyle } = usePondStyle();
const triggerStyles = getStyle('header.actions.cart.trigger');
const iconStyles = getStyle('header.actions.cart.icon');
const badgeStyles = getStyle('header.actions.cart.badge');
</script>

<template>
    <UiSheet>
        <slot name="cart-trigger">
            <UiSheetTrigger
                id="open-offcanvas-cart"
                :class="triggerStyles"
                aria-label="open-offcanvas-cart"
            >
                <slot name="cart-icon">
                    <Icon
                        name="mdi:cart-outline"
                        :class="iconStyles"
                    />
                </slot>

                <slot name="cart-badge">
                    <UiBadge
                        v-if="cartItems?.length > 0"
                        :class="badgeStyles"
                    >
                        {{ cartItems.length }}
                    </UiBadge>
                </slot>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent>
            <UiSheetHeader>
                <UiSheetTitle>Cart</UiSheetTitle>
                <UiSheetDescription>
                    products
                </UiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
