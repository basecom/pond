<script setup lang="ts">
withDefaults(
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
            <div class="w-20 text-center">
                <slot name="link">
                    <NuxtLinkLocale to="/">
                        <slot name="cartImage">
                            <img :src="cartItemImage" alt="image" class="w-100 h-20 border object-contain p-1">
                        </slot>
                    </NuxtLinkLocale>
                </slot>
            </div>
        </slot>
    </template>
    <template v-else>
        <slot name="fallbackContainer">
            <div class="flex size-20 items-center justify-center border text-center">
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
