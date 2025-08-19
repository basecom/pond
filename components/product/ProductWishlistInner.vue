<script setup lang="ts">
withDefaults(
    defineProps<{
        isInWishlist?: boolean;
    }>(),
    {
        isInWishlist: false,
    },
);

defineEmits<{
    addToWishlist: [];
    removeFromWishlist: [];
}>();

const configStore = useConfigStore();
const { getStyle } = usePondStyle();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled') as boolean;
</script>

<template>
    <UiButton
        v-if="wishlistEnabled"
        variant="ghost"
        :class="getStyle('cart.lineItem.cover.wishlist.outer')"
    >
        <Icon
            v-if="!isInWishlist"
            name="mdi:cards-heart-outline"
            :class="getStyle('cart.lineItem.cover.wishlist.icon')"
            @click="$emit('addToWishlist')"
        />

        <Icon
            v-else
            name="mdi:cards-heart"
            :class="getStyle('cart.lineItem.cover.wishlist.icon')"
            @click="$emit('removeFromWishlist')"
        />
    </UiButton>
</template>
