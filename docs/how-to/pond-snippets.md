# Pond Snippets

In Pond we use shopware-admin-snippets instead of i18n-snippets, which are provided by the Shopware Admin via a Store API.

## Configuration

Check out the following documentation to see e.g. what the nuxt.config.ts configuration looks like:

https://i18n.nuxtjs.org/docs/guide/lazy-load-translations#basic-usage


The nuxt.config.ts includes the respective ts (currently de-DE.ts and en-GB.ts) files in which the Store API is called and the snippets are returned.
The actual API call has been outsourced to a composable `usePondSnippets`. 

It is also possible to create and use additional snippet files directly in the Nuxt project:

https://i18n.nuxtjs.org/docs/guide/lazy-load-translations#multiple-files-lazy-loading

For further configuration, see the documentation:

https://i18n.nuxtjs.org/docs/guide/lazy-load-translations

## Usage

The usage in the Vue project has not changed. The $t function can still be used:

```
{{ $t('snippets.helloWorld') }}
```

### How do you find and create new snippets?

The Shopware Admin already offers a variety of snippets. Therefore, first check whether a suitable snippet already exists for your use case.
If a snippet already exists, but the value of the snippet is incorrect, the snippet must be overwritten in the PondCompanion project. See the Shopware documentation for details.
If a new snippet needs to be added, this snippet must also be added to the PondCompanion project. See the Shopware documentation for details.

https://developer.shopware.com/docs/guides/plugins/plugins/administration/templates-styling/adding-snippets.html

## Store API

We use the following Store API, which expects the domain url as a parameter

```
'loadSnippets post /pond/snippet': {
        contentType?: 'application/json';
        accept?: 'application/json';
        body?: {
            domainUrl: string,
        };
        response: {
            snippets: {
                [key: string]: string;
            },
            error?: string,
            apiAlias: string,
        };
        responseCode: 200;
    };
```

For further information about the store api, check out the Pond Companion project.