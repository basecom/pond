<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      // The detail view includes the fields email, password, vat id and birthday
      isDetail?: boolean;
      /**
       * The AccountType field can be wrapped in GroupElements. For the conditions to assign the correct field, all
       * GroupElements must be included in the condition -> See: https://vueform.com/reference/text-element#option-conditions
       */
      accountTypeConditions?: [];
      accountTypeCols?: Columns;
      salutationCols?: Columns;
      titleCols?: Columns;
      firstNameCols?: Columns;
      lastNameCols?: Columns;
      birthdayCols?: Columns;
      companyCols?: Columns;
      vatIdCols?: Columns;
      departmentCols?: Columns;
      emailCols?: Columns;
      passwordCols?: Columns,
      /**
       * This component can be used multiple times in a form (e.g., registration form). To ensure that the form fields
       * are unique upon submission, it is possible to specify a prefix
       */
      prefix?: string;
    }>(),
    {
        isDetail: false,
        accountTypeConditions: undefined,
        accountTypeCols: () => ({
            sm: 12,
            md: 3,
        }),
        salutationCols: () => ({
            sm: 12,
            md: 3,
        }),
        birthdayCols: () => ({
            sm: 1,
            md: 2,
        }),
        titleCols: () => ({
            sm: 12,
            md: 3,
        }),
        firstNameCols: () => ({
            sm: 12,
            md: 6,
        }),
        lastNameCols: () => ({
            sm: 12,
            md: 6,
        }),
        companyCols: () => ({
            sm: 12,
            md: 6,
        }),
        vatIdCols: () => ({
            sm: 12,
            md: 6,
        }),
        departmentCols: () => ({
            sm: 12,
            md: 6,
        }),
        emailCols: () => ({
            sm: 12,
            md: 6,
        }),
        passwordCols: () => ({
            sm: 12,
            md: 6,
        }),
        prefix: '',
    },
);

const configStore = useConfigStore();

// Admin configs
const showTitle = ref(configStore.get('core.loginRegistration.showTitleField') as boolean);
const confirmEmail = ref(configStore.get('core.loginRegistration.requireEmailConfirmation') as boolean);
const showBirthday = ref(configStore.get('core.loginRegistration.showBirthdayField') as boolean);
const confirmPassword = ref(configStore.get('core.loginRegistration.requirePasswordConfirmation') as boolean);
</script>

<template>
    <GroupElement name="account-type">
        <slot name="account-type">
            <AccountType :prefix="prefix" />
        </slot>
    </GroupElement>

    <GroupElement name="salutation-and-title">
        <slot name="salutation">
            <AccountSalutation :prefix="prefix" />
        </slot>

        <slot name="title">
            <FormTextElement
                v-if="showTitle"
                :id="`${prefix}title`"
                :label="$t('account.customer.title.label')"
                :name="`${prefix}title`"
                :placeholder="$t('account.customer.title.placeholder')"
                :columns="titleCols"
            />
        </slot>
    </GroupElement>

    <GroupElement name="customer-name">
        <slot name="first-name">
            <FormTextElement
                :id="`${prefix}firstName`"
                :label="$t('account.customer.firstName.label')"
                :name="`${prefix}firstName`"
                :placeholder="$t('account.customer.firstName.placeholder')"
                rules="required"
                :messages="{ required: $t('account.customer.firstName.errorRequired') }"
                :columns="firstNameCols"
            />
        </slot>

        <slot name="last-name">
            <FormTextElement
                :id="`${prefix}lastName`"
                :label="$t('account.customer.lastName.label')"
                :name="`${prefix}lastName`"
                :placeholder="$t('account.customer.lastName.placeholder')"
                rules="required"
                :messages="{ required: $t('account.customer.lastName.errorRequired') }"
                :columns="lastNameCols"
            />
        </slot>
    </GroupElement>

    <slot name="birthday">
        <AccountBirthday v-if="showBirthday && isDetail" :prefix="prefix" />
    </slot>

    <GroupElement name="business-customer">
        <slot name="company">
            <FormTextElement
                :id="`${prefix}company`"
                :name="`${prefix}company`"
                :placeholder="$t('account.customer.company.placeholder')"
                :label="$t('account.customer.company.label')"
                rules="required"
                :messages="{ required: $t('account.customer.company.errorRequired') }"
                :conditions="accountTypeConditions"
                :columns="companyCols"
            />
        </slot>

        <slot name="department">
            <FormTextElement
                :id="`${prefix}department`"
                :name="`${prefix}department`"
                :label="$t('account.customer.department.label')"
                :placeholder="$t('account.customer.department.placeholder')"
                :conditions="accountTypeConditions"
                :columns="departmentCols"
            />
        </slot>

        <slot name="vat-id">
            <FormTextElement
                v-if="isDetail"
                :id="`${prefix}vatIds`"
                :name="`${prefix}vatIds`"
                :label="$t('account.customer.vatId.label')"
                :placeholder="$t('account.customer.vatId.placeholder')"
                :conditions="accountTypeConditions"
                :columns="vatIdCols"
            />
        </slot>
    </GroupElement>

    <slot name="email">
        <FormTextElement
            v-if="isDetail"
            :id="`${prefix}email`"
            :name="`${prefix}email`"
            autocomplete="user"
            :label="$t('account.customer.email.label')"
            :placeholder="$t('account.customer.email.placeholder')"
            :rules="confirmEmail ? [
                'required', 'email', 'max:255', 'confirmed'
            ] : [
                'required', 'email', 'max:255'
            ]"
            :debounce="300"
            :messages="{ email: $t('account.customer.email.errorInvalid'), confirmed: $t('account.customer.email.errorConfirmed'), required: $t('account.customer.email.errorRequired') }"
            :columns="emailCols"
        />
    </slot>

    <slot name="email-confirm">
        <FormTextElement
            v-if="confirmEmail && isDetail"
            :id="`${prefix}email_confirmation`"
            autocomplete="new-user"
            :name="`${prefix}email_confirmation`"
            :label="$t('account.customer.email.confirm.label')"
            :placeholder="$t('account.customer.email.confirm.placeholder')"
            rules="required|email|max:255"
            :debounce="300"
            :messages="{ email: $t('account.customer.email.errorInvalid'), confirmed: $t('account.customer.email.errorConfirmed'), required: $t('account.customer.email.errorRequired') }"
            :columns="emailCols"
        />
    </slot>

    <slot name="password">
        <FormTextElement
            v-if="isDetail"
            :id="`${prefix}password`"
            :label="$t('account.customer.password.label')"
            autocomplete="password"
            :name="`${prefix}password`"
            input-type="password"
            :placeholder="$t('account.customer.password.placeholder')"
            :rules="confirmPassword ? [
                'required',
                'confirmed'
            ] : [
                'required'
            ]"
            :debounce="300"
            :messages="{ required: $t('account.customer.password.errorRequired'), confirmed: $t('account.customer.password.errorConfirmed') }"
            :columns="passwordCols"
        />
    </slot>

    <slot name="password-confirm">
        <FormTextElement
            v-if="confirmPassword && isDetail"
            :id="`${prefix}password_confirmation`"
            autocomplete="new-password"
            :name="`${prefix}password_confirmation`"
            :label="$t('account.customer.password.confirm.label')"
            input-type="password"
            :placeholder="$t('account.customer.password.confirm.placeholder')"
            :messages="{ required: $t('account.customer.password.errorRequired') }"
            rules="required"
            :columns="passwordCols"
        />
    </slot>
</template>
