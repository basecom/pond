<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import {toast} from '../../ui/toast';
import {ApiClientError} from '@shopware/api-client';

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
      isLoading?: boolean
    }>(),
    {
        cartItem: undefined,
        isLoading: false,
    },
);
const { cartItem } = toRefs(props);
const {removeItem} = useCartItem(cartItem);
const { t } = useI18n();
const emits = defineEmits<{
  isLoading: [boolean]
}>();
const removeCartItem = async () => {
    try {
        emits('isLoading', true);
        await removeItem();
        toast({
            description: t('checkout.removeSuccess'),
        });

    } catch (error) {
        if(error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${error.details.errors[0]?.code}`),
                variant: 'destructive',
            });
        }
    }
    emits('isLoading', false);
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
