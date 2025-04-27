<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItemImage?: string,
      fallback? :string
    }>(),
    {
        cartItemImage: undefined,
        fallback: 'mdi:duck'
    },
);
</script>
<template>
    <template v-if="cartItemImage">
        <div class="w-[70px] text-center">
            <NuxtLinkLocale to="/">
                <img :src="cartItemImage" alt="image" class="w-100 h-[70px] border object-contain p-1">
            </NuxtLinkLocale>
        </div>
    </template>
  <template v-else>
    <div class="w-[70px] text-center border h-[70px] flex justify-center items-center">
      <NuxtLinkLocale to="/">
        <Icon :name="fallback" class="size-8" />
      </NuxtLinkLocale>
    </div>
  </template>
</template>
