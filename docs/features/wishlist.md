# Account Management

## Wishlist

In Shopware, a wishlist allows customers to save products they are interested in for future reference or purchase, enhancing the shopping experience by enabling product comparison and planning. It can also help shop owners understand customer preferences and improve product targeting.

### Component Structure

The wishlist page is composed of the following key components:

1. **`pages/account/wishlist.vue`** - Acts as the entry point and renders the `<AccountWishlist />` component. Redirects to a 404 if the wishlist feature is disabled in Shopware.
2. **`components/account/AccountWishlist.vue`** - Handles data fetching for wishlist products, then passes data to `AccountWishlistInner`.
3. **`components/account/AccountWishlistInner.vue`** - A presentational component rendering UI slots for wishlist content, loading state, and empty messages.

#### Layout

The wishlist layout **`layouts/wishlist.vue`** checks login state and renders the `<AccountMenu />` if the user is logged in.

---

### Named Slots

The `AccountWishlistInner.vue` component exposes named slots for UI customization:

| Slot Name             | Description                                                           |
|-----------------------|-----------------------------------------------------------------------|
| `wrapper`             | Wraps the wishlist UI.                                                |
| `headline`            | Overrides the headline.                                               |
| `no-products-message` | Overrides the message to indicate there are no items on the wishlist. |
| `loading-indicator`   | Overrides the loading indicator.                                      |
| `products`            | Wraps the list of wishlist products.                                  |
| `product-card`        | Overrides the product presentation.                                   |

---

### Props

#### `AccountWishlistInner.vue`

| Prop Name       | Type      | Required | Description                                       |
|-----------------|-----------|----------|---------------------------------------------------|
| `wishlistItems` | `array`   | No       | Array of wishlist product objects.                |
| `isLoading`     | `boolean` | No       | Indicates whether data is currently being loaded. |

---

### Usage Example


```vue
<AccountWishlistInner>
    <template #headline>
        <h1 class="text-2xl font-bold text-brand-primary">My Custom Wishlist</h1>
    </template>

    <template #product-card="{ item }">
        <div class="p-4 border border-dashed border-brand-primary rounded-lg">
            <h2 class="font-semibold">{{ item.translated.name }}</h2>
            <p>{{ item.translated.description }}</p>
            <p class="text-brand-primary">{{ item.calculatedPrice.unitPrice }}</p>
        </div>
    </template>
</AccountWishlistInner>
```
