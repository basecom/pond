<script setup lang="ts">
import {
    DialogContent,
    type DialogContentEmits,
    type DialogContentProps,
    DialogOverlay,
    DialogPortal,
    useForwardPropsEmits,
} from 'reka-ui';
import type { HTMLAttributes } from 'vue';

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: 'top'|'bottom'|'left'|'right'
}

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<SheetContentProps>(),
    {
        class: undefined,
        side: 'right',
    },
);

const emits = defineEmits<DialogContentEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, side, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <DialogPortal>
        <DialogOverlay :class="getStyle('ui.sheet.overlay') " />

        <DialogContent
            :class="[getStyle('ui.sheet.base'), getStyle(`ui.sheet.variants.${side}`), props.class]"
            v-bind="{ ...forwarded, ...$attrs }"
        >
            <slot />
        </DialogContent>
    </DialogPortal>
</template>
