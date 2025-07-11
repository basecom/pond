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

const getBadgeVariant = (stateMachineTechnicalName: string, paymentStateMachineTechnicalName: string) => {
    if(paymentStateMachineTechnicalName === 'failed' || paymentStateMachineTechnicalName === 'cancelled' || paymentStateMachineTechnicalName === 'reminded' || paymentStateMachineTechnicalName === 'unconfirmed') {
        return 'destructive';
    }
    if( stateMachineTechnicalName === 'completed') {
        return 'success';
    }
    if( stateMachineTechnicalName === 'cancelled') {
        return 'destructive';
    }
    return 'default';
};

const displayCompletePaymentLink = (paymentStateMachineTechnicalName: string) => paymentStateMachineTechnicalName === 'failed' || paymentStateMachineTechnicalName === 'cancelled' || paymentStateMachineTechnicalName === 'reminded' || paymentStateMachineTechnicalName === 'unconfirmed';

const { getStyle } = usePondStyle();
const outerStyles = getStyle('account.order.detail.outer');
const skeletonOuterStyles = getStyle('account.order.detail.skeleton.outer');
const skeletonInnerStyles = getStyle('account.order.detail.skeleton.inner');
const triggerStyles = getStyle('account.order.detail.trigger');
const headlineOuterStyles = getStyle('account.order.detail.headline.outer');
const headlineInnerStyles = getStyle('account.order.detail.headline.inner');
const headlineOrderNumberStyles = getStyle('account.order.detail.headline.orderNumber');
const contentStyles = getStyle('account.order.detail.content');
const paginationStyles = getStyle('account.order.detail.pagination');
const alertOuterStyles = getStyle('account.order.detail.alert.outer');
const alertIconStyles = getStyle('account.order.detail.alert.icon');
const alertTitleStyles = getStyle('account.order.detail.alert.title');
</script>

<template>
    <div :class="outerStyles">
        <slot name="headline">
            <h1>{{ $t('order.headline') }}</h1>
        </slot>
        <slot name="sub-headline">
            <h2>{{ $t('order.subHeadline') }}</h2>
        </slot>

        <template v-if="isLoading">
            <slot name="loading-skeleton">
                <div v-for="n in 10" :key="n" :class="skeletonOuterStyles">
                    <UiSkeleton :class="skeletonInnerStyles" />
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
                                    <UiAccordionTrigger :class="triggerStyles">
                                        <div :class="headlineOuterStyles">
                                            <div :class="headlineInnerStyles">
                                                {{ $t('order.orderDate') }} {{ formatLocaleDate(order?.orderDate) }}
                                                <UiBadge v-if="order && order.transactions" :variant="getBadgeVariant(order?.stateMachineState.technicalName, order?.transactions[0]?.stateMachineState?.technicalName ?? '')">
                                                    <NuxtLinkLocale
                                                        v-if="order && order.transactions && displayCompletePaymentLink(order.transactions[0]?.stateMachineState?.technicalName ?? '')"
                                                        to="/"
                                                    >
                                                        {{ $t('payment.completePayment') }}
                                                    </NuxtLinkLocale>

                                                    <span v-else>
                                                        {{ order?.stateMachineState.name }}
                                                    </span>
                                                </UiBadge>
                                            </div>

                                            <span :class="headlineOrderNumberStyles">
                                                {{ $t('order.orderNumber') }} {{ order?.orderNumber }}
                                            </span>
                                        </div>
                                    </UiAccordionTrigger>
                                </slot>

                                <slot name="account-order-details-content">
                                    <UiAccordionContent :class="contentStyles">
                                        <AccountPageOrderDetails :order-id="order?.id" />
                                    </UiAccordionContent>
                                </slot>
                            </UiAccordionItem>
                        </UiAccordion>
                    </div>
                </slot>

                <slot name="pagination">
                    <div :class="paginationStyles">
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
                    <UiAlert :class="alertOuterStyles">
                        <Icon name="mdi:alert-circle-outline" :class="alertIconStyles" />
                        <UiAlertTitle :class="alertTitleStyles"> {{ $t('order.noOrders') }} </UiAlertTitle>
                    </UiAlert>
                </slot>
            </template>
        </template>
    </div>
</template>
