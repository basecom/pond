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
      columns?: {
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
      }
    }>(),
    {
        isDetail: false,
        accountTypeConditions: undefined,
        columns: () => ({
            accountTypeColumns: {
                sm: 12,
                md: 3,
            },
            salutationColumns: {
                sm: 12,
                md: 3,
            },
            birthdayColumns: {
                sm: 1,
                md: 2,
            },
            titleColumns: {
                sm: 12,
                md: 3,
            },
            firstNameColumns: {
                sm: 12,
                md: 6,
            },
            lastNameColumns: {
                sm: 12,
                md: 6,
            },
            companyColumns: {
                sm: 12,
                md: 6,
            },
            vatIdColumns: {
                sm: 12,
                md: 6,
            },
            departmentColumns: {
                sm: 12,
                md: 6,
            },
            emailColumns: {
                sm: 12,
                md: 6,
            },
            passwordColumns: {
                sm: 12,
                md: 6,
            },
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
const passwordMinLength = configStore.get('core.loginRegistration.passwordMinLength') as number;
const passwordMinRule = ref(`min:${passwordMinLength}`);
</script>

<template>
    <GroupElement name="account-type">
        <slot name="account-type">
            <AccountType v-if="showAccountType" :prefix="prefix" />
        </slot>
    </GroupElement>

    <GroupElement name="salutation-and-title">
        <slot name="salutation">
            <AccountSalutation :prefix="prefix" />
        </slot>

        <slot name="title">
            <UiTextElement
                v-if="showTitle"
                :id="`${prefix}title`"
                :label="$t('account.customer.title.label')"
                :name="`${prefix}title`"
                :placeholder="$t('account.customer.title.placeholder')"
                :columns="columns.titleColumns"
            />
        </slot>
    </GroupElement>

    <GroupElement name="customer-name">
        <slot name="first-name">
            <UiTextElement
                :id="`${prefix}firstName`"
                :label="$t('account.customer.firstName.label')"
                :name="`${prefix}firstName`"
                :placeholder="$t('account.customer.firstName.placeholder')"
                rules="required"
                :messages="{ required: $t('account.customer.firstName.errorRequired') }"
                :columns="columns.firstNameColumns"
            />
        </slot>

        <slot name="last-name">
            <UiTextElement
                :id="`${prefix}lastName`"
                :label="$t('account.customer.lastName.label')"
                :name="`${prefix}lastName`"
                :placeholder="$t('account.customer.lastName.placeholder')"
                rules="required"
                :messages="{ required: $t('account.customer.lastName.errorRequired') }"
                :columns="columns.lastNameColumns"
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
                :placeholder="$t('account.customer.company.placeholder')"
                :label="$t('account.customer.company.label')"
                rules="required"
                :messages="{ required: $t('account.customer.company.errorRequired') }"
                :conditions="accountTypeConditions"
                :columns="columns.companyColumns"
            />
        </slot>

        <slot name="department">
            <UiTextElement
                :id="`${prefix}department`"
                :name="`${prefix}department`"
                :label="$t('account.customer.department.label')"
                :placeholder="$t('account.customer.department.placeholder')"
                :conditions="accountTypeConditions"
                :columns="columns.departmentColumns"
            />
        </slot>

        <slot name="vat-id">
            <UiTextElement
                v-if="isDetail && !isVatIdRequiredBySelectedCountry"
                :id="`${prefix}vatIds`"
                :name="`${prefix}vatIds`"
                :label="$t('account.customer.vatId.label')"
                :placeholder="$t('account.customer.vatId.placeholder')"
                :conditions="accountTypeConditions"
                :columns="columns.vatIdColumns"
            />
            <UiTextElement
                v-if="isDetail && isVatIdRequiredBySelectedCountry"
                :id="`${prefix}vatIds`"
                :name="`${prefix}vatIds`"
                :label="$t('account.customer.vatId.label')"
                :placeholder="$t('account.customer.vatId.placeholder')"
                :conditions="accountTypeConditions"
                :columns="columns.vatIdColumns"
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
            :label="$t('account.customer.email.label')"
            :placeholder="$t('account.customer.email.placeholder')"
            :rules="confirmEmail ? [
                'required', 'email', 'confirmed'
            ] : [
                'required', 'email'
            ]"
            :debounce="300"
            :messages="{ email: $t('account.customer.email.errorInvalid'), confirmed: $t('account.customer.email.errorConfirmed'), required: $t('account.customer.email.errorRequired') }"
            :columns="columns.emailColumns"
        />
    </slot>

    <slot name="email-confirm">
        <UiTextElement
            v-if="confirmEmail && isDetail"
            :id="`${prefix}email_confirmation`"
            autocomplete="new-user"
            :name="`${prefix}email_confirmation`"
            :label="$t('account.customer.email.confirm.label')"
            :placeholder="$t('account.customer.email.confirm.placeholder')"
            rules="required|email"
            :debounce="300"
            :messages="{ email: $t('account.customer.email.errorInvalid'), required: $t('account.customer.email.errorRequired') }"
            :columns="columns.emailColumns"
        />
    </slot>

    <slot name="password">
        <UiTextElement
            v-if="isDetail"
            :id="`${prefix}password`"
            :label="$t('account.customer.password.label')"
            autocomplete="password"
            :name="`${prefix}password`"
            input-type="password"
            :placeholder="$t('account.customer.password.placeholder')"
            :rules="confirmPassword ? [
                'required',
                'confirmed',
                passwordMinRule
            ] : [
                'required',
                passwordMinRule
            ]"
            :debounce="300"
            :messages="{ required: $t('account.customer.password.errorRequired'), confirmed: $t('account.customer.password.errorConfirmed'), min: $t('account.customer.password.errorMin', { number: passwordMinLength }) }"
            :columns="columns.passwordColumns"
        />
    </slot>

    <slot name="password-confirm">
        <UiTextElement
            v-if="confirmPassword && isDetail"
            :id="`${prefix}password_confirmation`"
            autocomplete="new-password"
            :name="`${prefix}password_confirmation`"
            :label="$t('account.customer.password.confirm.label')"
            input-type="password"
            :placeholder="$t('account.customer.password.confirm.placeholder')"
            :messages="{ required: $t('account.customer.password.errorRequired') }"
            rules="required"
            :columns="columns.passwordColumns"
        />
    </slot>
</template>
