<script setup lang="ts">

withDefaults(
    defineProps<{
      // Additional fields (such as email, password, ...) are required for the registration form. These are displayed depending on this props
      isDetail?: boolean;
      // E.g. registration form wraps the addresses in group elements. To ensure that the conditions are applied correctly (they must include all group elements), this prop is required
      accountTypeConditions?: () => [string, string];
    }>(),
    {
        isDetail: false,
        accountTypeConditions: () => ['accountType', 'business'],
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
    <slot name="account-type">
        <AccountType />
    </slot>

    <slot name="salutation">
        <AccountSalutation />
    </slot>

    <slot name="title">
        <TextElement
            v-if="showTitle"
            :label="$t('account.customer.title.label')"
            name="title"
            :placeholder="$t('account.customer.title.placeholder')"
        />
    </slot>

    <slot name="first-name">
        <TextElement
            :label="$t('account.customer.firstName.label')"
            name="firstName"
            :placeholder="$t('account.customer.firstName.placeholder')"
            rules="required"
            :messages="{ required: $t('account.customer.firstName.errorRequired') }"
        />
    </slot>

    <slot name="last-name">
        <TextElement
            :label="$t('account.customer.lastName.label')"
            name="lastName"
            :placeholder="$t('account.customer.lastName.placeholder')"
            rules="required"
            :messages="{ required: $t('account.customer.lastName.errorRequired') }"
        />
    </slot>

    <slot name="birthday">
        <AccountBirthday v-if="showBirthday && isDetail" />
    </slot>

    <slot name="company">
        <TextElement
            name="company"
            :placeholder="$t('account.customer.company.placeholder')"
            :label="$t('account.customer.company.label')"
            rules="required"
            :messages="{ required: $t('account.customer.company.errorRequired') }"
            :conditions="[accountTypeConditions]"
        />
    </slot>

    <slot name="department">
        <TextElement
            name="department"
            :label="$t('account.customer.department.label')"
            :placeholder="$t('account.customer.department.placeholder')"
            :conditions="[accountTypeConditions]"
        />
    </slot>

    <slot name="vat-id">
        <TextElement
            name="vatId"
            :label="$t('account.customer.vatId.label')"
            :placeholder="$t('account.customer.vatId.placeholder')"
            :conditions="[accountTypeConditions]"
        />
    </slot>

    <slot name="email">
        <TextElement
            v-if="isDetail"
            name="email"
            :label="$t('account.customer.email.label')"
            :placeholder="$t('account.customer.email.placeholder')"
            :rules="confirmEmail ? [
                'required', 'email', 'max:255', 'confirmed'
            ] : [
                'required', 'email', 'max:255'
            ]"
            :debounce="300"
            :messages="{ email: $t('account.customer.email.errorInvalid'), confirmed: $t('account.customer.email.errorConfirmed'), required: $t('account.customer.email.errorRequired') }"
        />
    </slot>

    <slot name="email-confirm">
        <TextElement
            v-if="confirmEmail && isDetail"
            name="email_confirmation"
            :label="$t('account.customer.email.confirm.label')"
            :placeholder="$t('account.customer.email.confirm.placeholder')"
            rules="required|email|max:255"
            :debounce="300"
            :messages="{ email: $t('account.customer.email.errorInvalid'), confirmed: $t('account.customer.email.errorConfirmed'), required: $t('account.customer.email.errorRequired') }"
        />
    </slot>

    <slot name="password">
        <TextElement
            v-if="isDetail"
            :label="$t('account.customer.password.label')"
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
        />
    </slot>

    <slot name="password-confirm">
        <TextElement
            v-if="confirmPassword && isDetail"
            name="password_confirmation"
            :label="$t('account.customer.password.confirm.label')"
            input-type="password"
            :placeholder="$t('account.customer.password.confirm.placeholder')"
            :messages="{ required: $t('account.customer.password.errorRequired') }"
            rules="required"
        />
    </slot>
</template>
