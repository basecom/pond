<script setup lang="ts">
import { DialogClose, DialogTitle, type DialogTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <DialogTitle
        :class="[getStyle('ui.sheet.title.outer'), props.class]"
        v-bind="delegatedProps"
    >
        <slot />

        <DialogClose :class="getStyle('ui.sheet.title.close')">
            <Icon name="mdi:close" :class="getStyle('ui.sheet.title.icon')" />
        </DialogClose>
    </DialogTitle>
</template>
