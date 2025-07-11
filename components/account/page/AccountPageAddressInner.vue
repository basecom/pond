<script setup lang="ts">

const { loadCustomerAddresses, customerAddresses } = useAddress();
const { customer } = useCustomerStore();

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await loadCustomerAddresses();
  isLoading.value = false;
})
</script>

<template>
  <div class="gap-5 grid grid-cols-2">
    <slot name="headline">
      <h1 class="col-span-2">
        {{ $t('address.accountHeadline')}}
      </h1>
    </slot>

    <slot name="description">
      <h2 class="col-span-2">
        {{ $t('address.accountDescription') }}
      </h2>
    </slot>

    <slot name="add-new-address">
      <UiButton>
        <Icon name="mdi:plus" class="size-4" />
        {{ $t('address.addNewAddress') }}
      </UiButton>
    </slot>

    <slot name="default-billing-address">
      <div class="col-start-1">
        <AddressCardSkeleton v-if="!customer.defaultBillingAddress" />

        <AddressCard
            v-if="customer.defaultBillingAddress"
            :headline="$t('address.defaultBillingAddress')"
            :address="customer.defaultBillingAddress"
        />
      </div>
    </slot>

    <slot name="default-shipping-address">
      <AddressCardSkeleton v-if="!customer.defaultShippingAddress" />

      <AddressCard
          v-if="customer.defaultShippingAddress"
          :headline="$t('address.defaultShippingAddress')"
          :address="customer.defaultShippingAddress"
      />
    </slot>

    <slot name="available-addresses">
      <!-- ToDo: Loading -->
      <template v-if="customerAddresses && !isLoading">
        {{customerAddresses}}
      </template>
      <template v-else>
        <AddressCardSkeleton />
      </template>
    </slot>
  </div>
</template>