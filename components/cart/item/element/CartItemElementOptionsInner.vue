<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      cartItemOptions?: Schemas['LineItem']['payload']['options']
    }>(),
    {
        cartItemOptions: undefined,
    },
);
</script>
<template>
    <slot name="cartItem-options">
        <template  v-if="cartItemOptions && cartItemOptions.length > 0">
            <span v-for="(property, index) in cartItemOptions" :key="`${property.group}-${property.option}`">
                <slot name="cartItemOptionContent">
                    {{ property.group }}: <span class="font-bold">{{ property.option }}</span>
                    <template v-if="index + 1 < cartItemOptions.length"> | </template>
                </slot>
            </span>
        </template>
    </slot>
</template>
