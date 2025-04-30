<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import type {ChangePasswordForm} from '~/components/account/page/AccountPageProfileChangePasswordInner.vue';
import type {ChangeMailForm} from '~/components/account/page/AccountPageProfileChangeMailInner.vue';
import type * as z from 'zod';
import {getTranslatedProperty} from '@shopware/helpers';

const props = defineProps<{
    customer: Schemas['Customer'];
}>();

const emits = defineEmits<{
    'update-personal-data': [personalDataForm: PersonalDataForm];
    'update-mail': [mailForm: ChangeMailForm];
    'update-password': [passwordForm: ChangePasswordForm];
}>();

const { getPersonalDataForm, getPersonalDataDependencies } = usePondForm();
const { getSalutations: salutations } = useSalutations();
const schema = getPersonalDataForm(props.customer);
const dependencies = getPersonalDataDependencies();
export type PersonalDataForm = z.infer<typeof schema>;

const birthday = new Date(props.customer.birthday ?? '');
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
        <h1 class="mb-4 text-xl font-bold md:mb-6 md:text-2xl">{{ $t('account.profile') }}</h1>
    </slot>

    <!-- personal data -->
    <slot name="personal-data-headline">
        <h3 class="mb-2 border-b border-gray-100 pb-2 text-lg font-bold md:mb-4">
            {{ $t('account.overview.personalData') }}
        </h3>
    </slot>

    <slot name="form">
        <UiAutoForm
            v-auto-animate
            class="grid grid-cols-12 gap-4"
            :schema="schema"
            :dependencies="dependencies"
            :field-config="{
                accountType: { label: $t('account.customer.accountType') },
                salutationId: { label: $t('account.customer.salutation') },
                title: { label: $t('account.customer.title') },
                firstName: { label: $t('account.customer.firstName') },
                lastName: { label: $t('account.customer.lastName') },
                company: { label: $t('account.customer.companyName') },
                vatIds: { label: $t('account.customer.vat') },
                birthdayDay: { label: $t('account.customer.birthday') },
            }"
            @submit="changePersonalData"
        >
            <template #accountType="slotProps">
                <div class="col-span-12">
                    <UiAutoFormField v-bind="slotProps" />
                </div>
            </template>

            <template #salutationId>
                <div class="col-span-12">
                    <FormField v-slot="{ componentField }" name="salutationId">
                        <UiFormItem>
                            <UiAutoFormLabel>{{ $t('account.customer.salutation') }}</UiAutoFormLabel>
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

            <template #birthdayDay>
                <div class="col-span-4">
                    <FormField v-slot="{ componentField }" name="birthdayDay">
                        <UiFormItem>
                            <UiAutoFormLabel>{{ $t('account.customer.birthday') }}</UiAutoFormLabel>
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

            <template #birthdayMonth>
                <div class="col-span-4 grid items-end">
                    <FormField v-slot="{ componentField }" name="birthdayMonth">
                        <UiFormItem>
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

            <template #birthdayYear>
                <div class="col-span-4 grid items-end">
                    <FormField v-slot="{ componentField }" name="birthdayYear">
                        <UiFormItem>
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
                <UiButton type="submit" class="col-span-12">
                    {{ $t('general.save') }}
                </UiButton>
            </slot>
        </UiAutoForm>
    </slot>

    <slot name="change-mail">
        <AccountPageProfileChangeMail
            :customer="customer"
            @update-mail="(mailForm: ChangeMailForm) => $emit('update-mail', mailForm)"
        />
    </slot>

    <slot name="change-password">
        <AccountPageProfileChangePassword @update-password="(passwordForm: ChangePasswordForm) => $emit('update-password', passwordForm)" />
    </slot>
</template>
