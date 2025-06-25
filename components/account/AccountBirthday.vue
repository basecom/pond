<script setup lang="ts">
const configStore = useConfigStore();

const isBirthdayRequired = ref(configStore.get('core.loginRegistration.birthdayFieldRequired') as boolean);

const birthdayDays = ref(Array.from({ length: 31 }, (_, i) => i + 1));
const birthdayMonths = ref(Array.from({ length: 12 }, (_, i) => i + 1));
const possibleBirthdayYears = computed(() => {
    const years = [];
    const today = new Date();
    // we can not use a foreach here
    // eslint-disable-next-line no-restricted-syntax
    for (let i = (today.getFullYear() - 120); i <= today.getFullYear(); i++) years.push(i);
    return years;
});
</script>

<template>
    <GroupElement name="birthday" :label="$t('account.customer.birthday.label')">
        <SelectElement
            name="birthdayDay"
            :placeholder="$t('account.customer.birthday.day')"
            :rules="isBirthdayRequired ? ['required'] : ''"
            :messages="{ required: $t('account.customer.birthday.errorRequired') }"
            :native="false"
            :can-clear="false"
            :items="birthdayDays"
        />
        <SelectElement
            name="birthdayMonth"
            :placeholder="$t('account.customer.birthday.month')"
            :messages="{ required: $t('account.customer.birthday.errorRequired') }"
            :rules="isBirthdayRequired ? ['required'] : ''"
            :native="false"
            :can-clear="false"
            :items="birthdayMonths"
        />

        <SelectElement
            name="birthdayYear"
            :placeholder="$t('account.customer.birthday.year')"
            :messages="{ required: $t('account.customer.birthday.errorRequired') }"
            :rules="isBirthdayRequired ? ['required'] : ''"
            :native="false"
            :can-clear="false"
            :items="possibleBirthdayYears"
        />
    </GroupElement>
</template>
