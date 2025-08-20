<script setup lang="ts">
import { Separator  } from 'reka-ui';
import type { SeparatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = withDefaults(
    defineProps<
        SeparatorProps & { class?: HTMLAttributes['class'], label?: string }
    >(),
    {
        class: undefined,
        label: undefined,
        orientation: 'horizontal',
    },
);

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <Separator
        v-bind="delegatedProps"
        :class="[{
            [getStyle('ui.separator.outer.horizontal')]: orientation === 'horizontal',
            [getStyle('ui.separator.outer.vertical')]: orientation === 'vertical',
        }, getStyle('ui.separator.outer.base'), props.class]"
    >
        <span
            v-if="props.label"
            :class="[{
                [getStyle('ui.separator.inner.horizontal')]: orientation === 'horizontal',
                [getStyle('ui.separator.inner.vertical')]: orientation === 'vertical',
            }, getStyle('ui.separator.inner.base'), props.class]"
        >
            {{ props.label }}
        </span>
    </Separator>
</template>
