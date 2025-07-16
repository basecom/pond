<script setup lang="ts">
import { SelectGroup, type SelectGroupProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<SelectGroupProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <SelectGroup :class="[getStyle('ui.select.group'), props.class]" v-bind="delegatedProps">
        <slot />
    </SelectGroup>
</template>
