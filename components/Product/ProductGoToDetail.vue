<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute } from '@shopware/helpers';

defineProps<{
    product: Schemas['Product'];
}>();

const { t } = useI18n();
</script>

<template>
    <LocaleLink :to="getProductRoute(product)">
        <FormKit
            id="productGoToDetailSubmit"
            name="productGoToDetailSubmit"
            type="submit"
            :classes="{
                input: 'bg-gray hover:bg-gray-dark border-none',
            }"
        >
            {{ t('product.goToDetail.label') }}
        </FormKit>
    </LocaleLink>
</template>
