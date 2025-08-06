<script setup lang="ts">
import { NavigationMenuList,  useForwardProps } from 'reka-ui';
import type { NavigationMenuListProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<NavigationMenuListProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <NavigationMenuList
        v-bind="forwardedProps"
        :class="[getStyle('ui.navigationMenu.list'), props.class]"
    >
        <slot />
    </NavigationMenuList>
</template>
