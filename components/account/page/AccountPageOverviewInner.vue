<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { NewsletterFormData } from '~/types/vueForm/Newsletter';
import type { Vueform } from '@vueform/vueform';

const props = defineProps<{
  customer: Schemas['Customer'];
}>();

const { getStyle } = usePondStyle();
const configStore = useConfigStore();

const { getNewsletterStatus, newsletterSubscribe, newsletterUnsubscribe } = useNewsletter();
const { handleError } = usePondHandleError();
const { toast } = usePondToast();
const { t } = useI18n();

const showTitle = configStore.get('core.loginRegistration.showTitleField') as boolean;
const showAdditionalAddressField1 = configStore.get('core.loginRegistration.showAdditionalAddressField1') as boolean;
const showAdditionalAddressField2 = configStore.get('core.loginRegistration.showAdditionalAddressField2') as boolean;
const form$: Ref<null | Vueform> = ref(null);
const newsletterStatus: Ref<undefined | Schemas['AccountNewsletterRecipient']> = ref(undefined);
const displayDoubleNewsletterRegistrationAlert = ref(false);

onMounted(async () => {
    try {
        // fetch the newsletter status and update the checkbox
        newsletterStatus.value = await getNewsletterStatus();
        if (newsletterStatus.value?.status === 'direct' || newsletterStatus.value?.status === 'optIn' || newsletterStatus.value?.status === 'notSet') {
            // updates form data
            form$.value?.update({
                newsletter: true,
            });
        }

        // depending on the newsletter status, the info alert for double registration is displayed
        if ( newsletterStatus.value?.status === 'notSet') {
            displayDoubleNewsletterRegistrationAlert.value = true;
        }
    } catch (error) {
        handleError(error);
    }
});

const onChange = async (formData: NewsletterFormData) => {
    // Unsubscribe, if checkbox value is unchecked
    if (!formData.newsletter) {
        try {
            await newsletterUnsubscribe(props.customer.email);
            toast({
                title: t('newsletter.unsubscribed'),
            });
            // alert is no longer displayed
            displayDoubleNewsletterRegistrationAlert.value = false;
            newsletterStatus.value = await getNewsletterStatus();
        } catch (error) {
            toast({
                title: t('general.errorHeadline'),
                description: t('general.errorMessage'),
            });
            handleError(error);
        }
        return;
    }

    // Otherwise, subscribe to newsletter (only if not already subscribed to the newsletter)
    if (newsletterStatus.value?.status !== 'direct' && newsletterStatus.value?.status !== 'optIn' && newsletterStatus.value?.status !== 'notSet') {
        try {
            await newsletterSubscribe({ email: props.customer.email, option: 'subscribe' });
            toast({
                title: t('newsletter.subscribed.headline'),
            });

            // Depending on the newsletter status, the alert display is set
            newsletterStatus.value = await getNewsletterStatus();
            if (newsletterStatus.value?.status === 'notSet') {
                displayDoubleNewsletterRegistrationAlert.value = true;
                return;
            }

            displayDoubleNewsletterRegistrationAlert.value = false;
        } catch (error) {
            toast({
                title: t('general.errorHeadline'),
                description: t('general.errorMessage'),
            });
            handleError(error);
        }
    }
};
</script>

<template>
    <slot name="introduction">
        <h1>{{ $t('account.account') }}</h1>
        <p :class="getStyle('account.pageDescription')">{{ $t('account.overview.description') }}</p>
    </slot>

    <div :class="getStyle('account.personalData.outer')">
        <!-- personal data -->
        <slot name="personal-data">
            <div>
                <slot name="personal-data-headline">
                    <h3 :class="getStyle('account.personalData.headline')">
                        {{ $t('account.overview.personalData') }}
                    </h3>
                </slot>

                <slot name="personal-data-content">
                    <div :class="getStyle('account.personalData.general.outer')">
                        <span
                            v-if="customer.salutation"
                            :class="getStyle('account.personalData.general.label')"
                        >
                            {{ $t('account.customer.salutation.label') }}
                        </span>
                        <span>{{ customer.salutation?.displayName }}</span>

                        <template v-if="showTitle && customer.title">
                            <span :class="getStyle('account.personalData.general.label')">
                                {{ $t('account.customer.title.label') }}
                            </span>
                            <span>{{ customer.title }}</span>
                        </template>

                        <span :class="getStyle('account.personalData.general.label')">
                            {{ $t('account.customer.name') }}
                        </span>
                        <span>{{ customer.firstName }} {{ customer.lastName }}</span>

                        <span :class="getStyle('account.personalData.general.label')">
                            {{ $t('account.customer.email.label') }}
                        </span>
                        <span>{{ customer.email }}</span>

                        <template v-if="customer.accountType === 'business'">
                            <span :class="getStyle('account.personalData.general.label')">
                                {{ $t('account.customer.company.label') }}
                            </span>
                            <span>{{ customer.company }}</span>

                            <span :class="getStyle('account.personalData.general.label')">
                                {{ $t('account.customer.vatId.label') }}
                            </span>
                            <span>{{ customer.vatIds?.join(', ') }}</span>
                        </template>
                    </div>
                </slot>
            </div>
        </slot>

        <!-- default payment method -->
        <slot name="payment-method">
            <div>
                <slot name="payment-method-headline">
                    <h3 :class="getStyle('account.personalData.headline')">
                        {{ $t('account.overview.defaultPaymentMethod') }}
                    </h3>
                </slot>

                <slot name="payment-method-content">
                    <b>{{ customer.defaultPaymentMethod?.translated.name }}</b>
                    <p :class="getStyle('account.personalData.paymentMethod.description')">
                        {{ customer.defaultPaymentMethod?.translated.description }}
                    </p>
                </slot>
            </div>
        </slot>

        <!-- newsletter subscription -->
        <slot name="newsletter">
            <div :class="getStyle('account.newsletter.wrapper')">
                <slot name="newsletter-headline">
                    <h3 :class="getStyle('account.newsletter.headline')">
                        {{ $t('newsletter.headline') }}
                    </h3>
                </slot>

                <slot name="newsletter-double-registration">
                    <UiAlert v-if="displayDoubleNewsletterRegistrationAlert" :class="getStyle('account.newsletter.alert.outer')">
                        <slot name="alert-icon">
                            <Icon name="mdi:info" :class="getStyle('account.newsletter.alert.icon')" />
                        </slot>

                        <slot name="alert-content">
                            <div>
                                <UiAlertTitle>{{ $t('newsletter.subscribed.headline') }}</UiAlertTitle>
                                <UiAlertDescription>
                                    {{ $t('newsletter.subscribed.message') }}
                                </UiAlertDescription>
                            </div>
                        </slot>
                    </UiAlert>
                </slot>

                <slot name="newsletter-content">
                    <Vueform ref="form$" @change="(data: NewsletterFormData) => onChange(data)">
                        <FormCheckboxElement
                            id="newsletter"
                            name="newsletter"
                        >
                            <template #checkbox-element-content>
                                {{ $t('newsletter.subscribeToNewsletterLabel') }}
                            </template>
                        </FormCheckboxElement>
                    </Vueform>
                </slot>
            </div>
        </slot>

        <!-- default billing address -->
        <slot name="billing-address">
            <div v-if="customer.defaultBillingAddress">
                <slot name="billing-address-headline">
                    <h3 :class="getStyle('account.personalData.headline')">
                        {{ $t('account.overview.defaultBillingAddress') }}
                    </h3>
                </slot>

                <slot name="billing-address-content">
                    <div :class="getStyle('account.personalData.formPadding')">
                        <p
                            v-if="customer.accountType === 'business' && (customer.defaultBillingAddress.company || customer.defaultBillingAddress.department)"
                            class="font-bold"
                        >
                            {{ customer.defaultBillingAddress.company }}
                            <template v-if="customer.defaultBillingAddress.department">
                                - {{ customer.defaultBillingAddress.department }}
                            </template>
                        </p>
                        <p>{{ customer.defaultBillingAddress.firstName }} {{ customer.defaultBillingAddress.lastName }}</p>
                        <p>{{ customer.defaultBillingAddress.street }}</p>
                        <p v-if="showAdditionalAddressField1 && customer.defaultBillingAddress.additionalAddressLine1">
                            {{ customer.defaultBillingAddress.additionalAddressLine1 }}
                        </p>
                        <p v-if="showAdditionalAddressField2 && customer.defaultBillingAddress.additionalAddressLine2">
                            {{ customer.defaultBillingAddress.additionalAddressLine2 }}
                        </p>
                        <p>{{ customer.defaultBillingAddress.zipcode }} {{ customer.defaultBillingAddress.city }}</p>
                        <p>
                            <template v-if="customer.defaultBillingAddress.countryState">
                                {{ customer.defaultBillingAddress.countryState.name }},
                            </template>
                            {{ customer.defaultBillingAddress.country?.name }}
                        </p>
                    </div>
                </slot>
            </div>
        </slot>

        <!-- default shipping address -->
        <slot name="shipping-address">
            <div v-if="customer.defaultShippingAddress">
                <slot name="shipping-address-headline">
                    <h3 :class="getStyle('account.personalData.headline')">
                        {{ $t('account.overview.defaultShippingAddress') }}
                    </h3>
                </slot>

                <slot name="shipping-address-content">
                    <div :class="getStyle('account.personalData.formPadding')">
                        <template v-if="customer.defaultBillingAddressId === customer.defaultShippingAddressId">
                            <slot name="shipping-address-identical">
                                {{ $t('account.overview.addressesIdentical') }}
                            </slot>
                        </template>

                        <template v-else>
                            <slot name="shipping-address-not-identical">
                                <p
                                    v-if="customer.accountType === 'business' && (customer.defaultShippingAddress.company || customer.defaultShippingAddress.department)"
                                    class="font-bold"
                                >
                                    {{ customer.defaultShippingAddress.company }}
                                    <template v-if="customer.defaultShippingAddress.department">
                                        - {{ customer.defaultShippingAddress.department }}
                                    </template>
                                </p>
                                <p>{{ customer.defaultShippingAddress.firstName }} {{ customer.defaultShippingAddress.lastName }}</p>
                                <p>{{ customer.defaultShippingAddress.street }}</p>
                                <p v-if="showAdditionalAddressField1 && customer.defaultShippingAddress.additionalAddressLine1">
                                    {{ customer.defaultShippingAddress.additionalAddressLine1 }}
                                </p>
                                <p v-if="showAdditionalAddressField2 && customer.defaultShippingAddress.additionalAddressLine2">
                                    {{ customer.defaultShippingAddress.additionalAddressLine2 }}
                                </p>
                                <p>{{ customer.defaultShippingAddress.zipcode }} {{ customer.defaultShippingAddress.city }}</p>
                                <p>
                                    <template v-if="customer.defaultShippingAddress.countryState">
                                        {{ customer.defaultShippingAddress.countryState.name }},
                                    </template>
                                    {{ customer.defaultShippingAddress.country?.name }}
                                </p>
                            </slot>
                        </template>
                    </div>
                </slot>
            </div>
        </slot>
    </div>
</template>
