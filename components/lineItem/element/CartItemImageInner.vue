<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItemImage?: string
    }>(),
    {
      cartItemImage: undefined
    },
);
</script>
<template>
  <div class="text-center mb-2 w-[70px]">
    <NuxtLinkLocale to="/">
      <img :src="cartItemImage" alt="image" class="w-100 h-[70px] object-contain border p-1"/>
    </NuxtLinkLocale>
  </div>
</template>