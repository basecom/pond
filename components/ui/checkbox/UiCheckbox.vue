<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<CheckboxRootEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <CheckboxRoot
        v-bind="forwarded"
        :class="[getStyle('ui.checkbox.outer'), props.class]"
    >
        <CheckboxIndicator :class="getStyle('ui.checkbox.indicator')">
            <slot>
                <Icon name="mdi:check" :class="getStyle('ui.checkbox.icon')" />
            </slot>
        </CheckboxIndicator>
    </CheckboxRoot>
</template>
