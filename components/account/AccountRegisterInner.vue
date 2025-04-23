<script setup lang="ts">
import {type Schemas} from '@shopware/api-client/store-api-types';
import * as z from 'zod';
import {toTypedSchema} from '@vee-validate/zod';
import {useForm} from 'vee-validate';

// Composable
const {getSalutations, fetchSalutations} = useSalutations();
const {getCountries, fetchCountries, getStatesForCountry} = useCountries();
const configStore = useConfigStore();
const pondRegisterForm = usePondRegisterForm();
const schema = pondRegisterForm.getRegisterSchema();
const dependencies = pondRegisterForm.getRegisterDependencies;
const fieldConfig = pondRegisterForm.getRegisterFieldConfig;
console.log(fieldConfig);

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

const form = useForm({
    validationSchema: toTypedSchema(schema),
})

const register = async (registerData: any) => {
    console.log(form.values);
    // TODO: Emit wont fire
    emits('register', registerData);
};

// Updates current states if selected country has any
watch(form.values, (values) => {
    if (!values.countryId) {
        return;
    }
    states.value = getStatesForCountry(values.countryId);
});

// API fetches
onBeforeMount(async () => {
    await configStore.loadConfig();
    await fetchSalutations();
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

    <UiAutoForm
        class="space-y-6"
        :schema="schema"
        :field-config="fieldConfig"
        :dependencies="dependencies"
        @submit="register"
    >
        <template #headerMain>
            <slot name="registerHeader">
                <div>
                    <h1 class="text-xl font-semibold">{{ $t('account.register.header.main') }}</h1>
                </div>
            </slot>
        </template>
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
            <FormField
                v-slot="{ componentField }"
                name="accountType"
            >
                <UiFormItem v-if="configStore.get('core.loginRegistration.showAccountTypeSelection')">
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
        </template>
        <template #salutation>
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
                    <UiFormMessage/>
                </UiFormItem>
            </FormField>
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
        <!-- TODO: Implement shippingAddress.state template -->
        <!-- TODO: Add hidden-Input field for storefrontUrl -->
        <template #shippingAddress="slotProps">
            <UiAutoFormField
                v-if="configStore.get('core.loginRegistration.requireDataProtectionCheckbox')"
                v-bind="slotProps"
            />
        </template>
        <template #acceptedDataProtection="slotProps">
            <div class="pt-6">
                <UiLabel class="font-bold">{{ $t('account.register.tos.header') }}</UiLabel>
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
