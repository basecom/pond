<script setup lang="ts">
withDefaults(
    defineProps<{
      wishlistEnabled?: boolean;
    }>(),
    {
        wishlistEnabled: false,
    },
);

const { getStyle } = usePondStyle();
</script>

<template>
    <slot name="wrapper">
        <div :class="getStyle('header.actions.wrapper')">
            <slot name="search">
                <LayoutHeaderSearch />
            </slot>

            <slot name="wishlist">
                <LayoutHeaderWishlist v-show="wishlistEnabled" />
            </slot>

            <slot name="account-mobile">
                <LayoutHeaderAccountMobile />
            </slot>

            <slot name="account-desktop">
                <LayoutHeaderAccount />
            </slot>

            <slot name="cart">
                <LayoutHeaderCart />
            </slot>
        </div>
    </slot>
</template>

