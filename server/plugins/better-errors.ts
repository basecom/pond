// @see https://github.com/nuxt/nuxt/issues/30102#issuecomment-2681019319

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('error', async (error, { event }) => {
        // Don't log 404 errors
        if ('statusCode' in error && error.statusCode === 404) {
            return;
        }

        console.error(`${event?.path} Application Error:`, error)
    });
});