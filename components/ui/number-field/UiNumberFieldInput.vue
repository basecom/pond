<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { NumberFieldInput } from 'reka-ui';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <NumberFieldInput
        data-slot="input"
        :class="[getStyle('ui.numberField.input'), props.class]"
    />
</template>
