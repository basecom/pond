export function usePondCustomer() {
    const { apiClient } = useShopwareContext();
    const { handleError } = usePondHandleError();

    const recoverPasswordConfirm = async (hashQuery: string, newPassword: string, newPasswordConfirm: string) => {
        try {
            return (await apiClient.invoke(
                'recoveryPassword post /account/recovery-password-confirm',
                {
                    body: {
                        hash: hashQuery,
                        newPassword,
                        newPasswordConfirm,
                    },
                },
            )).status;
        } catch (error) {
            handleError(error);
            return null;
        }
    };

    return { recoverPasswordConfirm };
}
