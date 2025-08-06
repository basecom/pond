<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    
    
    DialogOverlay,
    DialogPortal,
    useForwardPropsEmits,
} from 'reka-ui';
import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
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
        <DialogOverlay :class="getStyle('ui.dialog.scroll.overlay')">
            <DialogContent
                :class="[getStyle('ui.dialog.scroll.content'), props.class]"
                v-bind="forwarded"
                @pointer-down-outside="(event) => {
                    const originalEvent = event.detail.originalEvent;
                    const target = originalEvent.target as HTMLElement;
                    if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
                        event.preventDefault();
                    }
                }"
            >
                <slot />

                <DialogClose :class="getStyle('ui.dialog.scroll.icon')">
                    <Icon name="mdi:close" :class="getStyle('ui.accordion.trigger.icon')" />

                    <span class="sr-only">
                        {{ $t('general.close') }}
                    </span>
                </DialogClose>
            </DialogContent>
        </DialogOverlay>
    </DialogPortal>
</template>
