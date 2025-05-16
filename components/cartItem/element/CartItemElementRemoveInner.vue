<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import {toast} from '../../ui/toast';
import {ApiClientError} from '@shopware/api-client';
const emits = defineEmits<{
  removeCartItem: [];
}>();

const removeCartItem = async () => {
  emits('removeCartItem');
};
</script>
<template>
    <slot name="removeButton">
        <UiButton variant="outline" size="icon" @click="removeCartItem">
            <slot name="removeIcon">
                <Icon name="mdi-close" class="size-4" />
            </slot>
        </UiButton>
    </slot>
</template>
