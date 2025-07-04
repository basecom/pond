<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      items?: Schemas['Product'];
      isLoading?: boolean;
    }>(),
    {
      items: undefined,
      isLoading: false
    },
);
</script>

<template>
  <div class="gap-5 grid">
    <h1>
      {{ $t('wishlist.headline') }}
    </h1>

    <div v-if="isLoading">

    </div>
    <div v-else-if="items && items.length > 0">

    </div>
    <!-- No products -->
    <template v-else>
      <slot name="wishlist-no-products">
        <UiAlert class="flex gap-4 items-center">
          <Icon name="mdi:alert-circle-outline" class="size-4 shrink-0" />
          <UiAlertTitle class="mb-0"> {{ $t('wishlist.noProducts') }} </UiAlertTitle>
        </UiAlert>
      </slot>
    </template>
  </div>
</template>