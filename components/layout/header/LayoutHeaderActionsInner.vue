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
const wrapperStyles = getStyle('header.actions.wrapper');
</script>

<template>
    <slot name="wrapper">
        <div :class="wrapperStyles">
            <slot name="search">
                <LayoutHeaderSearch />
            </slot>

            <slot name="wishlist">
                <LayoutHeaderWishlist v-if="wishlistEnabled" />
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

