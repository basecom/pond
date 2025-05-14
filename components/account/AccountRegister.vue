<script setup lang="ts">
import {ApiClientError} from '@shopware/api-client';
import type {RegisterData} from "./AccountRegisterInner.vue";
import {useToast} from '@/components/ui/toast/use-toast'
import {useCustomerStore} from "#imports";

const isLoading = ref(false);
const errorMessage: Ref<string | undefined> = ref(undefined);

const customerStore = useCustomerStore();
const {t} = useI18n();
const router = useRouter();
const customer = useCustomerStore();
const {toast} = useToast();

// TODO: storefrontUrl seems fishy. Is there a better approach?
/**
 * Helper function to parse the autoForm data into required shopware register API format
 * @param registerData - generated from autoForm
 */
function buildRegisterForm(registerData: RegisterData) {
    // In case of optional input: Make sure that birthdate is always complete
    const isBirthdateComplete = registerData.birthdateDay && registerData.birthdateMonth && registerData.birthdateYear;
    const address = {
        countryId: registerData.countryId,
        countryState: registerData.countryState ?? null,
        salutationId: registerData.salutationId,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        zipcode: registerData.zipcode ?? null,
        city: registerData.city,
        company: registerData.company ?? null,
        street: registerData.street,
        department: registerData.department ?? null,
        title: registerData.title ?? null,
        phoneNumber: registerData.phoneNumber ?? null,
        additionalAddressLine1: registerData.additionalAddressLine1 ?? null,
        additionalAddressLine2: registerData.additionalAddressLine2 ?? null,
    };

    // Calculate shippingAddress depending on form inputs
    let shippingAddress = address;

    if (registerData.deliveryAddressVaries) {
        shippingAddress = {
            countryId: registerData.addressCountryId,
            countryState: registerData.addressCountryState ?? null,
            salutationId: registerData.addressSalutationId,
            firstName: registerData.addressFirstName,
            lastName: registerData.addressLastName,
            zipcode: registerData.addressZipcode ?? null,
            city: registerData.addressCity,
            company: registerData.addressCompany ?? null,
            street: registerData.addressStreet,
            department: registerData.addressDepartment ?? null,
            title: registerData.addressTitle ?? null,
            phoneNumber: registerData.addressPhoneNumber ?? null,
            additionalAddressLine1: registerData.addressAdditionalAddressLine1 ?? null,
            additionalAddressLine2: registerData.addressAdditionalAddressLine2 ?? null,
        }
    }

    return {
        email: registerData.email,
        password: registerData.password,
        salutationId: registerData.salutationId,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        billingAddress: address,
        shippingAddress: shippingAddress,
        birthdayDay: isBirthdateComplete ? registerData.birthdateDay : null,
        birthdayMonth: isBirthdateComplete ? registerData.birthdateMonth : null,
        birthdayYear: isBirthdateComplete ? registerData.birthdateYear : null,
        title: registerData.title ?? null,
        accountType: registerData.accountType ?? null,
        vatIds: registerData.vatNumber ?? null,
        acceptedDataProtection: registerData.acceptedDataProtection ?? true,
        storefrontUrl: customerStore.sessionContext.salesChannel.domains[0].url,
    }
}

const register = async (registerData: RegisterData) => {
    isLoading.value = true;
    errorMessage.value = undefined;

    try {
        const registerForm = buildRegisterForm(registerData);
        await customerStore.register(registerForm);
        toast({
            title: t('account.register.toast.title'),
            description: t('account.register.toast.description'),
        });
        router.push('/');
    } catch (error) {
        if (error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${error.details.errors[0]?.code}`),
                variant: 'destructive'
            })
        }
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    // Ensure that a signed in user will not be able to go to the registration page
    if (customer.signedIn) {
        router.push('/');
    }
})

</script>

<template>
    <AccountRegisterInner
        :is-loading="isLoading"
        :error-message="errorMessage"
        @register="(registerData: RegisterData) => register(registerData)"
    />
</template>
