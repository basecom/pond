<script setup lang="ts">

const { getStyle } = usePondStyle();
</script>

<template>
  <slot name="header-search">
    <!-- ToDo: Remove clientonly -->
    <ClientOnly>
      <Vueform
          id="header-search-form"
          :display-errors="false"
          class="w-max"
      >
        <UiTextElement
            id="header-search-input"
            name="search"
            icon="mdi:magnify"
            :iconClasses="getStyle('header.actions.search')"
        >
        </UiTextElement>
      </Vueform>
    </ClientOnly>
  </slot>
</template>
