
import { joinURL } from 'ufo'
import { I18N_DEFAULT_LOCALE } from '~/constants/i18n'
import type { WebResponse } from '~/composables/use-page'

export function usePageHead(webResponse: WebResponse) {
    const route = useRoute()
    const runtimeConfig = useRuntimeConfig()
    const siteUrl = runtimeConfig.public.site.url

    const alternate_languages = webResponse.data?.alternate_languages || []
    const alternateLinks = alternate_languages.map((alternateLink) => {
        return {
            hid: `alternate-${alternateLink.lang}`,
            rel: 'alternate',
            hreflang: alternateLink.lang,
            href: joinURL(siteUrl, alternateLink.locale || '', route.path),
        }
    })

    useHead({
        htmlAttrs: { lang: I18N_DEFAULT_LOCALE, },
        script: [],
        link: [
            {
                rel: 'canonical',
                href: joinURL(siteUrl, webResponse.data?.url || route.path),
            },
            ...alternateLinks
        ],
        meta: [
            {
                name: 'version',
                content: runtimeConfig.public.version
            },
        ],
    })
}
