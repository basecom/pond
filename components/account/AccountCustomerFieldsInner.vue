<script setup lang="ts">
import type { Columns } from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      // The detail view includes the fields email, password, vat id and birthday
      isDetail?: boolean;
      accountTypeConditions?: [];
      /**
       * This component can be used multiple times in a form (e.g., registration form). To ensure that the form fields
       * are unique upon submission, it is possible to specify a prefix
       */
      prefix?: string;
      isVatIdRequiredBySelectedCountry?: boolean;
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
    }>(),
    {
        isDetail: false,
        accountTypeConditions: undefined,
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
        prefix: '',
        isVatIdRequiredBySelectedCountry: false,
    },
);

const configStore = useConfigStore();

// Admin configs
const showTitle = ref(configStore.get('core.loginRegistration.showTitleField') as boolean);
const confirmEmail = ref(configStore.get('core.loginRegistration.requireEmailConfirmation') as boolean);
const showBirthday = ref(configStore.get('core.loginRegistration.showBirthdayField') as boolean);
const confirmPassword = ref(configStore.get('core.loginRegistration.requirePasswordConfirmation') as boolean);
const showAccountType = ref(configStore.get('core.loginRegistration.showAccountTypeSelection') as boolean);
</script>

<template>
    <GroupElement name="account-type">
        <slot name="account-type">
            <AccountType v-if="showAccountType" :prefix="prefix" :columns="accountTypeColumns" />
        </slot>
    </GroupElement>

    <GroupElement name="salutation-and-title">
        <slot name="salutation">
            <AccountSalutation :prefix="prefix" :columns="salutationColumns" />
        </slot>

        <slot name="title">
            <UiTextElement
                v-if="showTitle"
                :id="`${prefix}title`"
                :label="$t('account.personalTitleLabel')"
                :name="`${prefix}title`"
                :placeholder="$t('account.personalTitlePlaceholder')"
                :columns="titleColumns"
            />
        </slot>
    </GroupElement>

    <GroupElement name="customer-name">
        <slot name="first-name">
            <UiTextElement
                :id="`${prefix}firstName`"
                :label="$t('account.personalFirstNameLabel')"
                :name="`${prefix}firstName`"
                :placeholder="$t('account.personalFirstNamePlaceholder')"
                rules="required"
                :messages="{ required: $t('account.personalFirstNameRequired') }"
                :columns="firstNameColumns"
            />
        </slot>

        <slot name="last-name">
            <UiTextElement
                :id="`${prefix}lastName`"
                :label="$t('account.personalLastNameLabel')"
                :name="`${prefix}lastName`"
                :placeholder="$t('account.personalLastNamePlaceholder')"
                rules="required"
                :messages="{ required: $t('account.personalLastNameRequired') }"
                :columns="lastNameColumns"
            />
        </slot>
    </GroupElement>

    <slot name="birthday">
        <AccountBirthday v-if="showBirthday && isDetail" :prefix="prefix" />
    </slot>

    <GroupElement name="business-customer">
        <slot name="company">
            <UiTextElement
                :id="`${prefix}company`"
                :name="`${prefix}company`"
                :placeholder="$t('address.companyNamePlaceholder')"
                :label="$t('address.companyNameLabel')"
                rules="required"
                :messages="{ required: $t('address.companyNameRequired') }"
                :conditions="accountTypeConditions"
                :columns="companyColumns"
            />
        </slot>

        <slot name="department">
            <UiTextElement
                :id="`${prefix}department`"
                :name="`${prefix}department`"
                :label="$t('address.companyDepartmentLabel')"
                :placeholder="$t('address.companyDepartmentPlaceholder')"
                :conditions="accountTypeConditions"
                :columns="departmentColumns"
            />
        </slot>

        <slot name="vat-id">
            <UiTextElement
                v-if="isDetail && !isVatIdRequiredBySelectedCountry"
                :id="`${prefix}vatIds`"
                :name="`${prefix}vatIds`"
                :label="$t('address.companyVatLabel')"
                :placeholder="$t('address.companyVatPlaceholder')"
                :conditions="accountTypeConditions"
                :columns="vatIdColumns"
            />
            <UiTextElement
                v-if="isDetail && isVatIdRequiredBySelectedCountry"
                :id="`${prefix}vatIds`"
                :name="`${prefix}vatIds`"
                :label="$t('address.companyVatLabel')"
                :placeholder="$t('address.companyVatPlaceholder')"
                :conditions="accountTypeConditions"
                :columns="vatIdColumns"
                :messages="{ required: $t('address.companyVatRequired') }"
                rules="required"
            />
        </slot>
    </GroupElement>

    <slot name="email">
        <UiTextElement
            v-if="isDetail"
            :id="`${prefix}email`"
            :name="`${prefix}email`"
            autocomplete="user"
            :label="$t('account.personalMailLabel')"
            :placeholder="$t('account.personalMailPlaceholder')"
            :rules="confirmEmail ? [
                'required', 'email', 'confirmed'
            ] : [
                'required', 'email'
            ]"
            :debounce="300"
            :messages="{ email: $t('account.emailInvalid'), confirmed: $t('account.personalMailConfirmationInvalidMessage'), required: $t('account.emailRequired') }"
            :columns="emailColumns"
        />
    </slot>

    <slot name="email-confirm">
        <UiTextElement
            v-if="confirmEmail && isDetail"
            :id="`${prefix}email_confirmation`"
            autocomplete="new-user"
            :name="`${prefix}email_confirmation`"
            :label="$t('account.personalMailConfirmationLabel')"
            :placeholder="$t('account.personalMailConfirmationPlaceholder')"
            rules="required|email"
            :debounce="300"
            :messages="{ email: $t('account.emailInvalid'), required: $t('account.emailRequired') }"
            :columns="emailColumns"
        />
    </slot>

    <slot name="password">
        <AccountPassword
            v-if="isDetail"
            :password-id="`${prefix}password`"
            :password-label="$t('account.personalPasswordLabel')"
            :password-name="`${prefix}password`"
            :password-placeholder="$t('account.personalPasswordPlaceholder')"
            :password-confirm-id="`${prefix}password_confirmation`"
            :password-confirm-name="`${prefix}password_confirmation`"
            :password-confirm-label="$t('account.personalPasswordConfirmationLabel')"
            :password-confirm-placeholder="$t('account.personalPasswordConfirmationPlaceholder')"
            :columns="passwordColumns"
            :show-confirm="confirmPassword"
        />
    </slot>
</template>
