<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { AddressData } from '~/types/vueForm/Address';

withDefaults(
    defineProps<{
      isLoading?: boolean;
      addresses?: Schemas['CustomerAddress'][];
      defaultBillingAddress?: Schemas['CustomerAddress'];
      defaultShippingAddress?: Schemas['CustomerAddress'];
      defaultBillingAddressId?: string | null;
      defaultShippingAddressId?: string | null;
    }>(),
    {
        isLoading: false,
        addresses: undefined,
        defaultBillingAddress: undefined,
        defaultShippingAddress: undefined,
        defaultBillingAddressId: null,
        defaultShippingAddressId: null,
    },
);

defineEmits<{
  'create-address': [value: AddressData];
  'edit-address': [value: AddressData, id: string];
  'delete-address': [id: string];
  'set-as-default-billing-address': [id: string];
  'set-as-default-shipping-address': [id: string];
}>();
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
            <UiDialog class="w-full">
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
                        <AddressCreateOrEdit :is-loading="isLoading" @on-submit="(value: AddressData) => $emit('create-address', value)" />
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
                    :address="defaultBillingAddress"
                />
            </div>
        </slot>

        <slot name="default-shipping-address">
            <AddressCardSkeleton v-if="isLoading" />

            <AddressCard
                v-else
                :headline="$t('address.defaultShippingAddress.label')"
                :address="defaultShippingAddress"
            />
        </slot>

        <slot name="available-addresses">
            <slot name="available-addresses-headline">
                <h2 class="col-span-2">
                    {{ $t('address.availableAddresses') }}
                </h2>
            </slot>

            <slot name="available-addresses-content">
                <template v-if="addresses && !isLoading">
                    <div v-for="address in addresses" :key="address.id" class="gap-5 flex flex-col">
                        <AddressCard :address="address" />

                        <div class="flex gap-2 ">
                            <UiDialog class="w-full">
                                <slot name="edit-address-trigger">
                                    <UiDialogTrigger class="flex flex-start w-1/2">
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
                                            :address="address"
                                            @on-submit="(value: AddressData) => $emit('edit-address', value, address.id)"
                                        />
                                    </UiDialogContent>
                                </slot>
                            </UiDialog>

                            <slot name="delete-address">
                                <UiButton
                                    v-if="defaultShippingAddressId !== address.id && defaultBillingAddressId !== address.id"
                                    class="w-1/2"
                                    :is-loading="isLoading"
                                    @click="$emit('delete-address', address.id)"
                                >
                                    <Icon name="mdi:delete-forever-outline" class="size-4" />
                                    {{ $t('address.deleteAddress') }}
                                </UiButton>
                            </slot>
                        </div>

                        <slot name="set-as-default-billing-address">
                            <UiButton
                                v-if="defaultBillingAddressId !== address.id"
                                variant="link"
                                class="pl-0 justify-start"
                                :is-loading="isLoading"
                                @click="$emit('set-as-default-billing-address', address.id)"
                            >
                                <Icon name="mdi:list-box-outline" class="size-4" />
                                {{ $t('address.defaultBillingAddress.setAsDefault') }}
                            </UiButton>
                        </slot>

                        <slot name="set-as-default-shipping-address">
                            <UiButton
                                v-if="defaultShippingAddressId !== address.id"
                                variant="link"
                                class="pl-0 justify-start"
                                :is-loading="isLoading"
                                @click="$emit('set-as-default-shipping-address', address.id)"
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
