<script setup lang="ts">
import {
    AccordionRoot,
    
    
    useForwardPropsEmits,
} from 'reka-ui';
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui';

const props = defineProps<AccordionRootProps>();
const emits = defineEmits<AccordionRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <AccordionRoot v-bind="forwarded">
        <slot />
    </AccordionRoot>
</template>
