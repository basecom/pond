<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(defineProps<{
    orders?: Schemas['Order'][];
    currentPage: number;
    totalPages: number;
    isLoading?: boolean;
  }>(),
{
    orders: undefined,
    isLoading: false,
},
);

defineEmits<{
  'change-page': [page: number];
}>();

const { formatLocaleDate } = usePondDate();
</script>

<template>
    <div class="gap-2.5 flex flex-col">
        <slot name="headline">
            <h1>
                {{ $t('order.headline') }}
            </h1>
        </slot>
        <slot name="sub-headline">
            <h2>
                {{ $t('order.subHeadline') }}
            </h2>
        </slot>

        <template v-if="isLoading">
            <slot name="loading-skeleton">
                <div v-for="n in 10" :key="n" class="flex flex-col gap-5">
                    <UiSkeleton class="w-full h-30" />
                </div>
            </slot>
        </template>

        <template v-else>
            <template v-if="orders && orders?.length > 0">
                <slot name="account-orders-overview">
                    <div v-for="order in orders" :key="order?.id">
                        <UiAccordion type="single" collapsible>
                            <UiAccordionItem value="my-account-order">
                                <slot name="account-order-details-trigger">
                                    <UiAccordionTrigger class="text-lg font-bold">
                                        <div class="flex flex-col items-start w-full gap-2.5">
                                            <div class="flex items-center gap-5 text-left">
                                                {{ $t('order.orderDate') }} {{ formatLocaleDate(order?.orderDate) }}
                                                <UiBadge>
                                                    {{ order?.stateMachineState.name }}
                                                </UiBadge>
                                            </div>
                                            <span class="font-normal">
                                                {{ $t('order.orderNumber') }} {{ order?.orderNumber }}
                                            </span>
                                        </div>
                                    </UiAccordionTrigger>
                                </slot>
                                <slot name="account-order-details-content">
                                    <UiAccordionContent class="text-base">
                                        <AccountOrderDetails :order-id="order?.id" />
                                    </UiAccordionContent>
                                </slot>
                            </UiAccordionItem>
                        </UiAccordion>
                    </div>
                </slot>
                <slot name="pagination">
                    <div class="flex w-full justify-center mt-5 gap-2.5">
                        <SwPagination
                            :total="totalPages"
                            :current="currentPage"
                            @change-page="(page: number) => $emit('change-page', page)"
                        />
                    </div>
                </slot>
            </template>
            <template v-else>
                <slot name="account-no-orders">
                    <UiAlert class="flex gap-4 items-center">
                        <Icon name="mdi:alert-circle-outline" class="size-4 shrink-0" />
                        <UiAlertTitle class="mb-0"> {{ $t('order.noOrders') }} </UiAlertTitle>
                    </UiAlert>
                </slot>
            </template>
        </template>
    </div>
</template>
