<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      referencedId?: string
    }>(),
    {
      referencedId: undefined
    },
);

const { getWishlistProducts } = useWishlist();

const {addToWishlist, isInWishlist, removeFromWishlist } = useProductWishlist(props.referencedId ?? "");

getWishlistProducts(); //needs to be called again in cart
</script>
<template>
  <template v-if="isInWishlist">
    <div @click="removeFromWishlist" class="flex">
    <UiButton variant="icon" class="pl-0 pr-2">
      <Icon name="mdi:heart" class="size-5"/>
    </UiButton>
    <UiButton variant="link" class="pl-0 text-xs">
      {{ $t('removeFromWishlist') }}
    </UiButton>
    </div>
  </template>
  <template v-else>
    <div @click="addToWishlist" class="flex">
    <UiButton variant="icon" class="pl-0 pr-2">
      <Icon name="mdi:heart-outline" class="size-5"/>
    </UiButton>
    <UiButton variant="link" class="pl-0 text-xs">
      {{ $t('addToWishlist') }}
    </UiButton>
    </div>
  </template>

</template>