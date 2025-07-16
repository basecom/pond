<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { CalendarGridRow,  useForwardProps } from 'reka-ui';
import type {CalendarGridRowProps} from 'reka-ui';
import { computed  } from 'vue';
import type {HTMLAttributes} from 'vue';

const props = defineProps<CalendarGridRowProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <CalendarGridRow :class="cn('flex', props.class)" v-bind="forwardedProps">
        <slot />
    </CalendarGridRow>
</template>
