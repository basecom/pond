<script setup lang="ts">
import {
    DropdownMenuCheckboxItem,
    
    
    DropdownMenuItemIndicator,
    useForwardPropsEmits,
} from 'reka-ui';
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <DropdownMenuCheckboxItem
        v-bind="forwarded"
        :class="[getStyle('ui.dropdown.item.outer'), props.class]"
    >
        <span :class="getStyle('ui.dropdown.item.inner')">
            <DropdownMenuItemIndicator>
                <Icon name="mdi:check" :class="getStyle('ui.dropdown.item.icon')" />
            </DropdownMenuItemIndicator>
        </span>
        <slot />
    </DropdownMenuCheckboxItem>
</template>
