<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
const { getStyle } = usePondStyle();
</script>

<template>
    <div :class="[getStyle('ui.sheet.footer'), props.class]">
        <slot />
    </div>
</template>
