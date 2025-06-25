<template>
    <SelectElement
        name="accountType"
        :label="$t('account.customer.accountType.label')"
        :messages="{ required: $t('account.customer.accountType.errorRequired') }"
        rules="required"
        :native="false"
        :can-clear="false"
        :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
        default="private"
    />
</template>
