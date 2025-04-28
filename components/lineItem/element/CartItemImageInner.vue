<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItemImage?: string,
      fallback? :string
    }>(),
    {
        cartItemImage: undefined,
        fallback: 'mdi:duck',
    },
);
</script>
<template>
    <template v-if="cartItemImage">
        <slot name="container">
            <div class="w-[70px] text-center">
                <slot name="link">
                    <NuxtLinkLocale to="/">
                        <slot name="cartImage">
                            <img :src="cartItemImage" alt="image" class="w-100 h-[70px] border object-contain p-1">
                        </slot>
                    </NuxtLinkLocale>
                </slot>
            </div>
        </slot>
    </template>
    <template v-else>
        <slot name="fallbackContainer">
            <div class="flex size-[70px] items-center justify-center border text-center">
                <slot name="fallbackLink">
                    <NuxtLinkLocale to="/">
                        <slot name="fallbackIcon">
                            <Icon :name="fallback" class="size-8" />
                        </slot>
                    </NuxtLinkLocale>
                </slot>
            </div>
        </slot>
    </template>
</template>
