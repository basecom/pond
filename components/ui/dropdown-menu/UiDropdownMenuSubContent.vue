<script setup lang="ts">
import {
    DropdownMenuSubContent,
    
    
    useForwardPropsEmits,
} from 'reka-ui';
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuSubContentEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <DropdownMenuSubContent
        v-bind="forwarded"
        :class="[getStyle('ui.dropdown.subContent'), props.class]"
    >
        <slot />
    </DropdownMenuSubContent>
</template>
