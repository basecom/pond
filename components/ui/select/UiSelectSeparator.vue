<script setup lang="ts">
import { cn } from '@/lib/utils';
import { SelectSeparator  } from 'reka-ui';
import type {SelectSeparatorProps} from 'reka-ui';
import { computed  } from 'vue';
import type {HTMLAttributes} from 'vue';

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <SelectSeparator v-bind="delegatedProps" :class="cn('-mx-1 my-1 h-px bg-gray-100', props.class)" />
</template>
