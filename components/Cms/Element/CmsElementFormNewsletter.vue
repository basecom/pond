<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { NewsletterForm } from '~/types/form/NewsletterForm';

const props = defineProps<{
    element: CmsElementForm;
}>();

const config = useCmsElementConfig(props.element);
const title = config.getConfigValue('title');

const { getCmsElementData } = useCmsUtils();
const elementData = getCmsElementData(props.element);
const { entityArrayToOptions } = useFormkitHelper();
const salutationOptions = computed(
    () => entityArrayToOptions<Schemas['Salutation']>(elementData, 'displayName', true) ?? [],
);

const { t } = useI18n();

const { isNewsletterSubscriber, newsletterSubscribe, newsletterUnsubscribe, getNewsletterStatus, confirmationNeeded } =
    useNewsletter();
const { pushSuccess, pushError } = useNotifications();
const { trackNewsletterRegistration } = useAnalytics();

const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);

const isSubscriber = ref(false);
const customerMail = ref('');

if (customer.value) {
    customerMail.value = customer.value.email;

    await getNewsletterStatus();

    if (isNewsletterSubscriber.value && !confirmationNeeded.value) {
        isSubscriber.value = true;
    }
}

// Store-API provides two options: direct and subscribe
// direct: The subscription is directly active and does not need a confirmation.
// subscribe: An email will be sent to the provided email address containing a link to the /newsletter/confirm route.
const configStore = useConfigStore();
const doubleOptIn = configStore.get('core.newsletter.doubleOptIn');
const doubleOptInRegistered = configStore.get('core.newsletter.doubleOptInRegistered');
const subscribeBehavior =
    (customer.value && doubleOptInRegistered) || (!customer.value && doubleOptIn) ? 'subscribe' : 'direct';

const handleNewsletterSubmit = async (newsletterValues: NewsletterForm) => {
    if (newsletterAction.value === t('cms.element.form.newsletter.subscribe')) {
        try {
            await newsletterSubscribe({
                email: newsletterValues.email,
                option: subscribeBehavior,
                salutationId: newsletterValues.salutationId,
                firstName: newsletterValues.firstName,
                lastName: newsletterValues.lastName,
            });

            trackNewsletterRegistration();

            pushSuccess(
                subscribeBehavior === 'direct'
                    ? t('cms.element.form.newsletter.successSubscribe')
                    : t('cms.element.form.newsletter.successConfirmSubscribe'),
            );

            if (subscribeBehavior === 'direct') {
                isSubscriber.value = true;
                newsletterAction.value = t('cms.element.form.newsletter.unsubscribe');
            }
        } catch (error) {
            pushError(t('cms.element.form.newsletter.errorSubscribe'));
        }
    } else if (newsletterAction.value === t('cms.element.form.newsletter.unsubscribe')) {
        try {
            await newsletterUnsubscribe(newsletterValues.email);
            isSubscriber.value = false;
            newsletterAction.value = t('cms.element.form.newsletter.subscribe');

            pushSuccess(t('cms.element.form.newsletter.successUnsubscribe'));
        } catch (error) {
            pushError(t('cms.element.form.newsletter.errorUnsubscribe'));
        }
    }
};

const newsletterAction = ref(
    isSubscriber.value ? t('cms.element.form.newsletter.unsubscribe') : t('cms.element.form.newsletter.subscribe'),
);

const newsletterOptions = [t('cms.element.form.newsletter.subscribe'), t('cms.element.form.newsletter.unsubscribe')];

// Update values when customer logs in / out while on the same page as this component
watch(customer, async newCustomer => {
    if (newCustomer) {
        await getNewsletterStatus();

        if (isNewsletterSubscriber.value && !confirmationNeeded.value) {
            isSubscriber.value = true;
            newsletterAction.value = t('cms.element.form.newsletter.unsubscribe');
        }

        customerMail.value = newCustomer.email;
    } else {
        isSubscriber.value = false;
        newsletterAction.value = t('cms.element.form.newsletter.subscribe');
        customerMail.value = '';
    }
});
</script>

<template>
    <h3 class="border-b border-gray pb-2 font-bold">
        {{ title }}
    </h3>

    <div
        v-if="isSubscriber"
        class="py-2"
    >
        {{ $t('cms.element.form.newsletter.alreadySubscriber') }}
        <br>
        {{ $t('cms.element.form.newsletter.unsubscribeInfo') }}
    </div>

    <FormKit
        :id="`newsletterForm-${element.id}`"
        :name="`newsletterForm-${element.id}`"
        type="form"
        :actions="false"
        :classes="{
            form: 'grid-cols-3 grid gap-4 mt-4',
        }"
        @submit="handleNewsletterSubmit"
    >
        <FormKit
            v-if="!isSubscriber"
            :id="`newsletterRadioButton-${element.id}`"
            v-model="newsletterAction"
            :name="`newsletterRadioButton-${element.id}`"
            type="radio"
            :options="newsletterOptions"
            validation="required"
        />

        <FormKit
            :id="`newsletterEmail-${element.id}`"
            v-model="customerMail"
            type="email"
            :label="$t('account.login.email.label')"
            :name="`newsletterEmail-${element.id}`"
            :placeholder="$t('account.login.email.placeholder')"
            validation="required"
            :classes="{
                outer: 'col-span-3',
            }"
        />

        <template v-if="newsletterAction === $t('cms.element.form.newsletter.subscribe')">
            <FormKit
                :id="`newsletterSalutationId-${element.id}`"
                type="select"
                :name="`newsletterSalutationId-${element.id}`"
                :placeholder="$t('account.register.salutation.placeholder')"
                :options="salutationOptions"
                :classes="{
                    outer: 'col-span-1',
                }"
            />

            <FormKit
                :id="`newsletterFirstName-${element.id}`"
                type="text"
                :label="$t('account.register.firstname.label')"
                :name="`newsletterFirstName-${element.id}`"
                :placeholder="$t('account.register.firstname.placeholder')"
                :classes="{
                    outer: 'col-span-1',
                }"
            />

            <FormKit
                :id="`newsletterLastName-${element.id}`"
                type="text"
                :label="$t('account.register.lastname.label')"
                :name="`newsletterLastName-${element.id}`"
                :placeholder="$t('account.register.lastname.placeholder')"
                :classes="{
                    outer: 'col-span-1',
                }"
            />
        </template>

        <FormKit
            :id="`newsletterPrivacy-${element.id}`"
            type="checkbox"
            :label="$t('cms.element.form.newsletter.privacy.label')"
            :help="$t('cms.element.form.newsletter.privacy.help')"
            :name="`newsletterPrivacy-${element.id}`"
            decorator-icon="check"
            validation="accepted"
            validation-visibility="submit"
            :classes="{
                outer: 'col-span-3',
            }"
        />

        <FormKit
            :id="`newsletterSubmitButton-${element.id}`"
            type="submit"
            :label="newsletterAction"
            :classes="{
                outer: 'col-span-3 md:col-span-2',
            }"
            :name="`newsletterSubmitButton-${element.id}`"
            prefix-icon="envelope"
            :title="newsletterAction"
        />
    </FormKit>
</template>
