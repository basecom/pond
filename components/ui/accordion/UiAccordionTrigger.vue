<script setup lang="ts">
import {
    AccordionHeader,
    AccordionTrigger,
    
} from 'reka-ui';
import type {AccordionTriggerProps} from 'reka-ui';
import { computed  } from 'vue';
import type {HTMLAttributes} from 'vue';

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <AccordionHeader class="flex">
        <AccordionTrigger
            v-bind="delegatedProps"
            :class="[getStyle('ui.accordion.trigger.outer'), props.class]"
        >
            <slot />

            <slot name="icon">
                <Icon name="mdi:chevron-down" :class="getStyle('ui.accordion.trigger.icon')" />
            </slot>
        </AccordionTrigger>
    </AccordionHeader>
</template>
