export function usePondCms() {
    const { apiClient } = useShopwareContext();
    const { handleError } = usePondHandleError();

    const getCmsPageById = async (id: string) => {
        try {
            return (await apiClient.invoke(`getCmsPage get /cms/${id}`)).data;
        } catch (error) {
            handleError(error);
            return null;
        }
    };

    return { getCmsPageById };
}
