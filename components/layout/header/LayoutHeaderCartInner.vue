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
                        v-if="cartItems?.length > 0"
                        :class="getStyle('header.actions.cart.badge')"
                    >
                        {{ cartItems.length }}
                    </UiBadge>
                </slot>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent>
            <UiSheetHeader>
                <UiSheetTitle>
                    <slot name="cart-offcanvas-header">
                        <span>{{ $t('checkout.cart') }}</span>
                    </slot>
                </UiSheetTitle>

                <UiSheetDescription>
                    <slot name="cart-offcanvas-description">
                        <template v-if="cartItemCount > 0">
                            {{ cartItemCount }} {{ $t('checkout.items') }}
                        </template>
                    </slot>
                </UiSheetDescription>

                <UiSheetDescription>
                    <slot name="cart-offcanvas-content">
                        <CartOffcanvasCart
                            v-if="cartItemCount > 0"
                            :cart-deliveries="cartDeliveries"
                            :cart-items="cartItems"
                        />

                        <div v-else :class="getStyle('cart.empty')">
                            {{ $t('checkout.noLineItems') }}
                        </div>
                    </slot>
                </UiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
