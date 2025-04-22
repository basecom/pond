<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
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
  <NuxtLinkLocale to="/">
    <img :src="cartItemImage" alt="image" class="w-100 h-[70px] object-contain"/>
  </NuxtLinkLocale>

</template>