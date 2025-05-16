<script setup lang="ts">
import {toast} from '../../ui/toast';
import {ApiClientError} from '@shopware/api-client';
const { t } = useI18n();
const props = withDefaults(
    defineProps<{
      isInWishlist?: boolean;
      isLoading: boolean;
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
    <template v-if="isInWishlist">
        <slot name="addWishlistWrapper">
            <div class="flex" @click="removeProductFromWishlist">
                <slot name="removeFromWishlistButton">
                    <UiButton variant="ghost" size="icon" class="pl-0 pr-2">
                        <slot name="iconInWishlist">
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
        <slot name="removeWishlistWrapper">
            <div class="flex" @click="addProductToWishlist">
                <slot name="removeFromWishlistButton">
                    <UiButton variant="ghost" size="icon" class="pl-0 pr-2">
                        <slot name="iconNotInWishlist">
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

</template>
