import { joinURL } from 'ufo'
import type { WebResponse } from '~/composables/use-page'

export function usePageSeoMeta(webResponse: WebResponse) {
    const config = useRuntimeConfig()
    const siteName = config.public.site.name
    const siteUrl = config.public.site.url

    const title = webResponse.data?.meta_title || webResponse.data?.title || siteName
    const description = webResponse.data?.meta_description || webResponse.data?.description
    const apiImgUrl = webResponse.data?.meta_image || webResponse.data?.image

    const generateImg = useImage()
    const image = apiImgUrl
        ? generateImg(
            apiImgUrl,
            {
                fit: 'crop',
                width: 1200,
                height: 700,
            },
            {
                provider: 'imgix',
            },
        )
        : joinURL(siteUrl, '/share.jpg')

    const { path } = useRoute()

    useSeoMeta({
        ogSiteName: siteName,
        ogTitle: title,
        description,
        ogDescription: description,
        twitterDescription: description,
        twitterCard: 'summary',
        twitterTitle: title,
        ogImage: image,
        ogImageWidth: '1200',
        ogImageHeight: '700',
        twitterImage: image,
        ogUrl: joinURL(siteUrl, webResponse.data?.url || path),
    })
}
