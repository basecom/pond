<script setup lang="ts">


</script>

<template>
  <AddressFormFieldsInner>
    <template #headline><slot name="headline" /></template>

    <template #street><slot name="street" /></template>

    <template #zipCode><slot name="zipCode" /></template>

    <template #city><slot name="city" /></template>

    <template #country><slot name="country" /></template>

    <template #state><slot name="state" /></template>

  </AddressFormFieldsInner>
</template>
