<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItemImage?: string
    }>(),
    {
        cartItemImage: undefined,
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
</template>
