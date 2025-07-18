<script setup lang="ts">
import { ToastRoot,   useForwardPropsEmits } from 'reka-ui';
import type { ToastRootEmits, ToastRootProps } from 'reka-ui';
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
            [getStyle('ui.toast.variants.default')]: variant === 'default',
            [getStyle('ui.toast.variants.destructive')]: variant === 'destructive'
        }, getStyle('ui.toast.base'), props.class]"
        @update:open="onOpenChange"
    >
        <slot />
    </ToastRoot>
</template>
