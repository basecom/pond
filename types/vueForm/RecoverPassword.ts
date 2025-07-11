export type RecoverPasswordFormData = {
    newPassword: string;
    newPassword_confirmation: string;
}

export type RecoverPasswordFormSubmitData = {
    data: RecoverPasswordFormData;
}
