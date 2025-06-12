# Account Management

## Login

The login flow allows customers to sign in using their email and password. It is built using a layered component structure that separates logic from presentation. Layout and behavior are customizable through named slots and props. The components are used in a full-page login page as well as a modal opening from the header.

---

### Component Structure

The login page is composed of layered components:

1. **`pages/account/login.vue`** – wraps the login component in a responsive layout.
2. **`components/account/AccountLogin.vue`** – handles the login logic (loading state, error handling, redirection).
3. **`components/account/AccountLoginInner.vue`** – provides the form UI and emits the form submission event. Customizable via **named slots**.
---

### Named Slots

The `AccountLoginInner.vue` component exposes named slots for UI customization:

| Slot Name            | Description                               |
|----------------------|-------------------------------------------|
| `headline`           | Optional headline rendered above the form |
| `password-forgotten` | Link to account recovery flow             |
| `submit-button`      | Overwrites the login button               |
| `alert`              | Error shown on login failure              |
| `alert-icon`         | Icon in the alert message                 |

---

### Props

#### `AccountLogin.vue`

| Prop Name     | Type     | Required | Description                                         |
|---------------|----------|----------|-----------------------------------------------------|
| `redirect-to` | `string` | No       | Path to redirect the user to after successful login |

#### `AccountLoginInner.vue`

| Prop Name      | Type               | Required | Description                               |
|----------------|--------------------|----------|-------------------------------------------|
| `isLoading`    | `boolean`          | No       | Controls loading spinner on submit button |
| `errorMessage` | `string \| null`   | No       | Error message shown if login fails        |

---

### Events

#### `AccountLoginInner.vue`

| Event Name | Payload                  | Description                              |
|------------|--------------------------|------------------------------------------|
| `login`    | `{ username, password }` | Emits login data to the parent component |

---

### Usage Example

Here’s how you can use the login form with customized content:

```vue
<!-- components/account/AccountLogin.vue -->
<AccountLogin redirect-to="/dashboard">
    <template #headline>
        <h1 class="text-2xl font-bold mb-2">Welcome Back</h1>
        <p class="text-sm text-gray-500">Log in to access your dashboard</p>
    </template>
</AccountLogin>

<!-- components/account/AccountLoginInner.vue -->
<AccountLoginInner>
    <template #submit-button>
        <UiButton type="submit" class="w-full bg-primary text-white">
            Sign In
        </UiButton>
    </template>

    <template #password-forgotten>
        <NuxtLinkLocale to="/account/recover" class="text-sm text-gray-600 underline">
            Forgot your password?
        </NuxtLinkLocale>
    </template>

    <template #alert-icon>
        <Icon name="mdi:alert" class="text-red-500 mr-2" />
    </template>
</AccountLoginInner>
```


## Account Recovery

The **Account Recovery** page provides users with a secure way to initiate a password reset via email. When a user submits an email address:

- If the email is **registered**, a recovery link is sent and a generic success message is displayed.
- If the email is **not registered**, a generic success message is still displayed to prevent account enumeration.

### Component Structure

This page is composed of layered components:

1. **`pages/account/recover.vue`** – wraps the recovery component in a responsive layout.

2. **`components/account/AccountRecover.vue`** – manages the logic, loading state, and message display.

3. **`components/account/AccountRecoverInner.vue`** – provides the form UI and emits the form submission event. Customizable via **named slots**.

---

### Named Slots

The `AccountRecoverInner.vue` component exposes several named slots for UI customization:

| Slot Name         | Description                                                  |
|-------------------|--------------------------------------------------------------|
| `wrapper`         | Wraps the component, including form and messages             |
| `success-message` | Overrides the default success alert                          |
| `alert-icon`      | Overrides the default success alert icon                     |
| `header`          | Overrides the default heading                                |
| `info-text`       | Overrides the informational text displayed below the heading |
| `form`            | Wraps the form                                               |
| `buttons`         | Wraps the buttons                                            |
| `back-button`     | Overrides the back to login button                           |
| `submit-button`   | Overrides the submit button                                  |

---

### Props

`AccountRecoverInner.vue` accepts two optional props:

| Prop Name            | Type      | Description                                 |
|----------------------|-----------|---------------------------------------------|
| `isLoading`          | `boolean` | Controls a loading spinner on submit button |
| `showSuccessMessage` | `boolean` | Controls whether the success message shows  |

---

### Events

| Event Name | Payload               | Description                      |
|------------|-----------------------|----------------------------------|
| `recover`  | `{ email: string }`   | Emitted when form is submitted   |

---

### Usage Example: Custom Header & Message

```vue
<AccountRecoverInner>
    <template #header>
        <h1 class="text-2xl font-bold text-primary">Reset Your Password</h1>
        <p class="text-sm text-gray-500">Enter your email to receive a recovery link.</p>
        <hr class="my-4" />
    </template>

    <template #success-message>
        <UiAlert variant="successful" class="mb-4">
            <Icon name="mdi:check" class="mr-2" />
            <span>We've sent a link to your inbox—check your email!</span>
        </UiAlert>
    </template>
</AccountRecoverInner>
```

### Technical Notes

This component uses the `resetPassword` method from the `useCustomerPassword` composable under the hood.

You can learn more about the `useCustomerPassword` composable in the Shopware Frontends documentation:  [Shopware Frontends – useCustomerPassword](https://frontends.shopware.com/packages/composables/useCustomerPassword.html)

