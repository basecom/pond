<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ChangePasswordForm } from '~/components/account/page/AccountPageProfileChangePasswordInner.vue';
import type { ChangeMailForm } from '~/components/account/page/AccountPageProfileChangeMailInner.vue';
import type * as z from 'zod';
import { getTranslatedProperty } from '@shopware/helpers';

const props = withDefaults(
    defineProps<{
        customer: Schemas['Customer'];
        isLoading?: {
            personalData: boolean,
            mail: boolean,
            password: boolean,
        },
        resetForm?: {
            mail: boolean,
            password: boolean,
        }
    }>(),
    {
        isLoading: () => ({
            personalData: false,
            mail: false,
            password: false,
        }),
        resetForm: () => ({
            mail: false,
            password: false,
        }),
    },
);

const emits = defineEmits<{
    'update-personal-data': [personalDataForm: PersonalDataForm];
    'update-mail': [mailForm: ChangeMailForm];
    'update-password': [passwordForm: ChangePasswordForm];
}>();

const { getStyle } = usePondStyle();
const { getPersonalDataForm, getPersonalDataDependencies } = usePondForm();
const { getSalutations: salutations } = useSalutations();
const schema = getPersonalDataForm(props.customer);
const dependencies = getPersonalDataDependencies();
export type PersonalDataForm = z.infer<typeof schema>;

const birthday = computed(() => {
    const birthdayString = props.customer.birthday;
    if (!birthdayString) {
        return new Date(); // current date as fallback or use another default
    }
    const date = new Date(birthdayString);
    return isNaN(date.getTime()) ? new Date() : date;
});

const possibleBirthdayYears = computed(() => {
    const years = [];
    const today = new Date();
    // we can not use a foreach here
    // eslint-disable-next-line no-restricted-syntax
    for (let i = (today.getFullYear() - 120); i <= today.getFullYear(); i++) years.push(i);
    return years;
});

const changePersonalData = async (personalDataForm: PersonalDataForm) => {
    emits('update-personal-data', personalDataForm);
};
</script>

<template>
    <slot name="introduction">
        <h1>{{ $t('account.profileTitle') }}</h1>
    </slot>

    <!-- personal data -->
    <slot name="personal-data-headline">
        <h3 :class="getStyle('account.personalData.subHeadline')">
            {{ $t('account.profileText') }}
        </h3>
    </slot>

    <slot name="form">
        <UiAutoForm
            v-auto-animate
            class="grid grid-cols-12 gap-4"
            :schema="schema"
            :dependencies="dependencies"
            :field-config="{
                accountType: { label: $t('account.personalTypeLabel') },
                salutationId: { label: $t('account.personalSalutationLabel') },
                title: { label: $t('account.personalTitleLabel') },
                firstName: { label: $t('account.personalFirstNameLabel') },
                lastName: { label: $t('account.personalLastNameLabel') },
                company: { label: $t('address.companyNameLabel') },
                vatIds: { label: $t('address.companyVatLabel') },
                birthdayDay: { label: $t('account.personalBirthdayLabel') },
            }"
            @submit="changePersonalData"
        >
            <template #accountType="slotProps">
                <div class="col-span-12">
                    <UiAutoFormField v-bind="slotProps" />
                </div>
            </template>

            <template #salutationId="slotProps">
                <div class="col-span-12">
                    <FormField v-slot="{ componentField }" v-bind="slotProps" name="salutationId">
                        <UiFormItem>
                            <UiAutoFormLabel>{{ $t('account.personalSalutationLabel') }}</UiAutoFormLabel>
                            <UiSelect v-bind="componentField" :default-value="customer.salutationId">
                                <UiFormControl>
                                    <UiSelectTrigger>
                                        <UiSelectValue />
                                    </UiSelectTrigger>
                                </UiFormControl>

                                <UiSelectContent>
                                    <UiSelectGroup>
                                        <UiSelectItem
                                            v-for="salutation in salutations"
                                            :key="salutation.id"
                                            :value="salutation.id"
                                        >
                                            {{ getTranslatedProperty(salutation, 'displayName') }}
                                        </UiSelectItem>
                                    </UiSelectGroup>
                                </UiSelectContent>
                            </UiSelect>
                            <UiFormMessage />
                        </UiFormItem>
                    </FormField>
                </div>
            </template>

            <template #title="slotProps">
                <div class="col-span-12">
                    <UiAutoFormField v-bind="slotProps" />
                </div>
            </template>

            <template #firstName="slotProps">
                <div class="col-span-12 md:col-span-6">
                    <UiAutoFormField v-bind="slotProps" />
                </div>
            </template>

            <template #lastName="slotProps">
                <div class="col-span-12 md:col-span-6">
                    <UiAutoFormField v-bind="slotProps" />
                </div>
            </template>

            <template #company="slotProps">
                <div class="col-span-12 md:col-span-6">
                    <UiAutoFormField v-bind="slotProps" />
                </div>
            </template>

            <template #vatIds="slotProps">
                <div class="col-span-12 md:col-span-6">
                    <UiAutoFormField v-bind="slotProps" />
                </div>
            </template>

            <template #birthdayDay="slotProps">
                <div class="col-span-4">
                    <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdayDay">
                        <UiFormItem>
                            <UiAutoFormLabel>{{ $t('account.personalBirthdayLabel') }}</UiAutoFormLabel>
                            <UiSelect v-bind="componentField" :default-value="birthday.getDate()">
                                <UiFormControl>
                                    <UiSelectTrigger>
                                        <UiSelectValue />
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
                            <UiFormMessage />
                        </UiFormItem>
                    </FormField>
                </div>
            </template>

            <template #birthdayMonth="slotProps">
                <div class="col-span-4 grid items-end">
                    <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdayMonth">
                        <UiFormItem>
                            <UiAutoFormLabel class="sr-only">{{ $t('account.personalBirthdaySelectMonth') }}</UiAutoFormLabel>
                            <UiSelect v-bind="componentField" :default-value="birthday.getMonth() + 1">
                                <UiFormControl>
                                    <UiSelectTrigger>
                                        <UiSelectValue />
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

            <template #birthdayYear="slotProps">
                <div class="col-span-4 grid items-end">
                    <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdayYear">
                        <UiFormItem>
                            <UiAutoFormLabel class="sr-only">{{ $t('account.personalBirthdaySelectYear') }}</UiAutoFormLabel>
                            <UiSelect v-bind="componentField" :default-value="birthday.getFullYear()">
                                <UiFormControl>
                                    <UiSelectTrigger>
                                        <UiSelectValue />
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

            <slot name="submit-button">
                <UiButton type="submit" class="col-span-12" :is-loading="isLoading.personalData">
                    {{ $t('global.default.save') }}
                </UiButton>
            </slot>
        </UiAutoForm>
    </slot>

    <slot name="change-mail">
        <AccountPageProfileChangeMail
            :customer="customer"
            :reset-form="resetForm.mail"
            @update-mail="(mailForm: ChangeMailForm) => $emit('update-mail', mailForm)"
        />
    </slot>

    <slot name="change-password">
        <AccountPageProfileChangePassword
            :reset-form="resetForm.password"
            @update-password="(passwordForm: ChangePasswordForm) => $emit('update-password', passwordForm)"
        />
    </slot>
</template>
