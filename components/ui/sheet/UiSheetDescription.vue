<script setup lang="ts">
import { DialogDescription  } from 'reka-ui';
import type { DialogDescriptionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <DialogDescription
        :class="[getStyle('ui.sheet.description'), props.class]"
        v-bind="delegatedProps"
    >
        <slot />
    </DialogDescription>
</template>
