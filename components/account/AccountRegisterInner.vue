<script setup lang="ts">
import {type Schemas} from '@shopware/api-client/store-api-types';
import * as z from 'zod';
import {toTypedSchema} from '@vee-validate/zod';
import {useForm} from 'vee-validate';

// Composable
const {getSalutations} = useSalutations();
const {getCountries, fetchCountries, getStatesForCountry} = useCountries();
const configStore = useConfigStore();
const pondRegisterForm = usePondRegisterForm();
const schema = pondRegisterForm.getRegisterSchema();
const dependencies = pondRegisterForm.getRegisterDependencies();
const fieldConfig = pondRegisterForm.getRegisterFieldConfig;

// Types
export type RegisterData = z.infer<typeof schema>;

// Props and emits
withDefaults(
    defineProps<{
        isLoading?: boolean;
        errorMessage?: string;
    }>(),
    {
        isLoading: false,
        errorMessage: undefined,
    },
);

// Emits
const emits = defineEmits<{
    register: [registerData: RegisterData];
}>();

// Refs
const salutations = ref<Array<Schemas['Salutation']> | null>();
const countries = ref<Array<Schemas['Country']> | null>();
const states = ref<Array<Schemas['CountryState']> | null>();
const shippingAddressStates = ref<Array<Schemas['CountryState']> | null>();

const form = useForm({
    validationSchema: toTypedSchema(schema),
})

const possibleBirthdayYears = computed(() => {
    const years = [];
    const today = new Date();
    // we can not use a foreach here
    // eslint-disable-next-line no-restricted-syntax
    for (let i = (today.getFullYear() - 120); i <= today.getFullYear(); i++) years.push(i);
    return years;
});

const register = (registerData: any) => {
    // TODO: Emit wont fire with a nested schema which is also put into hidden state with autoFrom dependencies, remove console.log
    console.log(form.values);
    emits('register', registerData);
};

// Updates current states if selected country has any
watch(form.values, (values) => {
    // TODO: Multiple calls on setting states, this watcher cant use old-state before change event
    if (values.countryId) {
        states.value = getStatesForCountry(values.countryId);
    }
    if (values.addressCountryId && form.values.shippingAddressVaries) {
        shippingAddressStates.value = getStatesForCountry(values.addressCountryId);
    }
});

// API fetches
onBeforeMount(async () => {
    await configStore.loadConfig();
    salutations.value = getSalutations.value;
    await fetchCountries();
    countries.value = getCountries.value;
});
</script>

<template>
    <div class="mt-0 grid">
        <slot name="alert">
            <UiAlert v-if="errorMessage" variant="destructive" class="mb-4 flex gap-4">
                <slot name="alert-icon">
                    <Icon name="mdi:alert-circle-outline" class="size-4 text-red-500"/>
                </slot>
                <div>
                    <UiAlertTitle>{{ $t('error.generalHeadline') }}</UiAlertTitle>
                    <UiAlertDescription>
                        {{ errorMessage }}
                    </UiAlertDescription>
                </div>
            </UiAlert>
        </slot>
    </div>

    <slot name="registerHeader">
        <h1 class="text-3xl font-semibold mb-6">{{ $t('account.register.header.main') }}</h1>
    </slot>

    <UiAutoForm
        class="space-y-6"
        :schema="schema"
        :form="form"
        :field-config="fieldConfig"
        :dependencies="dependencies"
        @submit="(data) => console.log(data)"
    >
        <template #headerGeneral>
            <slot name="registerGeneralFieldsHeader">
                <div>
                    <h2 class="text-lg font-semibold">{{ $t('account.register.header.generalFields') }}</h2>
                    <hr>
                </div>
            </slot>
        </template>
        <template #headerAddress>
            <slot name="registerAddressFieldsHeader">
                <div class="pt-6">
                    <h2 class="text-lg font-semibold">{{ $t('account.register.header.addressFields') }}</h2>
                    <hr>
                </div>
            </slot>
        </template>
        <template #accountType>
            <div v-if="configStore.get('core.loginRegistration.showAccountTypeSelection')">
                <FormField v-slot="{ componentField }" name="accountType">
                    <UiFormItem>
                        <UiAutoFormLabel required>{{ $t('account.register.accountTypes.label') }}</UiAutoFormLabel>
                        <UiSelect v-bind="componentField">
                            <UiFormControl>
                                <UiSelectTrigger>
                                    <UiSelectValue :placeholder="$t('account.register.accountTypes.placeholder')"/>
                                </UiSelectTrigger>
                            </UiFormControl>
                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem
                                        v-for="accountType in pondRegisterForm.accountTypes"
                                        :value="accountType.value"
                                    >
                                        {{ accountType.label }}
                                    </UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                        <UiFormMessage/>
                    </UiFormItem>
                </FormField>
            </div>
        </template>
        <template #salutationId="slotProps">
            <div v-if="salutations">
                <UiAutoFormField v-bind="slotProps">
                    <FormField v-slot="{ componentField }" name="salutationId">
                        <UiFormItem>
                            <UiAutoFormLabel required>{{ $t('account.register.salutations.label') }}</UiAutoFormLabel>
                            <UiSelect v-bind="componentField">
                                <UiFormControl>
                                    <UiSelectTrigger>
                                        <UiSelectValue :placeholder="$t('account.register.salutations.placeholder')"/>
                                    </UiSelectTrigger>
                                </UiFormControl>
                                <UiSelectContent>
                                    <UiSelectGroup>
                                        <UiSelectItem
                                            v-for="salutation in salutations"
                                            :value="salutation.id"
                                        >
                                            {{ salutation.translated.displayName }}
                                        </UiSelectItem>
                                    </UiSelectGroup>
                                </UiSelectContent>
                            </UiSelect>
                        </UiFormItem>
                    </FormField>
                </UiAutoFormField>
            </div>
        </template>
        <template #birthdateDay="slotProps">
            <div class="inline-block w-[25%] max-w-24 mr-2">
                <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdateDay">
                    <UiFormItem>
                        <UiAutoFormLabel>{{ $t('account.register.birthdate.label') }}</UiAutoFormLabel>
                        <UiSelect v-bind="componentField">
                            <UiFormControl>
                                <UiSelectTrigger>
                                    <UiSelectValue :placeholder="$t('account.register.birthdate.day')"/>
                                </UiSelectTrigger>
                            </UiFormControl>

                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem
                                        v-for="day in 31"
                                        :key="day"
                                        :value="day"
                                    >
                                        {{ day }}
                                    </UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                        <UiFormMessage/>
                    </UiFormItem>
                </FormField>
            </div>
        </template>
        <template #birthdateMonth="slotProps">
            <div class="inline-block w-[25%] max-w-24 mr-2">
                <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdateMonth">
                    <UiFormItem>
                        <UiSelect v-bind="componentField">
                            <UiFormControl>
                                <UiSelectTrigger>
                                    <UiSelectValue :placeholder="$t('account.register.birthdate.month')"/>
                                </UiSelectTrigger>
                            </UiFormControl>

                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem
                                        v-for="month in 12"
                                        :key="month"
                                        :value="month"
                                    >
                                        {{ month }}
                                    </UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                    </UiFormItem>
                </FormField>
            </div>
        </template>
        <template #birthdateYear="slotProps">
            <div class="inline-block w-[25%] max-w-24">
                <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdateYear">
                    <UiFormItem>
                        <UiSelect v-bind="componentField">
                            <UiFormControl>
                                <UiSelectTrigger>
                                    <UiSelectValue :placeholder="$t('account.register.birthdate.year')"/>
                                </UiSelectTrigger>
                            </UiFormControl>

                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem
                                        v-for="year in possibleBirthdayYears"
                                        :key="year"
                                        :value="year"
                                    >
                                        {{ year }}
                                    </UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                    </UiFormItem>
                </FormField>
            </div>
        </template>
        <template #countryId>
            <FormField v-slot="{ componentField }" name="countryId">
                <UiFormItem>
                    <UiAutoFormLabel required>{{ $t('account.register.country.label') }}</UiAutoFormLabel>
                    <UiSelect v-bind="componentField">
                        <UiFormControl>
                            <UiSelectTrigger>
                                <UiSelectValue :placeholder="$t('account.register.country.placeholder')"/>
                            </UiSelectTrigger>
                        </UiFormControl>
                        <UiSelectContent>
                            <UiSelectGroup>
                                <UiSelectItem
                                    v-for="country in countries"
                                    :value="country.id"
                                >
                                    {{ country.translated.name }}
                                </UiSelectItem>
                            </UiSelectGroup>
                        </UiSelectContent>
                    </UiSelect>
                    <UiFormMessage/>
                </UiFormItem>
            </FormField>
        </template>
        <template #countryState>
            <div v-if="states && states.length > 0">
                <FormField v-slot="{ componentField }" name="countryState">
                    <UiFormItem>
                        <UiAutoFormLabel>{{ $t('account.register.state.label') }}</UiAutoFormLabel>
                        <UiSelect v-bind="componentField">
                            <UiFormControl>
                                <UiSelectTrigger>
                                    <UiSelectValue :placeholder="$t('account.register.state.placeholder')"/>
                                </UiSelectTrigger>
                            </UiFormControl>
                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem
                                        v-for="state in states"
                                        :value="state.id"
                                    >
                                        {{ state.translated.name }}
                                    </UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                    </UiFormItem>
                </FormField>
            </div>
            <div v-else></div>
        </template>
        <!-- TODO: Re-Evaluate current implementation. Best way: nested schema. Current way: prefix for address-schema. -->
        <!-- TODO: Add hidden-Input field for storefrontUrl (maybe. discuss with Jordan or Nele) -->
        <template #addressHeader="slotProps">
            <UiAutoFormField v-bind="slotProps">
                <slot name="registerShippingAddressHeader">
                    <div>
                        <h2 class="text-lg font-semibold">{{ $t('account.register.header.shippingAddressFields') }}</h2>
                        <hr>
                    </div>
                </slot>
            </UiAutoFormField>
        </template>
        <template #addressAccountType="slotProps">
            <UiAutoFormField v-bind="slotProps">
                <FormField
                    v-slot="{ componentField }"
                    name="addressAccountType"
                >
                    <UiFormItem v-if="configStore.get('core.loginRegistration.showAccountTypeSelection')">
                        <UiSelect v-bind="componentField">
                            <UiFormControl>
                                <UiSelectTrigger>
                                    <UiSelectValue :placeholder="$t('account.register.accountTypes.placeholder')"/>
                                </UiSelectTrigger>
                            </UiFormControl>
                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem
                                        v-for="accountType in pondRegisterForm.accountTypes"
                                        :value="accountType.value"
                                    >
                                        {{ accountType.label }}
                                    </UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                        <UiFormMessage/>
                    </UiFormItem>
                </FormField>
            </UiAutoFormField>
        </template>
        <template #addressSalutationId="slotProps">
            <UiAutoFormField v-bind="slotProps">
                <FormField v-slot="{ componentField }" name="addressSalutationId">
                    <UiFormItem>
                        <UiSelect v-bind="componentField">
                            <UiFormControl>
                                <UiSelectTrigger>
                                    <UiSelectValue :placeholder="$t('account.register.salutations.placeholder')"/>
                                </UiSelectTrigger>
                            </UiFormControl>
                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem
                                        v-for="salutation in salutations"
                                        :value="salutation.id"
                                    >
                                        {{ salutation.translated.displayName }}
                                    </UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                        <UiFormMessage/>
                    </UiFormItem>
                </FormField>
            </UiAutoFormField>
        </template>
        <template #addressCountryId="slotProps">
            <UiAutoFormField v-bind="slotProps">
                <FormField v-slot="{ componentField }" name="addressCountryId">
                    <UiFormItem>
                        <UiSelect v-bind="componentField">
                            <UiFormControl>
                                <UiSelectTrigger>
                                    <UiSelectValue :placeholder="$t('account.register.country.placeholder')"/>
                                </UiSelectTrigger>
                            </UiFormControl>
                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem
                                        v-for="country in countries"
                                        :value="country.id"
                                    >
                                        {{ country.translated.name }}
                                    </UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                        <UiFormMessage/>
                    </UiFormItem>
                </FormField>
            </UiAutoFormField>
        </template>
        <template #addressCountryState="slotProps">
            <UiAutoFormField v-bind="slotProps">
                <div v-if="shippingAddressStates && shippingAddressStates.length > 0">
                    <FormField v-slot="{ componentField }" name="addressCountryState">
                        <UiFormItem>
                            <UiAutoFormLabel>{{ $t('account.register.state.label') }}</UiAutoFormLabel>
                            <UiSelect v-bind="componentField">
                                <UiFormControl>
                                    <UiSelectTrigger>
                                        <UiSelectValue :placeholder="$t('account.register.state.placeholder')"/>
                                    </UiSelectTrigger>
                                </UiFormControl>
                                <UiSelectContent>
                                    <UiSelectGroup>
                                        <UiSelectItem
                                            v-for="state in shippingAddressStates"
                                            :value="state.id"
                                        >
                                            {{ state.translated.name }}
                                        </UiSelectItem>
                                    </UiSelectGroup>
                                </UiSelectContent>
                            </UiSelect>
                        </UiFormItem>
                    </FormField>
                </div>
                <div v-else></div>
            </UiAutoFormField>
        </template>
        <template #acceptedDataProtection="slotProps">
            <div class="pt-6">
                <UiLabel
                    class="font-bold"
                    :class="{ 'block': !configStore.get('core.loginRegistration.requireDataProtectionCheckbox') }"
                >
                    {{ $t('account.register.tos.header') }}
                </UiLabel>
                <UiAutoFormField
                    v-if="configStore.get('core.loginRegistration.requireDataProtectionCheckbox')"
                    v-bind="slotProps"
                />
                <UiLabel v-else>{{ $t('account.register.tos.label') }}</UiLabel>
            </div>
        </template>
        <slot name="submit-btn">
            <UiButton
                type="submit"
                :is-loading="isLoading"
            >
                {{ $t('account.register.submit') }}
            </UiButton>
        </slot>
    </UiAutoForm>
</template>
