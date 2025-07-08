<script setup lang="ts">
import type { VueFormRequestData, RegisterFormData, VueFormSubmitData} from '~/types/vueForm/Register';

withDefaults(
    defineProps<{
      displayVueFormErrors?: boolean;
      showRequired?: string[];
      isLoading?: boolean;
      errorMessage?: string;
    }>(),
    {
        displayVueFormErrors: false,
        showRequired: () => ['label'],
        isLoading: false,
        errorMessage: undefined,
    },
);

const emits = defineEmits<{
  register: [formData: RegisterFormData];
}>();

// Admin configs
const configStore = useConfigStore();
const isDataProtectionCheckboxRequired = ref(configStore.get('core.loginRegistration.requireDataProtectionCheckbox') as boolean);

const onSubmit = (data: VueFormRequestData) => {
    const registerData: Ref<undefined | RegisterFormData> = ref(undefined);

    // create registration object according to the store api
    registerData.value = {
        firstName: data.firstName,
        lastName: data.lastName,
        title: data.title,
        accountType: data.accountType,
        birthdayDay: data.birthdayDay,
        birthdayMonth: data.birthdayMonth,
        birthdayYear: data.birthdayYear,
        email: data.email,
        password: data.password,
        company: data.company,
        acceptedDataProtection: data.acceptedDataProtection,
        differentShippingAddress: data.differentShippingAddress,
        salutationId: data.salutation,
        billingAddress: {
            title: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            street: data.street,
            zipcode: data.zipcode,
            countryId: data.countryId,
            city: data.city,
            countryStateId: data.state,
            additionalAddressLine1: data.additionalAddressLine1,
            additionalAddressLine2: data.additionalAddressLine2,
            phoneNumber: data.phoneNumber,
            company: data.company,
            department: data.department,
            salutationId: data.salutation,
        },
    };

    // If set: VatIds must be passed to the api as an array
    if(data.vatIds && registerData.value) {
        registerData.value.vatIds = Array.isArray(data.vatIds)
            ? data.vatIds
            : [data.vatIds];
    }

    // If a different shipping address was specified
    if (data.differentShippingAddress && registerData.value) {
        // Create shipping address object according to the store api
        registerData.value.shippingAddress = {
            accountType: data.accountType,
            title: data['shipping-title'],
            firstName: data['shipping-firstName'],
            lastName: data['shipping-lastName'],
            street: data['shipping-street'],
            zipcode: data['shipping-zipcode'],
            countryId: data['shipping-countryId'],
            city: data['shipping-city'],
            countryStateId: data['shipping-state'],
            additionalAddressLine1: data['shipping-additionalAddressLine1'],
            additionalAddressLine2: data['shipping-additionalAddressLine2'],
            phoneNumber: data['shipping-phoneNumber'],
            company: data['shipping-company'],
            department: data['shipping-department'],
            salutationId: data['shipping-salutation'],
        };
    }

    if (registerData.value) {
        emits('register', registerData.value);
    }
};
</script>

<template>
    <div class="flex flex-col justify-center gap-5">
        <slot name="headline">
            <h1 class="text-center">
                {{ $t('account.register.headline') }}
            </h1>
        </slot>

        <slot name="register-form">
            <Vueform
                :display-errors="displayVueFormErrors"
                :show-required="showRequired"
                :loading="isLoading"
                :endpoint="false"
                @submit="(value: VueFormSubmitData) => onSubmit(value.data)"
            >
                <slot name="register-customer-info-and-billing-address">
                    <GroupElement name="billing-address">
                        <AddressFields
                            :is-detail="true"
                            :account-type-conditions="[['billing-address.account-type.accountType', 'business']]"
                            headline-classes="col-span-12"
                            :headline="$t('address.headline')"
                        />
                    </GroupElement>
                </slot>

                <slot name="different-shipping-address">
                    <FormCheckboxElement
                        id="differentShippingAddress"
                        name="differentShippingAddress"
                    >
                        <template #checkbox-element-content>
                            {{ $t('address.differentShippingAddress') }}
                        </template>
                    </FormCheckboxElement>
                </slot>

                <slot name="shipping-address">
                    <GroupElement
                        name="shipping-address"
                        :conditions="[['differentShippingAddress', true]]"
                    >
                        <AddressFields
                            :account-type-conditions="[['shipping-address.account-type.shipping-accountType', 'business']]"
                            prefix="shipping-"
                        />
                    </GroupElement>
                </slot>

                <slot name="data-protection">
                    <FormCheckboxElement
                        id="acceptedDataProtection"
                        name="acceptedDataProtection"
                        :rules="isDataProtectionCheckboxRequired ? 'required' : ''"
                        :messages="{ required: $t('account.register.dataProtection.errorRequired') }"
                    >
                        <template #checkbox-element-content>
                            <AccountDataProtection />
                        </template>
                    </FormCheckboxElement>
                </slot>

                <slot name="alert">
                    <UiAlert v-if="errorMessage" variant="destructive" class="mb-4 flex gap-4 col-span-12">
                        <slot name="alert-icon">
                            <Icon name="mdi:alert-circle-outline" class="size-4 text-red-500" />
                        </slot>

                        <div>
                            <UiAlertTitle>{{ $t('error.generalHeadline') }}</UiAlertTitle>
                            <UiAlertDescription>
                                {{ errorMessage }}
                            </UiAlertDescription>
                        </div>
                    </UiAlert>
                </slot>

                <slot name="register-submit-button">
                    <UiButton
                        id="register-submit"
                        type="submit"
                        name="register-submit"
                        :is-loading="isLoading"
                        class="col-span-12"
                    >
                        {{ $t('account.auth.register') }}
                    </UiButton>
                </slot>
            </Vueform>
        </slot>
    </div>
</template>
