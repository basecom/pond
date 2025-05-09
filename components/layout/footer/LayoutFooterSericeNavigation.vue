<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElements?: Schemas['Category'][];
}>();
</script>

<template>
    <LayoutFooterSericeNavigationInner :navigation-elements="navigationElements" />
</template>
