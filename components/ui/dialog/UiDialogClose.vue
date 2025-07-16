<script setup lang="ts">
import { DialogClose  } from 'reka-ui';
import type {DialogCloseProps} from 'reka-ui';

const props = defineProps<DialogCloseProps>();

const { getStyle } = usePondStyle();
</script>

<template>
    <DialogClose v-bind="props" :class="getStyle('ui.dialog.close.pointer')">
        <slot />
    </DialogClose>
</template>
