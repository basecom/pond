<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'reka-ui';

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(), {
    as: 'a',
    class: undefined,
});

const { getStyle } = usePondStyle();
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="[getStyle('ui.breadcrumb.link'), props.class]"
    >
        <slot />
    </Primitive>
</template>
