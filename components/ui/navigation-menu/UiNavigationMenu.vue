<script setup lang="ts">
import {
    NavigationMenuRoot,
    
    
    useForwardPropsEmits,
} from 'reka-ui';
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<NavigationMenuRootProps & { class?: HTMLAttributes['class'] }>();

const emits = defineEmits<NavigationMenuRootEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <NavigationMenuRoot
        v-bind="forwarded"
        :class="[getStyle('ui.navigationMenu.root'), props.class]"
    >
        <slot />
        <UiNavigationMenuViewport />
    </NavigationMenuRoot>
</template>
