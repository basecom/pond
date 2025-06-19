<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';
import { ApiClientError } from '@shopware/api-client';
import type { ChangePasswordForm } from '~/components/account/page/AccountPageProfileChangePasswordInner.vue';
import type { ChangeMailForm } from '~/components/account/page/AccountPageProfileChangeMailInner.vue';
import type { PersonalDataForm } from '~/components/account/page/AccountPageProfileInner.vue';

const { t } = useI18n();
const customerStore = useCustomerStore();
const { updatePersonalInfo, updateEmail } = useUser();
const { updatePassword } = useCustomerPassword();
const { toast } = useToast();

const { customer } = storeToRefs(customerStore);
const isLoading = ref({
    personalData: false,
    mail: false,
    password: false,
});

const resetForm = ref({
    mail: false,
    password: false,
});

const doUpdatePersonalData = async (personalDataForm: PersonalDataForm) => {
    isLoading.value.personalData = true;

    try {
        /**
       * The Store API expects VAT IDs as arrays. Since the VAT ID can be changed in the frontend, the field type is a
       * string. Therefore, the type must be adjusted for the Store API.
       */
        personalDataForm.vatIds = [personalDataForm.vatIds];
        if (personalDataForm.vatIds && typeof personalDataForm.vatIds === 'string') {
            personalDataForm.vatIds = [personalDataForm.vatIds];
        } else if (!personalDataForm.vatIds) {
            personalDataForm.vatIds = [];
        }
        await updatePersonalInfo(personalDataForm);
        await customerStore.refreshContext();
        toast({
            title: t('account.personalProfile.status.changePersonalDataSuccessfully.title'),
            description: t('account.personalProfile.status.changePersonalDataSuccessfully.description'),
        });
    } catch (error) {
        if (error instanceof ApiClientError) {
            const errorCode = error.details?.errors?.[0]?.code ?? 'GENERAL';
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${errorCode}`),
                variant: 'destructive',
            });
        }
    } finally {
        isLoading.value.personalData = false;
    }
};

const doUpdateEmail = async (mailForm: ChangeMailForm) => {
    isLoading.value.mail = true;

    try {
        await updateEmail(mailForm);
        await customerStore.refreshContext();
        toast({
            title: t('account.personalProfile.status.changeMailSuccessfully.title'),
            description: t('account.personalProfile.status.changeMailSuccessfully.description'),
        });
        resetForm.value.mail = true;
    } catch (error) {
        if (error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${ error.details.errors[0]?.code}`),
                variant: 'destructive',
            });
        }
    } finally {
        isLoading.value.mail = false;
    }
};

const doUpdatePassword = async (passwordForm: ChangePasswordForm) => {
    isLoading.value.password = true;

    try {
        await updatePassword(passwordForm);
        toast({
            title: t('account.personalProfile.status.changePasswordSuccessfully.title'),
            description: t('account.personalProfile.status.changePasswordSuccessfully.description'),
        });
        resetForm.value.password = true;
    } catch (error) {
        if (error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${ error.details.errors[0]?.code}`),
                variant: 'destructive',
            });
        }
    } finally {
        isLoading.value.password = false;
    }
};
</script>

<template>
    <AccountPageProfileInner
        v-if="customer"
        :customer="customer"
        :is-loading="isLoading"
        :reset-form="resetForm"
        @update-personal-data="(personalDataForm: PersonalDataForm) => doUpdatePersonalData(personalDataForm)"
        @update-mail="(mailForm: ChangeMailForm) => doUpdateEmail(mailForm)"
        @update-password="(passwordForm: ChangePasswordForm) => doUpdatePassword(passwordForm)"
    />
</template>
