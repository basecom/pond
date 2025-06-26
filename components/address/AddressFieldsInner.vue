<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      isDetail?: boolean;
      accountTypeConditions?: string[];
      streetCols?: Columns;
      zipCols?: Columns;
      cityCols?: Columns;
      additionalAddressLine1Cols?: Columns;
      additionalAddressLine2Cols?: Columns;
      countryCols?: Columns;
      stateCols?: Columns;
      phoneNumberCols?: Columns;
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
    },
);

const configStore = useConfigStore();
const { getCountries: countries, getStatesForCountry, fetchCountries} = useCountries();

const formattedCountries: Ref<undefined | { value: string; label: string; }[]> = ref(undefined);
const states: Ref<undefined | { value: string; label: string; }[]> = ref(undefined);
// admin configs
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
        <AccountCustomerFields :is-detail="isDetail" :account-type-conditions="accountTypeConditions" />
    </slot>

    <slot name="address-headline">
        <h2>
            {{ $t('address.headline') }}
        </h2>
    </slot>

    <GroupElement name="customer-address">
        <slot name="street">
            <TextElement
                :label="$t('address.street.label')"
                name="street"
                :placeholder="$t('address.street.placeholder')"
                rules="required"
                :messages="{ required: $t('address.street.errorRequired') }"
                :columns="streetCols"
            />
        </slot>

        <slot name="zip-code">
            <TextElement
                :label="$t('address.zipCode.label')"
                name="zipCode"
                :placeholder="$t('address.zipCode.placeholder')"
                rules="required"
                :messages="{ required: $t('address.zipCode.errorRequired') }"
                :columns="zipCols"
            />
        </slot>

        <slot name="city">
            <TextElement
                :label="$t('address.city.label')"
                name="city"
                :placeholder="$t('address.city.placeholder')"
                rules="required"
                :messages="{ required: $t('address.city.errorRequired') }"
                :columns="cityCols"
            />
        </slot>

        <slot name="additional-address-line-1">
            <TextElement
                v-if="showAdditionalAddress1Field"
                :label="$t('address.additionalAddressLine1.label')"
                name="additionalLine1"
                :placeholder="$t('address.additionalAddressLine1.placeholder')"
                :rules="isAdditionalAddress1FieldRequired ? 'required': ''"
                :messages="{ required: $t('address.additionalAddressLine1.errorRequired') }"
                :columns="additionalAddressLine1Cols"
            />
        </slot>

        <slot name="additional-address-line-2">
            <TextElement
                v-if="showAdditionalAddress2Field"
                :label="$t('address.additionalAddressLine2.label')"
                name="additionalLine2"
                :placeholder="$t('address.additionalAddressLine2.placeholder')"
                :rules="isAdditionalAddress2FieldRequired ? 'required': ''"
                :messages="{ required: $t('address.additionalAddressLine2.errorRequired') }"
                :columns="additionalAddressLine2Cols"
            />
        </slot>

        <slot name="country">
            <SelectElement
                name="country"
                :placeholder="$t('address.country.placeholder')"
                :label="$t('address.country.label')"
                :messages="{ required: $t('address.country.errorRequired') }"
                rules="required"
                :native="false"
                :can-clear="false"
                :items="formattedCountries"
                :columns="countryCols"
                @change="(value: string) => fetchStates(value)"
            />
        </slot>

        <slot name="state">
            <SelectElement
                v-if="states"
                name="state"
                :label="$t('address.country.label')"
                :placeholder="$t('address.state.placeholder')"
                :native="false"
                :can-clear="false"
                :items="states"
                :columns="stateCols"
            />
        </slot>

        <slot name="phone-number">
            <TextElement
                v-if="showPhoneNumber"
                :label="$t('address.phoneNumber.label')"
                name="phoneNumber"
                :placeholder="$t('address.phoneNumber.placeholder')"
                :rules="isPhoneNumberRequired ? 'required': ''"
                :messages="{ required: $t('address.phoneNumber.errorRequired') }"
                :columns="phoneNumberCols"
            />
        </slot>
    </GroupElement>
</template>
