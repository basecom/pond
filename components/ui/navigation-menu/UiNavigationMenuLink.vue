<script setup lang="ts">
import {
    NavigationMenuLink,
    
    
    useForwardPropsEmits,
} from 'reka-ui';
import type {NavigationMenuLinkEmits, NavigationMenuLinkProps} from 'reka-ui';

const props = defineProps<NavigationMenuLinkProps>();
const emits = defineEmits<NavigationMenuLinkEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <NavigationMenuLink v-bind="forwarded">
        <slot />
    </NavigationMenuLink>
</template>
