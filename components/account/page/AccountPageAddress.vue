<script setup lang="ts">
import type { AddressData } from '~/types/vueForm/Address';

const { loadCustomerAddresses, customerAddresses, createCustomerAddress, deleteCustomerAddress, setDefaultCustomerBillingAddress, setDefaultCustomerShippingAddress, updateCustomerAddress } = useAddress();
const { defaultBillingAddressId, defaultShippingAddressId, userDefaultBillingAddress, userDefaultShippingAddress } = useUser();
const { refreshSessionContext } = useSessionContext();
const { handleError } = usePondHandleError();
const { toast } = usePondToast();
const { t } = useI18n();

const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    await loadCustomerAddresses();
    isLoading.value = false;
});

const createAddress = async (value: AddressData) => {
    isLoading.value = true;

    try {
        await createCustomerAddress(value);
        await refreshSessionContext();
        await loadCustomerAddresses();
        toast({
            title: t('address.createdAddress'),
        });
    } catch (error) {
        handleError(error);
    } finally {
        isLoading.value = false;
    }
};

const deleteAddress = async (addressId: string) => {
    isLoading.value = true;

    try {
        await deleteCustomerAddress(addressId);
        await refreshSessionContext();
        await loadCustomerAddresses();
        toast({
            title: t('address.deletedAddress'),
        });
    } catch (error) {
        handleError(error);
    } finally {
        isLoading.value = false;
    }
};

const setAsDefaultBillingAddress = async (addressId: string) => {
    isLoading.value = true;

    try {
        await setDefaultCustomerBillingAddress(addressId);
        await refreshSessionContext();
        await loadCustomerAddresses();
        toast({
            title: t('address.defaultBillingAddress.success'),
        });
    } catch (error) {
        handleError(error);
    } finally {
        isLoading.value = false;
    }
};

const setAsDefaultShippingAddress = async (addressId: string) => {
    isLoading.value = true;

    try {
        await setDefaultCustomerShippingAddress(addressId);
        await refreshSessionContext();
        await loadCustomerAddresses();
        toast({
            title: t('address.defaultShippingAddress.success'),
        });
    } catch (error) {
        handleError(error);
    } finally {
        isLoading.value = false;
    }
};

const editAddress = async (address: AddressData, addressId: string) => {
    isLoading.value = true;

    try {
        const updatedAddress = {
            ...address,
            id: addressId,
        };

        await updateCustomerAddress(updatedAddress);
        await refreshSessionContext();
        await loadCustomerAddresses();
        toast({
            title: t('address.updatedAddress'),
        });
    } catch (error) {
        handleError(error);
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <AccountPageAddressInner
        :is-loading="isLoading"
        :addresses="customerAddresses"
        :default-billing-address="userDefaultBillingAddress"
        :default-shipping-address="userDefaultShippingAddress"
        :default-billing-address-id="defaultBillingAddressId"
        :default-shipping-address-id="defaultShippingAddressId"
        @create-address="(value: AddressData) => createAddress(value)"
        @edit-address="(value: AddressData, id: string) => editAddress(value, id)"
        @delete-address="(id: string) => deleteAddress(id)"
        @set-as-default-billing-address="(id: string) => setAsDefaultBillingAddress(id)"
        @set-as-default-shipping-address="(id: string) => setAsDefaultShippingAddress(id)"
    />
</template>
