<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      isDetail?: boolean;
      accountTypeConditions?: [];
      streetCols?: Columns;
      zipCols?: Columns;
      cityCols?: Columns;
      additionalAddressLine1Cols?: Columns;
      additionalAddressLine2Cols?: Columns;
      countryCols?: Columns;
      stateCols?: Columns;
      phoneNumberCols?: Columns;
      /**
       * This component can be used multiple times in a form (e.g., registration form). To ensure that the form fields
       * are unique upon submission, it is possible to specify a prefix
       */
      prefix?: string;
      headlineClasses?: string;
      headline?: string;
    }>(),
    {
        isDetail: false,
        accountTypeConditions: undefined,
        streetCols: () => ({
            sm: 12,
            md: 6,
        }),
        zipCols: () => ({
            sm: 12,
            md: 3,
        }),
        cityCols: () => ({
            sm: 12,
            md: 3,
        }),
        additionalAddressLine1Cols: () => ({
            sm: 12,
            md: 6,
        }),
        additionalAddressLine2Cols: () => ({
            sm: 12,
            md: 6,
        }),
        countryCols: () => ({
            sm: 12,
            md: 6,
        }),
        stateCols: () => ({
            sm: 12,
            md: 6,
        }),
        phoneNumberCols: () => ({
            sm: 12,
            md: 6,
        }),
        prefix: '',
        headlineClasses: undefined,
        headline: undefined,
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
const showPhoneNumber = ref(configStore.get('core.loginRegistration.phoneNumberFieldRequired') as boolean);
const isPhoneNumberRequired = ref(configStore.get('core.loginRegistration.phoneNumberFieldRequired') as boolean);

onMounted(async () => {
    await fetchCountries();
    // Set countries and bring them into the correct form for select type
    formattedCountries.value = countries.value.map(item => ({
        value: item.id,
        label: item.name,
    }));
});

const fetchStates = (selectedCountryId: string) => {
    // When a country is selected, the corresponding states are fetched and also brought into the correct form for select type
    const fetchedStates = getStatesForCountry(selectedCountryId);
    if(fetchedStates) {
        states.value = fetchedStates.map(item => ({
            value: item.id,
            label: item.name,
        }));
    }
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
                :columns="streetCols"
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
                :columns="zipCols"
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
                :columns="cityCols"
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
                :columns="additionalAddressLine1Cols"
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
                :columns="additionalAddressLine2Cols"
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
                :columns="countryCols"
                @on-change="(value: string) => fetchStates(value)"
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
                :columns="stateCols"
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
                :columns="phoneNumberCols"
            />
        </slot>
    </GroupElement>
</template>
