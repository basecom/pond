<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

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

getWishlistProducts(); //needs to be called again in cart
</script>
<template>
    <template v-if="isInWishlist">
        <div class="flex" @click="removeFromWishlist">
          <slot name="removeFromWishlistButton">
            <UiButton variant="icon" class="pl-0 pr-2">
              <slot name="iconInWishlist">
                <Icon name="mdi:heart" class="size-5" />
              </slot>
            </UiButton>
            <UiButton variant="link" class="pl-0 text-xs">
                {{ $t('checkout.removeFromWishlist') }}
            </UiButton>
          </slot>
        </div>
    </template>
    <template v-else>
        <div class="flex" @click="addToWishlist">
          <slot name="removeFromWishlistButton">
            <UiButton variant="icon" class="pl-0 pr-2">
              <slot name="iconNotInWishlist">
                <Icon name="mdi:heart-outline" class="size-5" />
              </slot>
            </UiButton>
            <UiButton variant="link" class="pl-0 text-xs">
                {{ $t('checkout.addToWishlist') }}
            </UiButton>
          </slot>
        </div>
    </template>

</template>
