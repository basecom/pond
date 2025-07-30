<script setup lang="ts">
import { DialogTitle,  useForwardProps } from 'reka-ui';
import type { DialogTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DialogTitle
        v-bind="forwardedProps"
        :class="[getStyle('ui.dialog.title'), props.class]"
    >
        <slot />
    </DialogTitle>
</template>
