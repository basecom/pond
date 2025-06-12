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
const emits = defineEmits<{
  removeProductFromWishlist: [];
  addProductToWishlist: [];
}>();

const removeProductFromWishlist = () => {
    emits('removeProductFromWishlist');
};

const addProductToWishlist = () => {
    emits('addProductToWishlist');
};

</script>

<template>
    <slot name="wishlist-content">
        <slot name="wishlist-wrapper">
            <div class="flex" @click="isInWishlist ? removeProductFromWishlist() : addProductToWishlist()">
                <slot name="wishlist-button">
                    <UiButton variant="ghost" size="icon" class="pl-0 pr-2">
                        <slot :name="isInWishlist ? 'icon-in-wishlist' : 'icon-not-in-wishlist'">
                            <Icon :name="isInWishlist ? 'mdi:heart' : 'mdi:heart-outline'" class="size-5" />
                        </slot>
                    </UiButton>
                    <UiButton variant="link" class="pl-0 text-xs" :is-loading="isLoading">
                        {{ $t(isInWishlist ? 'checkout.removeFromWishlist' : 'checkout.addToWishlist') }}
                    </UiButton>
                </slot>
            </div>
        </slot>
    </slot>
</template>
