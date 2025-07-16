<script setup lang="ts">
import { AccordionContent  } from 'reka-ui';
import type { AccordionContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <AccordionContent
        v-bind="delegatedProps"
        :class="getStyle('ui.accordion.content.outer')"
    >
        <div :class="[getStyle('ui.accordion.content.inner'), props.class]">
            <slot />
        </div>
    </AccordionContent>
</template>
