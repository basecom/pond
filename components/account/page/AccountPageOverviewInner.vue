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
                title: t('newsletter.subscriptionRevokeSuccess'),
            });
            // alert is no longer displayed
            displayDoubleNewsletterRegistrationAlert.value = false;
        } catch (error) {
            // When an error occurs, the checkbox is unset
            form$.value?.update({
                newsletter: false,
            });
            toast({
                title: t('error.message-default'),
                variant: 'destructive',
            });
            handleError(error);
        } finally {
            newsletterStatus.value = await getNewsletterStatus();
        }
        return;
    }

    // Otherwise, subscribe to newsletter (only if not already subscribed to the newsletter)
    if (newsletterStatus.value?.status !== 'direct' && newsletterStatus.value?.status !== 'optIn' && newsletterStatus.value?.status !== 'notSet') {
        try {
            await newsletterSubscribe({
                option: 'subscribe',
                email: props.customer.email,
                firstName: props.customer.firstName,
                lastName: props.customer.lastName,
                salutation: props.customer.salutationId,
                title: props.customer.title,
                street: props.customer.defaultBillingAddress?.street,
                zipCode: props.customer.defaultBillingAddress?.zipcode,
                city: props.customer.defaultBillingAddress?.city,
            });
            toast({
                title: t('newsletter.subscriptionConfirmationSuccess'),
            });

            // Depending on the newsletter status, the alert display is set
            newsletterStatus.value = await getNewsletterStatus();
            if (newsletterStatus.value?.status === 'notSet') {
                displayDoubleNewsletterRegistrationAlert.value = true;
                return;
            }

            displayDoubleNewsletterRegistrationAlert.value = false;
        } catch (error) {
            // When an error occurs, the checkbox is unset
            form$.value?.update({
                newsletter: false,
            });
            toast({
                title: t('error.message-default'),
                description: t('newsletter.subscriptionConfirmationFailed'),
                variant: 'destructive',
            });
            handleError(error);
        } finally {
            newsletterStatus.value = await getNewsletterStatus();
        }
    }
};
</script>

<template>
    <slot name="introduction">
        <h1>{{ $t('account.overviewTitle') }}</h1>
        <p :class="getStyle('account.pageDescription')">{{ $t('account.overviewInfo') }}</p>
    </slot>

    <div :class="getStyle('account.personalData.outer')">
        <!-- personal data -->
        <slot name="personal-data">
            <div>
                <slot name="personal-data-headline">
                    <h3 :class="getStyle('account.personalData.headline')">
                        {{ $t('account.profilePersonalTitle') }}
                    </h3>
                </slot>

                <slot name="personal-data-content">
                    <div :class="getStyle('account.personalData.general.outer')">
                        <span
                            v-if="customer.salutation"
                            :class="getStyle('account.personalData.general.label')"
                        >
                            {{ $t('account.personalSalutationLabel') }}
                        </span>
                        <span>{{ customer.salutation?.displayName }}</span>

                        <template v-if="showTitle && customer.title">
                            <span :class="getStyle('account.personalData.general.label')">
                                {{ $t('account.personalTitleLabel') }}
                            </span>
                            <span>{{ customer.title }}</span>
                        </template>

                        <span :class="getStyle('account.personalData.general.label')">
                            {{ $t('account.personalNameLabel') }}
                        </span>
                        <span>{{ customer.firstName }} {{ customer.lastName }}</span>

                        <span :class="getStyle('account.personalData.general.label')">
                            {{ $t('account.profileMailTitle') }}
                        </span>
                        <span>{{ customer.email }}</span>

                        <template v-if="customer.accountType === 'business'">
                            <span :class="getStyle('account.personalData.general.label')">
                                {{ $t('address.companyNameLabel') }}
                            </span>
                            <span>{{ customer.company }}</span>

                            <span :class="getStyle('account.personalData.general.label')">
                                {{ $t('address.companyVatLabel') }}
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
                        {{ $t('account.overviewPaymentHeader') }}
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
            <div :class="getStyle('account.newsletter.outer')">
                <slot name="newsletter-headline">
                    <h3 :class="getStyle('account.newsletter.headline')">
                        {{ $t('account.newsletterTitle') }}
                    </h3>
                </slot>

                <slot name="newsletter-double-registration">
                    <UiAlert v-if="displayDoubleNewsletterRegistrationAlert" :class="getStyle('account.newsletter.alert.outer')">
                        <slot name="alert-icon">
                            <Icon name="mdi:info" :class="getStyle('account.newsletter.alert.icon')" />
                        </slot>

                        <slot name="alert-content">
                            <div>
                                <UiAlertTitle>{{ $t('account.registerAdvantage4') }}</UiAlertTitle>
                                <UiAlertDescription>
                                    {{ $t('newsletter.subscriptionPersistedSuccess') }}
                                </UiAlertDescription>
                            </div>
                        </slot>
                    </UiAlert>
                </slot>

                <slot name="newsletter-content">
                    <Vueform ref="form$" @change="(data: NewsletterFormData) => onChange(data)">
                        <UiCheckboxElement
                            id="newsletter"
                            name="newsletter"
                        >
                            <template #checkbox-element-content>
                                {{ $t('account.newsletterSettings') }}
                            </template>
                        </UiCheckboxElement>
                    </Vueform>
                </slot>
            </div>
        </slot>

        <!-- default billing address -->
        <slot name="billing-address">
            <AddressCard
                v-if="customer.defaultBillingAddress"
                :headline="$t('account.overviewBillingHeader')"
                :address="customer.defaultBillingAddress"
            />
        </slot>

        <!-- default shipping address -->
        <slot name="shipping-address">
            <AddressCard
                v-if="customer.defaultShippingAddress"
                :headline="$t('account.overviewShippingHeader')"
                :address="customer.defaultBillingAddressId !== customer.defaultShippingAddressId ? customer.defaultShippingAddress : undefined"
                :description="customer.defaultBillingAddressId === customer.defaultShippingAddressId ? $t('account.overviewAddressEqual') : undefined"
            />
        </slot>
    </div>
</template>
