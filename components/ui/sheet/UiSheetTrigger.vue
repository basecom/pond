<script setup lang="ts">
import { DialogTrigger  } from 'reka-ui';
import type { DialogTriggerProps } from 'reka-ui';

const props = defineProps<DialogTriggerProps>();
const { getStyle } = usePondStyle();
</script>

<template>
    <DialogTrigger v-bind="props" :class="getStyle('ui.sheet.trigger')">
        <slot />
    </DialogTrigger>
</template>
