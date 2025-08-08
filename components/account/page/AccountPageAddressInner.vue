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

const { getStyle } = usePondStyle();
const dialogOpen = ref(false);
</script>

<template>
    <div :class="getStyle('account.address.outer')">
        <slot name="headline">
            <h1 :class="getStyle('account.address.headline')">
                {{ $t('address.accountHeadline') }}
            </h1>
        </slot>

        <slot name="description">
            <h2 :class="getStyle('account.address.headline')">
                {{ $t('address.accountDescription') }}
            </h2>
        </slot>

        <slot name="create-address">
            <UiDialog v-model:open="dialogOpen" :class="getStyle('account.address.dialog.outer')">
                <slot name="create-address-trigger">
                    <UiDialogTrigger :class="getStyle('account.address.trigger.outer')">
                        <UiButton>
                            <Icon name="mdi:plus" :class="getStyle('account.address.icon')" />
                            {{ $t('address.createAddress') }}
                        </UiButton>
                    </UiDialogTrigger>
                </slot>

                <slot name="create-address-content">
                    <UiDialogContent :class="getStyle('account.address.dialog.inner')">
                        <UiDialogHeader>
                            <UiDialogTitle>
                                {{ $t('address.createAddress') }}
                            </UiDialogTitle>
                        </UiDialogHeader>
                        <AddressCreateOrEdit
                            :is-loading="isLoading"
                            @on-submit="(value: AddressData) => {
                                $emit('create-address', value);
                                dialogOpen = false;
                            }"
                        />
                    </UiDialogContent>
                </slot>
            </UiDialog>
        </slot>

        <slot name="available-addresses">
            <slot name="available-addresses-headline">
                <h3 :class="getStyle('account.address.subHeadline')">
                    {{ $t('address.availableAddresses') }}
                </h3>
            </slot>

            <slot name="available-addresses-content">
                <template v-if="addresses && !isLoading">
                    <div
                        v-for="address in addresses"
                        :key="address.id"
                        :class="getStyle('account.address.availableAddresses.outer')"
                    >
                        <AddressCard
                            :address="address"
                            :is-default-shipping-address="defaultShippingAddressId === address.id"
                            :is-default-billing-address="defaultBillingAddressId === address.id"
                        />

                        <slot name="set-as-default-billing-address">
                            <UiButton
                                v-if="defaultBillingAddressId !== address.id"
                                variant="link"
                                :class="getStyle('account.address.setDefaultAddressButton')"
                                :is-loading="isLoading"
                                @click="$emit('set-as-default-billing-address', address.id)"
                            >
                                <Icon name="mdi:list-box-outline" :class="getStyle('account.address.icon')" />
                                <span :class="getStyle('account.address.text')">
                                    {{ $t('address.defaultBillingAddress.setAsDefault') }}
                                </span>
                            </UiButton>
                        </slot>

                        <slot name="set-as-default-shipping-address">
                            <UiButton
                                v-if="defaultShippingAddressId !== address.id"
                                variant="link"
                                :class="getStyle('account.address.setDefaultAddressButton')"
                                :is-loading="isLoading"
                                @click="$emit('set-as-default-shipping-address', address.id)"
                            >
                                <Icon name="mdi:truck-outline" :class="getStyle('account.address.icon')" />
                                <span :class="getStyle('account.address.text')">
                                    {{ $t('address.defaultShippingAddress.setAsDefault') }}
                                </span>
                            </UiButton>
                        </slot>

                        <div :class="getStyle('account.address.availableAddresses.inner')">
                            <UiDialog :class="getStyle('account.address.dialog')">
                                <slot name="edit-address-trigger">
                                    <UiDialogTrigger :class="getStyle('account.address.trigger.outer')">
                                        <UiButton :class="getStyle('account.address.editOrCreateAddressButton.trigger')" variant="secondary">
                                            <Icon name="mdi:pencil" :class="getStyle('account.address.icon')" />
                                            <span :class="getStyle('account.address.text')">
                                                {{ $t('address.editAddress') }}
                                            </span>
                                        </UiButton>
                                    </UiDialogTrigger>
                                </slot>

                                <slot name="edit-address-content">
                                    <UiDialogContent :class="getStyle('account.address.dialog.inner')">
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
                                <UiDialog
                                    v-if="defaultShippingAddressId !== address.id && defaultBillingAddressId !== address.id"
                                    :class="getStyle('account.address.dialog')"
                                >
                                    <slot name="delete-address-trigger">
                                        <UiDialogTrigger :class="getStyle('account.address.trigger.outer')">
                                            <UiButton variant="secondary" :class="getStyle('account.address.editOrCreateAddressButton.trigger')">
                                                <Icon name="mdi:delete-forever-outline" :class="getStyle('account.address.icon')" />
                                                <span :class="getStyle('account.address.text')">
                                                    {{ $t('address.deleteAddress') }}
                                                </span>
                                            </UiButton>
                                        </UiDialogTrigger>
                                    </slot>

                                    <slot name="delete-address-content">
                                        <UiDialogContent :class="getStyle('account.address.dialog.inner')">
                                            <UiDialogHeader>
                                                <UiDialogTitle>
                                                    {{ $t('address.deleteAddress') }}
                                                </UiDialogTitle>
                                            </UiDialogHeader>

                                            {{ $t('address.deleteAddressDescription') }}
                                            <div :class="getStyle('account.address.deleteAddress.outer')">
                                                <UiButton
                                                    :is-loading="isLoading"
                                                    :class="getStyle('account.address.deleteAddress.button')"
                                                    @click="$emit('delete-address', address.id)"
                                                >
                                                    <Icon name="mdi:delete-forever-outline" :class="getStyle('account.address.icon')" />
                                                    {{ $t('address.deleteAddress') }}
                                                </UiButton>

                                                <UiDialogClose
                                                    :class="[getStyle('account.address.deleteAddress.button'), getStyle('ui.button.base'), getStyle('ui.button.variants.secondary')]"
                                                >
                                                    {{ $t('general.cancel') }}
                                                </UiDialogClose>
                                            </div>
                                        </UiDialogContent>
                                    </slot>
                                </UiDialog>
                            </slot>
                        </div>
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
