<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
const { t } = useI18n();
const {pushError, pushSuccess} = useNotifications();
const props = withDefaults(
    defineProps<{
      referencedId?: string
    }>(),
    {
        referencedId: undefined,
    },
);

const { getWishlistProducts } = useWishlist();

const {addToWishlist, isInWishlist, removeFromWishlist } = useProductWishlist(props.referencedId ?? '');

const isLoading = ref(false);

const addProductToWishlist = async () => {
  try {
    isLoading.value = true;
    await addToWishlist();
    pushSuccess(t('checkout.success'));
  }
  catch(error: Error) {
    pushError(t('error.generalHeadline'));
  }
  isLoading.value = false;
};
const removeProductFromWishlist = async () => {
  try {
    isLoading.value = true;
    await removeFromWishlist();
    pushSuccess(t('checkout.success'));
  }
  catch(error: Error) {
    pushError(t('error.generalHeadline'));
  }
  isLoading.value = false;
};

getWishlistProducts(); //needs to be called again in cart
</script>
<template>
    <template v-if="isInWishlist">
      <slot name="addWishlistWrapper">
        <div class="flex" @click="removeProductFromWishlist">
          <slot name="removeFromWishlistButton">
            <UiButton variant="icon" class="pl-0 pr-2">
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
            <UiButton variant="icon" class="pl-0 pr-2">
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
