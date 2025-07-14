<script setup lang="ts">
import type { FieldProps } from './interface';
import { FormField } from '@/components/ui/form';
import { beautifyObjectName } from './utils';

const props = defineProps<FieldProps>();
// @ts-expect-error ui form will be deleted in another ticket
const inputComponent = computed(() => props.config?.component === 'textarea' ? UiTextarea : UiInput);
</script>

<template>
    <FormField v-slot="slotProps" :name="fieldName">
        <UiFormItem v-bind="$attrs">
            <UiAutoFormLabel v-if="!config?.hideLabel" :required="required">
                {{ config?.label || beautifyObjectName(label ?? fieldName) }}
            </UiAutoFormLabel>
            <UiFormControl>
                <slot v-bind="slotProps">
                    <component
                        :is="inputComponent"
                        type="text"
                        v-bind="{ ...slotProps.componentField, ...config?.inputProps }"
                        :disabled="config?.inputProps?.disabled ?? disabled"
                    />
                </slot>
            </UiFormControl>
            <UiFormDescription v-if="config?.description">
                {{ config.description }}
            </UiFormDescription>
            <UiFormMessage />
        </UiFormItem>
    </FormField>
</template>
