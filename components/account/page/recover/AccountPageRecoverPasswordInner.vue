<script setup lang="ts">
const configStore = useConfigStore();

const passwordMinLength = configStore.get('core.loginRegistration.passwordMinLength') as number;
const passwordMinRule = ref(`min:${passwordMinLength}`);
</script>
<template>
  <!-- Todo: Wrapper classes als props -->
  <!-- ToDo: Loading -->
  <div class="grid gap-5">
    <slot name="headline">
      <h1> {{ $t('account.recover.header') }} </h1>
    </slot>

    <slot name="form">
      <Vueform
          :display-errors="false"
          :loading="false"
          :endpoint="false"
          :show-required="['label']"
      >
        <slot name="new-password">
          <FormTextElement
              id="newPassword"
              :label="$t('account.recover.password.new.label')"
              autocomplete="password"
              name="newPassword"
              input-type="password"
              :placeholder="$t('account.recover.password.new.placeholder')"
              :rules="[
                'required',
                'confirmed',
                passwordMinRule
            ]"
              :debounce="300"
              :messages="{ required: $t('account.customer.password.errorRequired'), confirmed: $t('account.customer.password.errorConfirmed'), min: $t('account.customer.password.errorMin', { number: passwordMinLength }) }"
          />
        </slot>

        <slot name="new-password-confirm">
          <FormTextElement
              id="newPasswordConfirm"
              autocomplete="new-password"
              name="newPasswordConfirm"
              :label="$t('account.recover.password.newConfirm.label')"
              input-type="password"
              :placeholder="$t('account.recover.password.newConfirm.placeholder')"
              :messages="{ required: $t('account.customer.password.errorRequired') }"
              rules="required"
          />
        </slot>

        <slot name="recover-submit-button">
          <UiButton
              id="recover-submit"
              type="submit"
              name="recover-submit"
              class="col-span-12"
          >
            {{ $t('account.recover.submitRecoverButton') }}
          </UiButton>
        </slot>
      </Vueform>
    </slot>
  </div>
</template>