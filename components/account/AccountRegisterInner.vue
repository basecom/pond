<script setup lang="ts">
import type {RegisterVueFormData, VueFormRequestData} from '~/types/vueForm/Register';

withDefaults(
    defineProps<{
      displayError?: boolean;
      showRequired?: string[];
      isLoading?: boolean;
    }>(),
    {
        displayError: false,
        showRequired: () => ['label'],
        isLoading: false,
    },
);

const emits = defineEmits<{
  register: [registerData];
}>();

// Admin configs
const configStore = useConfigStore();
const isDataProtectionCheckboxRequired = ref(configStore.get('core.loginRegistration.requireDataProtectionCheckbox') as boolean);

const onSubmit = (data: VueFormRequestData) => {
    console.log('data', data);
    // ToDO: Keine Copy erstellen sondern ganz neu erstellen -> Bessere Lesbarkeit und besser mit Types
    // Create a copy of the data to avoid changing the original
    const registerData = { ...data };

    // Remove confirmation fields, if present, as they are not used in the api
    if (registerData.password_confirmation) {
        delete registerData.password_confirmation;
    }
    if (registerData.email_confirmation) {
        delete registerData.email_confirmation;
    }

    // Create new object for billingAddress, since billing address uses fields from address and customer
    registerData.billingAddress = {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        street: registerData.street,
        zipcode: registerData.zipcode,
        countryId: registerData.countryId,
        city: registerData.city,
        state: registerData.state,
        additionalAddressLine1: registerData.additionalAddressLine1,
        additionalAddressLine2: registerData.additionalAddressLine2,
        phoneNumber: registerData.phoneNumber,
        company: registerData.company,
        department: registerData.department,
    };

    // VatIds must be passed to the api as an array
    registerData.vatIds = Array.isArray(registerData.vatIds)
        ? registerData.vatIds
        : [registerData.vatIds];

    // If a different shipping address was specified
    if (registerData.differentShippingAddress) {
        // Create a new object for shippingAddress
        registerData.shippingAddress = {};

        // Check all keys that start with 'shipping-'
        Object.keys(registerData).forEach((key) => {
            if (key.startsWith('shipping-')) {
                const newKey = key.substring('shipping-'.length);
                registerData.shippingAddress[newKey] = registerData[key];
            }
        });
    }
    console.log('danach', registerData);
    emits('register', registerData);
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
                :display-errors="displayError"
                :show-required="showRequired"
                :loading="isLoading"
                :endpoint="(form$: RegisterVueFormData) => onSubmit(form$.requestData)"
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
                        :label="$t('address.differentShippingAddress')"
                    />
                </slot>

                <slot name="shipping-address">
                    <GroupElement
                        name="shipping-address"
                        :conditions="[['differentShippingAddress', true]]"
                    >
                        <AddressFields
                            :account-type-conditions="[['shipping-address.account-type.shipping-accountType', 'business']]"
                            prefix="shipping-"
                            :show-vat-ids="false"
                        />
                    </GroupElement>
                </slot>

                <slot name="data-protection">
                    <FormCheckboxElement
                        id="acceptedDataProtection"
                        name="acceptedDataProtection"
                        :rules="isDataProtectionCheckboxRequired ? 'required' : ''"
                        :label="$t('account.register.acceptedDataProtection.label')"
                        :messages="{ required: $t('account.register.acceptedDataProtection.errorRequired') }"
                    />
                </slot>

                <slot name="register-submit-button">
                    <FormButtonElement
                        id="register-submit"
                        name="register-submit"
                        :label="$t('account.auth.register')"
                        :is-submit="true"
                        :is-full="true"
                    />
                </slot>
            </Vueform>
        </slot>
    </div>
</template>
