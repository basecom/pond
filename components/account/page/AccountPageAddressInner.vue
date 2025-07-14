<script setup lang="ts">
import type { AddressData } from '~/types/vueForm/Address';
import { useToast } from '@/components/ui/toast/use-toast';

const { loadCustomerAddresses, customerAddresses, createCustomerAddress, deleteCustomerAddress, setDefaultCustomerBillingAddress, setDefaultCustomerShippingAddress, updateCustomerAddress } = useAddress();
const { defaultBillingAddressId, defaultShippingAddressId, userDefaultBillingAddress, userDefaultShippingAddress } = useUser();
const { refreshSessionContext } = useSessionContext();
const { handleError } = usePondHandleError();
const { toast } = useToast();
const { t } = useI18n();

const isLoading = ref(false);
const createAddressDialogOpen = ref<boolean>(false);

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
        createAddressDialogOpen.value = false;
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
        await loadCustomerAddresses();
        await refreshSessionContext();
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
    <div class="gap-5 grid grid-cols-2">
        <slot name="headline">
            <h1 class="col-span-2">
                {{ $t('address.accountHeadline') }}
            </h1>
        </slot>

        <slot name="description">
            <h2 class="col-span-2">
                {{ $t('address.accountDescription') }}
            </h2>
        </slot>

        <slot name="create-address">
            <UiDialog v-model:open="createAddressDialogOpen" class="w-full">
                <slot name="create-address-trigger">
                    <UiDialogTrigger class="flex flex-start w-1/2">
                        <UiButton>
                            <Icon name="mdi:plus" class="size-4" />
                            {{ $t('address.createAddress') }}
                        </UiButton>
                    </UiDialogTrigger>
                </slot>

                <slot name="create-address-content">
                    <UiDialogContent class="max-h-4/5 overflow-scroll">
                        <UiDialogHeader>
                            <UiDialogTitle>
                                {{ $t('address.createAddress') }}
                            </UiDialogTitle>
                        </UiDialogHeader>
                        <AddressCreateOrEdit :is-loading="isLoading" @on-submit="(value: AddressData) => createAddress(value)" />
                    </UiDialogContent>
                </slot>
            </UiDialog>
        </slot>

        <slot name="default-billing-address">
            <div class="col-start-1">
                <AddressCardSkeleton v-if="isLoading" />

                <AddressCard
                    v-else
                    :headline="$t('address.defaultBillingAddress.label')"
                    :address="userDefaultBillingAddress"
                />
            </div>
        </slot>

        <slot name="default-shipping-address">
            <AddressCardSkeleton v-if="isLoading" />

            <AddressCard
                v-else
                :headline="$t('address.defaultShippingAddress.label')"
                :address="userDefaultShippingAddress"
            />
        </slot>

        <slot name="available-addresses">
            <slot name="available-addresses-headline">
                <h2 class="col-span-2">
                    {{ $t('address.availableAddresses') }}
                </h2>
            </slot>

            <slot name="available-addresses-content">
                <template v-if="customerAddresses && !isLoading">
                    <div v-for="customerAddress in customerAddresses" :key="customerAddress.id" class="gap-5 flex flex-col">
                        <AddressCard :address="customerAddress" />

                        <div class="flex gap-2">
                            <UiDialog class="w-full">
                                <slot name="edit-address-trigger">
                                    <UiDialogTrigger class="flex flex-start w-full">
                                        <UiButton class="w-full">
                                            <Icon name="mdi:pencil" class="size-4" />
                                            {{ $t('address.editAddress') }}
                                        </UiButton>
                                    </UiDialogTrigger>
                                </slot>

                                <slot name="edit-address-content">
                                    <UiDialogContent class="max-h-4/5 overflow-scroll">
                                        <UiDialogHeader>
                                            <UiDialogTitle>
                                                {{ $t('address.editAddress') }}
                                            </UiDialogTitle>
                                        </UiDialogHeader>
                                        <AddressCreateOrEdit
                                            :is-loading="isLoading"
                                            :address="customerAddress"
                                            @on-submit="(value: AddressData) => editAddress(value, customerAddress.id)"
                                        />
                                    </UiDialogContent>
                                </slot>
                            </UiDialog>

                            <slot name="delete-address">
                                <UiButton
                                    v-if="defaultShippingAddressId !== customerAddress.id && defaultBillingAddressId !== customerAddress.id"
                                    class="w-full"
                                    :is-loading="isLoading"
                                    @click="deleteAddress(customerAddress.id)"
                                >
                                    <Icon name="mdi:delete-forever-outline" class="size-4" />
                                    {{ $t('address.deleteAddress') }}
                                </UiButton>
                            </slot>
                        </div>

                        <slot name="set-as-default-billing-address">
                            <UiButton
                                v-if="defaultBillingAddressId !== customerAddress.id"
                                variant="link"
                                class="pl-0 justify-start"
                                :is-loading="isLoading"
                                @click="setAsDefaultBillingAddress(customerAddress.id)"
                            >
                                <Icon name="mdi:list-box-outline" class="size-4" />
                                {{ $t('address.defaultBillingAddress.setAsDefault') }}
                            </UiButton>
                        </slot>

                        <slot name="set-as-default-shipping-address">
                            <UiButton
                                v-if="defaultShippingAddressId !== customerAddress.id"
                                variant="link"
                                class="pl-0 justify-start"
                                :is-loading="isLoading"
                                @click="setAsDefaultShippingAddress(customerAddress.id)"
                            >
                                <Icon name="mdi:truck-outline" class="size-4" />
                                {{ $t('address.defaultShippingAddress.setAsDefault') }}
                            </UiButton>
                        </slot>
                    </div>
                </template>

                <template v-else>
                    <div v-for="n in 4" :key="n">
                        <AddressCardSkeleton />
                    </div>
                </template>
            </slot>
        </slot>
    </div>
</template>
