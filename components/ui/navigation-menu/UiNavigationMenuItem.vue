<script setup lang="ts">
import { NavigationMenuItem  } from 'reka-ui';
import type { NavigationMenuItemProps } from 'reka-ui';

const props = defineProps<NavigationMenuItemProps>();
</script>

<template>
    <NavigationMenuItem v-bind="props">
        <slot />
    </NavigationMenuItem>
</template>
