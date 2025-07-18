<script setup lang="ts">
import { NavigationMenuIndicator,  useForwardProps } from 'reka-ui';
import type { NavigationMenuIndicatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<NavigationMenuIndicatorProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <NavigationMenuIndicator
        v-bind="forwardedProps"
        :class="[getStyle('ui.navigationMenu.indicator.outer'), props.class]"
    >
        <div :class="getStyle('ui.navigationMenu.indicator.inner')" />
    </NavigationMenuIndicator>
</template>
