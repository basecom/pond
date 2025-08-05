<script setup lang="ts">
import {
    NavigationMenuViewport,
    
    useForwardProps,
} from 'reka-ui';
import type { NavigationMenuViewportProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<NavigationMenuViewportProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <!-- custom change: add left-(--reka-navigation-menu-viewport-left) as first class parameter -->
    <!-- https://github.com/ZTL-UwU/shadcn-docs-nuxt/issues/23 -->
    <!-- https://github.com/ZTL-UwU/shadcn-docs-nuxt/commit/bd8d9ac51172e4cd9d56c0dfef293c282a3dc2dc -->
    <div class="absolute left-auto top-full flex justify-center">
        <NavigationMenuViewport
            v-bind="forwardedProps"
            :class="[getStyle('ui.navigationMenu.viewport'), 'left-(--reka-navigation-menu-viewport-left)', props.class]"
        />
    </div>
</template>
