<script setup lang="ts">
import { Label, type LabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <Label
        v-bind="delegatedProps"
        :class="[getStyle('ui.label'), props.class]"
    >
        <slot />
    </Label>
</template>
