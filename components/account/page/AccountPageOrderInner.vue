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
const { getStyle } = usePondStyle();

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
</script>

<template>
    <div :class="getStyle('account.order.detail.outer')">
        <slot name="headline">
            <h1>{{ $t('account.ordersTitle') }}</h1>
        </slot>
        <slot name="sub-headline">
            <h2>{{ $t('account.ordersWelcome') }}</h2>
        </slot>

        <template v-if="isLoading">
            <slot name="loading-skeleton">
                <div
                    v-for="n in 10"
                    :key="n"
                    :class="getStyle('account.order.detail.skeleton.outer')"
                >
                    <UiSkeleton :class="getStyle('account.order.detail.skeleton.inner')" />
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
                                    <UiAccordionTrigger :class="getStyle('account.order.detail.trigger')">
                                        <div :class="getStyle('account.order.detail.headline.outer')">
                                            <div :class="getStyle('account.order.detail.headline.inner')">
                                                {{ $t('account.orderItemDate') }} {{ formatLocaleDate(order?.orderDate) }}
                                                <UiBadge
                                                    v-if="order && order.transactions"
                                                    :variant="getBadgeVariant(
                                                        order?.stateMachineState.technicalName,
                                                        order?.transactions[0]?.stateMachineState?.technicalName ?? ''
                                                    )"
                                                >
                                                    <NuxtLinkLocale
                                                        v-if="order && order.transactions && order.stateMachineState.technicalName !== 'cancelled' && displayCompletePaymentLink(order.transactions[0]?.stateMachineState?.technicalName ?? '')"
                                                        to="/"
                                                    >
                                                        {{ $t('account.orderStatusActionCompletePayment') }}
                                                    </NuxtLinkLocale>

                                                    <span v-else>
                                                        {{ order?.stateMachineState.name }}
                                                    </span>
                                                </UiBadge>
                                            </div>

                                            <span :class="getStyle('account.order.detail.headline.orderNumber')">
                                                {{ $t('account.orderNumber') }} {{ order?.orderNumber }}
                                            </span>
                                        </div>
                                    </UiAccordionTrigger>
                                </slot>

                                <slot name="account-order-details-content">
                                    <UiAccordionContent :class="getStyle('account.order.detail.content')">
                                        <AccountPageOrderDetails :order-id="order?.id" />
                                    </UiAccordionContent>
                                </slot>
                            </UiAccordionItem>
                        </UiAccordion>
                    </div>
                </slot>

                <slot name="pagination">
                    <div :class="getStyle('account.order.detail.pagination')">
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
                    <UiAlert :class="getStyle('account.order.detail.alert.outer')">
                        <Icon name="mdi:alert-circle-outline" :class="getStyle('account.order.detail.alert.icon')" />
                        <UiAlertTitle :class="getStyle('account.order.detail.alert.title')">
                            {{ $t('account.ordersInfoEmpty') }}
                        </UiAlertTitle>
                    </UiAlert>
                </slot>
            </template>
        </template>
    </div>
</template>
