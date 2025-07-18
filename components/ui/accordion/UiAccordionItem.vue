<script setup lang="ts">
import { AccordionItem,  useForwardProps } from 'reka-ui';
import type { AccordionItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <AccordionItem
        v-bind="forwardedProps"
        :class="[getStyle('ui.accordion.item'), props.class]"
    >
        <slot />
    </AccordionItem>
</template>
