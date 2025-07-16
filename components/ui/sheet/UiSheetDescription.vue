<script setup lang="ts">
import { cn } from '@/lib/utils';
import { DialogDescription  } from 'reka-ui';
import type {DialogDescriptionProps} from 'reka-ui';
import { computed  } from 'vue';
import type {HTMLAttributes} from 'vue';

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <DialogDescription
        :class="cn('text-sm text-gray-500', props.class)"
        v-bind="delegatedProps"
    >
        <slot />
    </DialogDescription>
</template>
