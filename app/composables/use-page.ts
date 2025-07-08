export interface AlternateLink {
    locale?: string
    lang?: string
    title?: string
    url?: string
}

export interface WebResponseData {
    title: string
    description?: string
    image?: string
    meta_title?: string
    meta_description?: string
    meta_image?: string
    url?: string
    alternate_languages?: AlternateLink[]
    type?: string
}

export interface WebResponse {
    data: WebResponseData
    head?: Record<string, unknown>
    maxAge?: number // TTL in seconds
}

export function usePage(webResponse: WebResponse) {
    const nextPage = useNextPage()
    const currentPage = useCurrentPage()

    nextPage.value = webResponse
    const config = useRuntimeConfig()

    // Set html head data
    const pageTitle = `${webResponse?.data?.title} | ${config.public.site.name}`
    useHead({
        title: pageTitle,
    })
    usePageHead(webResponse)
    usePageSeoMeta(webResponse)

    // update 
    const app = useNuxtApp()
    app.hook('page:transition:finish', () => {
        console.log('page:transition:finish')
        currentPage.value = { ...nextPage.value }

    })
}
