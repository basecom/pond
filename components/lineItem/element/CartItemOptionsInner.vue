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
    <span v-for="(property, index) in cartItemOptions">
        {{ property.group }}: <span class="font-bold">{{ property.option }}</span>
        <template v-if="index+1 < cartItemOptions.length"> | </template>
    </span>
</template>
