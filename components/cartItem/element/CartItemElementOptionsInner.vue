<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItemOptions?: Schemas['LineItem']['payload']['options']
    }>(),
    {
        cartItemOptions: undefined,
    },
);
</script>
<template>
    <slot name="cartItemOptions">
        <span v-for="(property, index) in cartItemOptions">
            <slot name="cartItemOptionContent">
                {{ property.group }}: <span class="font-bold">{{ property.option }}</span>
                <template v-if="index+1 < cartItemOptions.length"> | </template>
            </slot>
        </span>
    </slot>
</template>
