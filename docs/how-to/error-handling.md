# Http Error Handling

## ErrorLayout
The ErrorLayout component is used to display an error page. It comes with customizable slots that allow you to override key elements of the page, including the title, subtitle, button, layout. This documentation will guide you through how to use and customize these slots.

### Default Structure

By default, the ErrorLayout component includes the following:

| Name      | Comment                                                                                       |
|:----------|:----------------------------------------------------------------------------------------------|
| Title     | A large text that indicates the error (e.g., "Page Not Found")                                |
| Subtitle  | A smaller description of the error (e.g., "Sorry, the page you're looking for doesn't exist") |
| Button    | A button that users can click to navigate back to a home or specific page                     |
| Container | The container for the error message                                                           |
| Wrapper   | The wrapper for the container                                                                 |

### Basic Usage

```vue
<template>
  <ErrorLayout>
    <template #title>
      Page Not Found
    </template>
    <template #subTitle>
      The requested page could not be found
    </template>
    <template #button>
      <div class="text-center"><a href="/">
        <UiButton>Back to homepage</UiButton>
      </a></div>
    </template>
  </ErrorLayout>
</template>
```