<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      isDetail?: boolean;
      accountTypeConditions?: [];
      /**
       * This component can be used multiple times in a form (e.g., registration form). To ensure that the form fields
       * are unique upon submission, it is possible to specify a prefix
       */
      prefix?: string;
      headlineClasses?: string;
      headline?: string;
      columns?: {
        streetColumns?: Columns,
        zipColumns?: Columns,
        cityColumns?: Columns,
        additionalAddressLine1Columns?: Columns,
        additionalAddressLine2Columns?: Columns,
        countryColumns?: Columns,
        stateColumns?: Columns,
        phoneNumberColumns?: Columns,
      }
    }>(),
    {
        isDetail: false,
        accountTypeConditions: undefined,
        prefix: '',
        headlineClasses: undefined,
        headline: undefined,
        columns: () => ({
            streetColumns: {
                sm: 12,
                md: 6,
            },
            zipColumns: {
                sm: 12,
                md: 3,
            },
            cityColumns: {
                sm: 12,
                md: 3,
            },
            additionalAddressLine1Columns: {
                sm: 12,
                md: 6,
            },
            additionalAddressLine2Columns: {
                sm: 12,
                md: 6,
            },
            countryColumns: {
                sm: 12,
                md: 6,
            },
            stateColumns: {
                sm: 12,
                md: 6,
            },
            phoneNumberColumns: {
                sm: 12,
                md: 6,
            },
        }),
    },
);

const configStore = useConfigStore();
const { getCountries: countries, getStatesForCountry, fetchCountries} = useCountries();

const formattedCountries: Ref<undefined | { value: string; label: string; }[]> = ref(undefined);
const states: Ref<undefined | { value: string; label: string; }[]> = ref(undefined);
// Admin configs
const showAdditionalAddress1Field = ref(configStore.get('core.loginRegistration.showAdditionalAddressField1') as boolean);
const isAdditionalAddress1FieldRequired = ref(configStore.get('core.loginRegistration.additionalAddressField1Required') as boolean);
const showAdditionalAddress2Field = ref(configStore.get('core.loginRegistration.showAdditionalAddressField2') as boolean);
const isAdditionalAddress2FieldRequired = ref(configStore.get('core.loginRegistration.additionalAddressField2Required') as boolean);
const showPhoneNumber = ref(configStore.get('core.loginRegistration.showPhoneNumberField') as boolean);
const isPhoneNumberRequired = ref(configStore.get('core.loginRegistration.phoneNumberFieldRequired') as boolean);

const isVatIdRequiredBySelectedCountry = ref(false);

onMounted(async () => {
    await fetchCountries();
    // Set countries and bring them into the correct form for select type
    formattedCountries.value = countries.value.map(item => ({
        value: item.id,
        label: item.name,
    }));
});

const onSelectCountry = (selectedCountryId: string) => {
    // When a country is selected, the corresponding states are fetched and also brought into the correct form for select type
    const fetchedStates = getStatesForCountry(selectedCountryId);
    if(fetchedStates) {
        states.value = fetchedStates.map(item => ({
            value: item.id,
            label: item.name,
        }));
    }

    // Check, if vat id is required by the selected country
    const selectedCountry = countries.value.find(country => country.id === selectedCountryId);
    isVatIdRequiredBySelectedCountry.value = selectedCountry?.vatIdRequired ?? false;
};
</script>

<template>
    <slot name="account-customer-fields">
        <!-- Component renders custom form fields (e.g. first name, last name). Since this component is used for the registration
      form, additional fields (email, password, etc.) are displayed for the registration depending on the is-detail. -->
        <AccountCustomerFields
            :is-detail="isDetail"
            :account-type-conditions="accountTypeConditions"
            :prefix="prefix"
            :is-vat-id-required-by-selected-country="isVatIdRequiredBySelectedCountry"
        />
    </slot>

    <slot name="address-headline">
        <h2 v-if="headline" :class="headlineClasses">
            {{ headline }}
        </h2>
    </slot>

    <GroupElement name="customer-address">
        <slot name="street">
            <FormTextElement
                :id="`${prefix}street`"
                :label="$t('address.street.label')"
                :name="`${prefix}street`"
                :placeholder="$t('address.street.placeholder')"
                rules="required"
                :messages="{ required: $t('address.street.errorRequired') }"
                :columns="columns.streetColumns"
            />
        </slot>

        <slot name="zip-code">
            <FormTextElement
                :id="`${prefix}zipcode`"
                :label="$t('address.zipCode.label')"
                :name="`${prefix}zipcode`"
                :placeholder="$t('address.zipCode.placeholder')"
                rules="required"
                :messages="{ required: $t('address.zipCode.errorRequired') }"
                :columns="columns.zipColumns"
            />
        </slot>

        <slot name="city">
            <FormTextElement
                :id="`${prefix}city`"
                :label="$t('address.city.label')"
                :name="`${prefix}city`"
                :placeholder="$t('address.city.placeholder')"
                rules="required"
                :messages="{ required: $t('address.city.errorRequired') }"
                :columns="columns.cityColumns"
            />
        </slot>

        <slot name="additional-address-line-1">
            <FormTextElement
                v-if="showAdditionalAddress1Field"
                :id="`${prefix}additionalAddressLine1`"
                :label="$t('address.additionalAddressLine1.label')"
                :name="`${prefix}additionalAddressLine1`"
                :placeholder="$t('address.additionalAddressLine1.placeholder')"
                :rules="isAdditionalAddress1FieldRequired ? 'required': ''"
                :messages="{ required: $t('address.additionalAddressLine1.errorRequired') }"
                :columns="columns.additionalAddressLine1Columns"
            />
        </slot>

        <slot name="additional-address-line-2">
            <FormTextElement
                v-if="showAdditionalAddress2Field"
                :id="`${prefix}additionalAddressLine2`"
                :label="$t('address.additionalAddressLine2.label')"
                :name="`${prefix}additionalAddressLine2`"
                :placeholder="$t('address.additionalAddressLine2.placeholder')"
                :rules="isAdditionalAddress2FieldRequired ? 'required': ''"
                :messages="{ required: $t('address.additionalAddressLine2.errorRequired') }"
                :columns="columns.additionalAddressLine2Columns"
            />
        </slot>

        <slot name="country">
            <FormSelectElement
                :id="`${prefix}countryId`"
                :name="`${prefix}countryId`"
                :placeholder="$t('address.country.placeholder')"
                :label="$t('address.country.label')"
                :messages="{ required: $t('address.country.errorRequired') }"
                rules="required"
                :items="formattedCountries"
                :columns="columns.countryColumns"
                @on-change="(value: string) => onSelectCountry(value)"
            />
        </slot>

        <slot name="state">
            <FormSelectElement
                v-if="states"
                :id="`${prefix}state`"
                :name="`${prefix}state`"
                :label="$t('address.state.label')"
                :placeholder="$t('address.state.placeholder')"
                :items="states"
                :columns="columns.stateColumns"
            />
        </slot>

        <slot name="phone-number">
            <FormTextElement
                v-if="showPhoneNumber"
                :id="`${prefix}phoneNumber`"
                :label="$t('address.phoneNumber.label')"
                :name="`${prefix}phoneNumber`"
                :placeholder="$t('address.phoneNumber.placeholder')"
                :rules="isPhoneNumberRequired ? 'required': ''"
                :messages="{ required: $t('address.phoneNumber.errorRequired') }"
                :columns="columns.phoneNumberColumns"
            />
        </slot>
    </GroupElement>
</template>
