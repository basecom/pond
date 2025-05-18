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

const removeProductFromWishlist = async () => {
    emits('removeProductFromWishlist');
};

const addProductToWishlist= async () => {
    emits('addProductToWishlist');
};

</script>

<template>
    <slot name="wishlist-content">
        <template v-if="isInWishlist">
            <slot name="add-wishlist-wrapper">
                <div class="flex" @click="removeProductFromWishlist">
                    <slot name="remove-from-wishlist-button">
                        <UiButton variant="ghost" size="icon" class="pl-0 pr-2">
                            <slot name="icon-in-wishlist">
                                <Icon name="mdi:heart" class="size-5" />
                            </slot>
                        </UiButton>
                        <UiButton variant="link" class="pl-0 text-xs" :is-loading="isLoading">
                            {{ $t('checkout.removeFromWishlist') }}
                        </UiButton>
                    </slot>
                </div>
            </slot>
        </template>
        <template v-else>
            <slot name="remove-wishlist-wrapper">
                <div class="flex" @click="addProductToWishlist">
                    <slot name="remove-from-wishlist-button">
                        <UiButton variant="ghost" size="icon" class="pl-0 pr-2">
                            <slot name="icon-not-in-wishlist">
                                <Icon name="mdi:heart-outline" class="size-5" />
                            </slot>
                        </UiButton>
                        <UiButton variant="link" class="pl-0 text-xs" :is-loading="isLoading">
                            {{ $t('checkout.addToWishlist') }}
                        </UiButton>
                    </slot>
                </div>
            </slot>
        </template>
    </slot>
</template>
