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

const birthday = new Date(props.customer.birthday);
console.log(props.customer.birthday)
console.log(birthday, birthday.getMonth())

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

    <UiAutoForm
        v-auto-animate
        class="grid gap-4 md:grid-cols-2"
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
            birthday: { label: $t('account.customer.birthday') },
        }"
        @submit="changePersonalData"
    >
        <template #accountType="slotProps">
            <div class="md:col-span-2">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <template #salutationId>
            <div class="md:col-span-2">
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
            <div class="md:col-span-2">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <template #birthday="slotProps">
            <div class="md:col-span-2 grid grid-cols-3 gap-4 items-end">
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

                <FormField v-slot="{ componentField }" name="birthdayMonth">
                    <UiFormItem>
                        <UiSelect v-bind="componentField" :default-value="birthday.getMonth()">
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

                <FormField v-slot="{ componentField }" name="birthdayYear">
                    {{ birthday.getFullYear() }}
                </FormField>
            </div>
        </template>

        <slot name="submit-button">
            <UiButton type="submit" class="md:col-span-2">
                {{ $t('general.save') }}
            </UiButton>
        </slot>
    </UiAutoForm>

    <AccountPageProfileChangeMail
        :customer="customer"
        @update-mail="(mailForm: ChangeMailForm) => $emit('update-mail', mailForm)"
    />

    <AccountPageProfileChangePassword @update-password="(passwordForm: ChangePasswordForm) => $emit('update-password', passwordForm)" />
</template>
