<script setup lang="ts">
withDefaults(
    defineProps<{
      isInWishlist?: boolean;
      isLoading?: boolean;
    }>(),
    {
        isInWishlist: false,
        isLoading: false,
    },
);

defineEmits<{
  'remove-product-from-wishlist': [];
  'add-product-to-wishlist': [];
}>();

const { t } = useI18n();
const { getStyle } = usePondStyle();
</script>

<template>
    <slot name="wishlist-content">
        <slot name="wishlist-wrapper">
            <div :class="getStyle('cart.wishlistWrapper')">
                <slot name="wishlist-button">
                    <UiButton
                        variant="ghost"
                        size="icon"
                        :class="getStyle('cart.wishlistButtonGhost')"
                        :aria-label="t(isInWishlist ? 'checkout.removeFromWishlist' : 'checkout.addToWishlist')"
                        @click="isInWishlist ? $emit('remove-product-from-wishlist') : $emit('add-product-to-wishlist')"
                    >
                        <slot :name="isInWishlist ? 'icon-in-wishlist' : 'icon-not-in-wishlist'">
                            <Icon :name="isInWishlist ? 'mdi:heart' : 'mdi:heart-outline'" :class="getStyle('cart.wishlistIcon')" />
                        </slot>
                    </UiButton>
                    <UiButton
                        variant="link"
                        :class="getStyle('cart.wishlistButtonLink')"
                        :is-loading="isLoading"
                        @click="isInWishlist ? $emit('remove-product-from-wishlist') : $emit('add-product-to-wishlist')"
                    >
                        {{ $t(isInWishlist ? 'checkout.removeFromWishlist' : 'checkout.addToWishlist') }}
                    </UiButton>
                </slot>
            </div>
        </slot>
    </slot>
</template>
