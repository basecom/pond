<script setup lang="ts">
import {
    PopoverContent,
    
    
    PopoverPortal,
    useForwardPropsEmits,
} from 'reka-ui';
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<PopoverContentProps & { class?: HTMLAttributes['class'] }>(),
    {
        align: 'center',
        sideOffset: 4,
        class: '',
    },
);
const emits = defineEmits<PopoverContentEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <PopoverPortal>
        <PopoverContent
            v-bind="{ ...forwarded, ...$attrs }"
            :class="[getStyle('ui.popover.content'), props.class]"
        >
            <slot />
        </PopoverContent>
    </PopoverPortal>
</template>
