<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    type DialogContentEmits,
    type DialogContentProps,
    DialogOverlay,
    DialogPortal,
    useForwardPropsEmits,
} from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DialogContentEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <DialogPortal>
        <DialogOverlay :class="getStyle('ui.dialog.overlay')" />

        <DialogContent
            v-bind="forwarded"
            :class="[getStyle('ui.dialog.content'), props.class]"
            aria-describedby="dialog-description"
        >
            <slot />

            <DialogClose :class="getStyle('ui.dialog.close.outer')">
                <Icon name="mdi:close" :class="getStyle('ui.dialog.close.icon')" />

                <span class="sr-only">
                    {{ $t('general.close') }}
                </span>
            </DialogClose>
        </DialogContent>
    </DialogPortal>
</template>
