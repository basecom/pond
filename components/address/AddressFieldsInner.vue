<script setup lang="ts">
import type { Columns, SelectItems } from '~/types/vueForm/Form';

withDefaults(
    defineProps<{
      isDetail?: boolean;
      accountTypeConditions?: string[][];
      /**
       * This component can be used multiple times in a form (e.g., registration form). To ensure that the form fields
       * are unique upon submission, it is possible to specify a prefix
       */
      prefix?: string;
      headlineClasses?: string;
      headline?: string;
      streetColumns?: Columns,
      zipColumns?: Columns,
      cityColumns?: Columns,
      additionalAddressLine1Columns?: Columns,
      additionalAddressLine2Columns?: Columns,
      countryColumns?: Columns,
      stateColumns?: Columns,
      phoneNumberColumns?: Columns,
      // Columns for AccountCustomerFields
      accountTypeColumns?: Columns;
      salutationColumns?: Columns;
      titleColumns?: Columns;
      firstNameColumns?: Columns;
      lastNameColumns?: Columns;
      birthdayColumns?: Columns;
      companyColumns?: Columns;
      vatIdColumns?: Columns;
      departmentColumns?: Columns;
      emailColumns?: Columns;
      passwordColumns?: Columns,
        inModal?: boolean // when the address fields are in a modal, we open the last two dropdowns to top (for accessibility reasons)
    }>(),
    {
        isDetail: false,
        accountTypeConditions: undefined,
        prefix: '',
        headlineClasses: undefined,
        headline: undefined,
        streetColumns: () => ({
            sm: 12,
            md: 6,
        }),
        zipColumns: () => ({
            sm: 12,
            md: 3,
        }),
        cityColumns: () => ({
            sm: 12,
            md: 3,
        }),
        additionalAddressLine1Columns: () => ({
            sm: 12,
            md: 6,
        }),
        additionalAddressLine2Columns: () => ({
            sm: 12,
            md: 6,
        }),
        countryColumns: () => ({
            sm: 12,
            md: 6,
        }),
        stateColumns: () => ({
            sm: 12,
            md: 6,
        }),
        phoneNumberColumns: () => ({
            sm: 12,
            md: 6,
        }),
        accountTypeColumns: () => ({
            sm: 12,
            md: 3,
        }),
        salutationColumns: () => ({
            sm: 12,
            md: 3,
        }),
        birthdayColumns: () => ({
            sm: 1,
            md: 2,
        }),
        titleColumns: () => ({
            sm: 12,
            md: 3,
        }),
        firstNameColumns: () => ({
            sm: 12,
            md: 6,
        }),
        lastNameColumns: () => ({
            sm: 12,
            md: 6,
        }),
        companyColumns: () => ({
            sm: 12,
            md: 6,
        }),
        vatIdColumns: () => ({
            sm: 12,
            md: 6,
        }),
        departmentColumns: () => ({
            sm: 12,
            md: 6,
        }),
        emailColumns: () => ({
            sm: 12,
            md: 6,
        }),
        passwordColumns: () => ({
            sm: 12,
            md: 6,
        }),
        inModal: false,
    },
);

const configStore = useConfigStore();
const { getCountries: countries, getStatesForCountry, fetchCountries } = useCountries();

const formattedCountries: Ref<undefined | SelectItems> = ref(undefined);
const states: Ref<undefined | SelectItems> = ref(undefined);
// Admin configs
const showAdditionalAddress1Field = ref(configStore.get('core.loginRegistration.showAdditionalAddressField1') as boolean);
const isAdditionalAddress1FieldRequired = ref(configStore.get('core.loginRegistration.additionalAddressField1Required') as boolean);
const showAdditionalAddress2Field = ref(configStore.get('core.loginRegistration.showAdditionalAddressField2') as boolean);
const isAdditionalAddress2FieldRequired = ref(configStore.get('core.loginRegistration.additionalAddressField2Required') as boolean);
const showPhoneNumber = ref(configStore.get('core.loginRegistration.showPhoneNumberField') as boolean);
const isPhoneNumberRequired = ref(configStore.get('core.loginRegistration.phoneNumberFieldRequired') as boolean);
const showZipcodeInFrontOfCity = ref(configStore.get('core.loginRegistration.showZipcodeInFrontOfCity') as boolean);

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
    if (fetchedStates && fetchedStates.length > 0) {
        states.value = fetchedStates.map(item => ({
            value: item.id,
            label: item.name,
        }));
    } else {
        states.value = undefined;
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
            :account-type-columns="accountTypeColumns"
            :salutation-columns="salutationColumns"
            :birthday-columns="birthdayColumns"
            :title-columns="titleColumns"
            :first-name-columns="firstNameColumns"
            :last-name-columns="lastNameColumns"
            :company-columns="companyColumns"
            :vat-id-columns="vatIdColumns"
            :department-columns="departmentColumns"
            :email-columns="emailColumns"
            :password-columns="passwordColumns"
        />
    </slot>

    <slot name="address-headline">
        <h2 v-if="headline" :class="headlineClasses">
            {{ headline }}
        </h2>
    </slot>

    <GroupElement name="customer-address">
        <slot name="street">
            <UiTextElement
                :id="`${prefix}street`"
                :label="$t('address.streetLabel')"
                :name="`${prefix}street`"
                :placeholder="$t('address.streetPlaceholder')"
                rules="required"
                :messages="{ required: $t('address.streetRequired') }"
                :columns="streetColumns"
            />
        </slot>

        <slot name="zip-code-before">
            <AddressFieldZipcode v-if="showZipcodeInFrontOfCity" :prefix="prefix" :columns="zipColumns" />
        </slot>

        <slot name="city">
            <UiTextElement
                :id="`${prefix}city`"
                :label="$t('address.cityLabel')"
                :name="`${prefix}city`"
                :placeholder="$t('address.cityPlaceholder')"
                rules="required"
                :messages="{ required: $t('address.cityRequired') }"
                :columns="cityColumns"
            />
        </slot>

        <slot name="zip-code-after">
            <AddressFieldZipcode v-if="!showZipcodeInFrontOfCity" :prefix="prefix" :columns="zipColumns" />
        </slot>

        <slot name="additional-address-line-1">
            <UiTextElement
                v-if="showAdditionalAddress1Field"
                :id="`${prefix}additionalAddressLine1`"
                :label="$t('address.additionalField1Label')"
                :name="`${prefix}additionalAddressLine1`"
                :placeholder="$t('address.additionalField1Placeholder')"
                :rules="isAdditionalAddress1FieldRequired ? 'required': ''"
                :messages="{ required: $t('address.additionalField1Required') }"
                :columns="additionalAddressLine1Columns"
            />
        </slot>

        <slot name="additional-address-line-2">
            <UiTextElement
                v-if="showAdditionalAddress2Field"
                :id="`${prefix}additionalAddressLine2`"
                :label="$t('address.additionalField2Label')"
                :name="`${prefix}additionalAddressLine2`"
                :placeholder="$t('address.additionalField2Placeholder')"
                :rules="isAdditionalAddress2FieldRequired ? 'required': ''"
                :messages="{ required: $t('address.additionalField2Required') }"
                :columns="additionalAddressLine2Columns"
            />
        </slot>

        <slot name="country">
            <UiSelectElement
                :id="`${prefix}countryId`"
                :name="`${prefix}countryId`"
                :placeholder="$t('address.countryPlaceholder')"
                :label="$t('address.countryLabel')"
                :messages="{ required: $t('address.countryRequired') }"
                rules="required"
                :items="formattedCountries"
                :columns="countryColumns"
                :open-direction="inModal ? 'top' : 'bottom'"
                @on-change="(value: string) => onSelectCountry(value)"
            />
        </slot>

        <slot name="state">
            <UiSelectElement
                v-if="states && states.length > 0"
                :id="`${prefix}countryStateId`"
                :name="`${prefix}countryStateId`"
                :label="$t('address.countryStateLabel')"
                :placeholder="$t('address.countryStatePlaceholder')"
                :items="states"
                :columns="stateColumns"
                :open-direction="inModal ? 'top' : 'bottom'"
            />
        </slot>

        <slot name="phone-number">
            <UiTextElement
                v-if="showPhoneNumber"
                :id="`${prefix}phoneNumber`"
                :label="$t('address.phoneNumberLabel')"
                :name="`${prefix}phoneNumber`"
                :placeholder="$t('address.phoneNumberPlaceholder')"
                :rules="isPhoneNumberRequired ? 'required': ''"
                :messages="{ required: $t('address.phoneNumberRequired') }"
                :columns="phoneNumberColumns"
            />
        </slot>
    </GroupElement>
</template>
