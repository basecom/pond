<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItemOptions?: Schemas['LineItem']['payload']['options'];
    }>(),
    {
        cartItemOptions: undefined,
    },
);
const { getStyle } = usePondStyle();

type Option = NonNullable<Schemas['LineItem']['payload']['options']>[number];
const options = computed<Option[]>(() => props.cartItemOptions ?? []);
</script>

<template>
    <slot name="cartItem-options">
        <template v-if="options.length > 0">
            <span v-for="(property, index) in options" :key="`${property.group}_${property.option}_${index}`">
                <slot name="cartItemOptionContent" :property="property" :index="index">
                    {{ property.group }}: <span :class="getStyle('cart.propertyOption')">{{ property.option }}</span>
                    <template v-if="index + 1 < options.length"> | </template>
                </slot>
            </span>
        </template>
    </slot>
</template>
