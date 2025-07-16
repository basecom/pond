<script setup lang="ts">
import {
    DropdownMenuItemIndicator,
    DropdownMenuRadioItem,
    type DropdownMenuRadioItemEmits,
    type DropdownMenuRadioItemProps,
    useForwardPropsEmits,
} from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }>();

const emits = defineEmits<DropdownMenuRadioItemEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <DropdownMenuRadioItem
        v-bind="forwarded"
        :class="[getStyle('ui.dropdown.radio.outer'), props.class]"
    >
        <span :class="getStyle('ui.dropdown.radio.inner')">
            <DropdownMenuItemIndicator>
                <Icon name="mdi:circle" :class="getStyle('ui.dropdown.radio.icon')" />
            </DropdownMenuItemIndicator>
        </span>
        <slot />
    </DropdownMenuRadioItem>
</template>
