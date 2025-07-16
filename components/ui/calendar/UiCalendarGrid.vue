<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { CalendarGrid,  useForwardProps } from 'reka-ui';
import type {CalendarGridProps} from 'reka-ui';
import { computed  } from 'vue';
import type {HTMLAttributes} from 'vue';

const props = defineProps<CalendarGridProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <CalendarGrid
        :class="cn('w-full border-collapse space-y-1', props.class)"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarGrid>
</template>
