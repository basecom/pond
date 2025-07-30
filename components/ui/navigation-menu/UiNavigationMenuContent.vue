<script setup lang="ts">
import {
    NavigationMenuContent,
    
    
    useForwardPropsEmits,
} from 'reka-ui';
import type { NavigationMenuContentEmits, NavigationMenuContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<NavigationMenuContentProps & { class?: HTMLAttributes['class'] }>();

const emits = defineEmits<NavigationMenuContentEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <NavigationMenuContent
        v-bind="forwarded"
        :class="[getStyle('ui.navigationMenu.content'), props.class]"
    >
        <slot />
    </NavigationMenuContent>
</template>
