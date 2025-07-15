<script setup lang="ts">
import {
    NavigationMenuTrigger,
    type NavigationMenuTriggerProps,
    useForwardProps,
} from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <NavigationMenuTrigger
        v-bind="forwardedProps"
        :class="[getStyle('ui.navigationMenu.triggerStyle'), 'group', props.class]"
    >
        <slot />

        <Icon name="mdi:chevron-down" :class="getStyle('ui.navigationMenu.trigger')" aria-hidden="true" />
    </NavigationMenuTrigger>
</template>
