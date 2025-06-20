<script setup lang="ts">

const configStore = useConfigStore();

const isFieldRequired = ref('required');
const showAccountType = configStore.get('core.loginRegistration.showAccountTypeSelection') as boolean;

const onSubmit = (FormData, form$) => {
  console.log('submit', FormData, form$);
}
</script>

<template>
  <Vueform :display-errors="false" :endpoint="async function(FormData, form$){
  const formData = FormData // FormData instance
  const data = form$.data // form data including conditional data
  const requestData = form$.requestData // form data excluding conditional data
console.log('data', data);
  // handle form submission
}" :show-required="['label']">
    <GroupElement
        name="personal_information"
        label="Personal information"
    >
      <!-- Basic elements -->
      <TextElement
          label="First Name"
          name="firstname"
          placeholder="First hallo"
          :rules="isFieldRequired"
          :messages="{required: 'Hallo ich werde gebraucht'}"
          :columns="6"
      />
      <TextElement
          name="lastname"
          placeholder="Last name"
          rules="required"
          :columns="6"
      />
    </GroupElement>

    <AccountTestSub />
    <!-- Bestätigen ToDo Check -> v-if einbauen für admin configs -->
    <GroupElement
        name="account_information"
        label="Account information"
    >
      <TextElement
          name="email"
          placeholder="Email address"
          :rules="['required', 'email', 'max:255', 'confirmed']"
          :debounce="300"
          :messages="{email: 'ich bin nicht richtig', confirmed: 'ich bin nicht gleich'}"
      />
      <TextElement
          name="email_confirmation"
          placeholder="Email address"
          rules="required|email|max:255"
          :debounce="300"
      />
      <TextElement
          name="password"
          input-type="password"
          placeholder="Password"
          :rules="[
          'required',
          'confirmed'
        ]"
          :debounce="300"
          :messages="{
          regex: 'The Password must at least 8 characters long and contain at least one number, one uppercase and one lowercase character.'
        }"
      />
      <TextElement
          name="password_confirmation"
          input-type="password"
          placeholder="Password again"
          rules="required"
      />
    </GroupElement>

    <!-- Account type -> Hidden fields -->
    <GroupElement
        name="salary_settings"
        label="Payment"
        v-if="showAccountType"
    >
      <SelectElement
          name="has_salary"
          placeholder="Select"
          floating="Salary"
          rules="required"
          :native="false"
          :can-clear="false"
          :items="{ 1: 'Paid', 0: 'Unpaid' }"
          :columns="{
              xs: 12, sm: 12, md: 3, lg: 3
            }"
      />
      <TextElement
          name="salary"
          placeholder="Amount"
          rules="required|integer"
          :can-clear="false"
          :conditions="[
              ['salary_settings.has_salary', 1]
            ]"
          :columns="{
              xs: 12, sm: 12, md: 3, lg: 3
            }"
      />
      <SelectElement
          name="salary_currency"
          default="usd"
          :native="false"
          :can-clear="false"
          :items="{
              usd: 'USD',
              eur: 'EUR'
            }"
          :conditions="[
              ['salary_settings.has_salary', 1]
            ]"
          :columns="{
              xs: 12, sm: 12, md: 3, lg: 3
            }"
      />
      <SelectElement
          name="salary_period"
          default="weekly"
          :native="false"
          :can-clear="false"
          :items="{
              hourly: '/ hour',
              daily: '/ day',
              weekly: '/ week',
              monthly: '/ month'
            }"
          :conditions="[
              ['salary_settings.has_salary', 1]
            ]"
          :columns="{
              xs: 12, sm: 12, md: 3, lg: 3
            }"
      />
    </GroupElement>

    <ButtonElement
        name="submit"
        add-class="mt-2"
        submits
    >
      Register
    </ButtonElement>
  </Vueform>
</template>
