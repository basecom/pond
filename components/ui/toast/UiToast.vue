<script setup lang="ts">
import { ToastRoot, type ToastRootEmits, type ToastRootProps, useForwardPropsEmits } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

export interface ToastProps extends ToastRootProps {
    class?: HTMLAttributes['class']
    variant?: 'default'|'destructive'
    onOpenChange?: ((value: boolean) => void) | undefined
}

const props = withDefaults(
    defineProps<ToastProps>(),
    {
        variant: 'default',
        class: '',
        onOpenChange: undefined,
    },
);

const emits = defineEmits<ToastRootEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <ToastRoot
        v-bind="forwarded"
        :class="[{
            [getStyle('ui.toast.base.variants.default')]: variant === 'default',
            [getStyle('ui.toast.base.variants.destructive')]: variant === 'destructive'
        }, getStyle('ui.toast.base'), props.class]"
        @update:open="onOpenChange"
    >
        <slot />
    </ToastRoot>
</template>
