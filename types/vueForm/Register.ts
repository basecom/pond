

export type RegisterVueFormData = {
    requestData: VueFormRequestData;
}

export type VueFormRequestData = {
    acceptedDataProtection: boolean;
    accountType: string;
    additionalAddressLine1?: string;
    additionalAddressLine2?: string;
    birthdayDay?: number;
    birthdayMonth?: number;
    birthdayYear?: number;
    city: string;
    countryId: string
    differentShippingAddress: boolean;
    email: string;
    email_confirmation?: string;
    firstName: string
    lastName: string
    password: string;
    password_confirmation?: string;
    phoneNumber: string;
    salutation: string;
    'shipping-accountType': string;
    'shipping-additionalAddressLine1'?: string;
    'shipping-additionalAddressLine2'?: string;
    'shipping-city': string;
    'shipping-countryId': string;
    'shipping-firstName': string;
    'shipping-lastName': string;
    'shipping-phoneNumber': string;
    'shipping-salutation': string;
    'shipping-state': string;
    'shipping-street': string;
    'shipping-title'?: string;
    'shipping-zipcode': string;
    state: string;
    street: string;
    title?: string;
    zipcode: string;
}
