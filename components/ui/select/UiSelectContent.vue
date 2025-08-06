<script setup lang="ts">
import {
    SelectContent,
    
    
    SelectPortal,
    SelectViewport,
    useForwardPropsEmits,
} from 'reka-ui';
import type { SelectContentEmits, SelectContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>(),
    {
        position: 'popper',
        class: '',
    },
);
const emits = defineEmits<SelectContentEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <SelectPortal>
        <SelectContent
            v-bind="{ ...forwarded, ...$attrs }"
            :class="[{
                [getStyle('ui.select.content.outerPopperPosition')]: position === 'popper'
            }, getStyle('ui.select.content.outer'), props.class]"
        >
            <UiSelectScrollUpButton />

            <SelectViewport
                :class="[{
                    [getStyle('ui.select.content.viewportPopperPosition')]: position === 'popper'
                }, getStyle('ui.select.content.viewport')]"
            >
                <slot />
            </SelectViewport>

            <UiSelectScrollDownButton />
        </SelectContent>
    </SelectPortal>
</template>
