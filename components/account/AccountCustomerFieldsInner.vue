<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      // Additional fields (such as email, password, ...) are required for the registration form. These are displayed depending on this props
      isDetail?: boolean;
      // E.g. registration form wraps the addresses in group elements. To ensure that the conditions are applied correctly (they must include all group elements), this prop is required
      accountTypeConditions?: () => string[];
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
      passwordCols?: Columns
    }>(),
    {
        isDetail: false,
        accountTypeConditions: () => ['accountType', 'business'],
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
            <AccountType />
        </slot>
    </GroupElement>

    <GroupElement name="salutation-and-title">
        <slot name="salutation">
            <AccountSalutation />
        </slot>

        <slot name="title">
            <TextElement
                v-if="showTitle"
                :label="$t('account.customer.title.label')"
                name="title"
                :placeholder="$t('account.customer.title.placeholder')"
                :columns="titleCols"
            />
        </slot>
    </GroupElement>

    <GroupElement name="customer-name">
        <slot name="first-name">
            <TextElement
                :label="$t('account.customer.firstName.label')"
                name="firstName"
                :placeholder="$t('account.customer.firstName.placeholder')"
                rules="required"
                :messages="{ required: $t('account.customer.firstName.errorRequired') }"
                :columns="firstNameCols"
            />
        </slot>

        <slot name="last-name">
            <TextElement
                :label="$t('account.customer.lastName.label')"
                name="lastName"
                :placeholder="$t('account.customer.lastName.placeholder')"
                rules="required"
                :messages="{ required: $t('account.customer.lastName.errorRequired') }"
                :columns="lastNameCols"
            />
        </slot>
    </GroupElement>

    <slot name="birthday">
        <AccountBirthday v-if="showBirthday && isDetail" />
    </slot>

    <GroupElement name="business-customer">
        <slot name="company">
            <TextElement
                name="company"
                :placeholder="$t('account.customer.company.placeholder')"
                :label="$t('account.customer.company.label')"
                rules="required"
                :messages="{ required: $t('account.customer.company.errorRequired') }"
                :conditions="[accountTypeConditions()]"
                :columns="companyCols"
            />
        </slot>

        <slot name="department">
            <TextElement
                name="department"
                :label="$t('account.customer.department.label')"
                :placeholder="$t('account.customer.department.placeholder')"
                :conditions="[accountTypeConditions()]"
                :columns="departmentCols"
            />
        </slot>

        <slot name="vat-id">
            <TextElement
                name="vatId"
                :label="$t('account.customer.vatId.label')"
                :placeholder="$t('account.customer.vatId.placeholder')"
                :conditions="[accountTypeConditions()]"
                :columns="vatIdCols"
            />
        </slot>
    </GroupElement>

    <slot name="email">
        <TextElement
            v-if="isDetail"
            name="email"
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
        <TextElement
            v-if="confirmEmail && isDetail"
            autocomplete="new-user"
            name="email_confirmation"
            :label="$t('account.customer.email.confirm.label')"
            :placeholder="$t('account.customer.email.confirm.placeholder')"
            rules="required|email|max:255"
            :debounce="300"
            :messages="{ email: $t('account.customer.email.errorInvalid'), confirmed: $t('account.customer.email.errorConfirmed'), required: $t('account.customer.email.errorRequired') }"
            :columns="emailCols"
        />
    </slot>

    <slot name="password">
        <TextElement
            v-if="isDetail"
            :label="$t('account.customer.password.label')"
            autocomplete="password"
            name="password"
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
        <TextElement
            v-if="confirmPassword && isDetail"
            autocomplete="new-password"
            name="password_confirmation"
            :label="$t('account.customer.password.confirm.label')"
            input-type="password"
            :placeholder="$t('account.customer.password.confirm.placeholder')"
            :messages="{ required: $t('account.customer.password.errorRequired') }"
            rules="required"
            :columns="passwordCols"
        />
    </slot>
</template>
