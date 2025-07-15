import svgLoader from 'vite-svg-loader'
import { version } from './package.json'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@nuxt/ui'],
    devtools: { enabled: true },
    css: ['~/assets/scss/main.css'],
    // components: [
    // 	'~/app/components/atoms',
    // 	'~/app/components/molecules',
    // 	'~/app/components/organisms',
    // 	'~/app/components/layouts',
    // ],
    runtimeConfig: {
        public: {
            version,
            site: {
                name: '',
                url: '',
                env: '',
            },
        },
    },
    // future: {
    // 	compatibilityVersion: 4,
    // },
    srcDir: 'app',
    compatibilityDate: '2025-05-15',
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/scss/_resources.scss" as *;',
                    quietDeps: true,
                },
            },
        },
        plugins: [
            tailwindcss(),
            // https://github.com/jpkleemans/vite-svg-loader?tab=readme-ov-file#setup
            svgLoader({
                svgoConfig: {
                    multipass: true,
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    removeTitle: false,
                                    // viewBox is required to resize SVGs with CSS.
                                    // @see https://github.com/svg/svgo/issues/1128
                                    removeViewBox: false,
                                },
                            },
                        },
                    ],
                },
                defaultImport: 'url',
            }),
        ],
    },
    postcss: {
        plugins: {
            // https://github.com/cuth/postcss-pxtorem?tab=readme-ov-file#options
            'postcss-pxtorem': {
                propList: ['*'],
                exclude: /(node_modules|scss\/export)/i,
            },
        },
    },
    eslint: {
        config: {
            stylistic: {
                indent: 4,
            },
        },
    },
    // https://nuxt.com/modules/icon#usage
    // icon: {
    //     componentName: 'NuxtIcon',
    //     class: '',
    //     fallbackToApi: false,
    //     localApiEndpoint: '/_nuxt_icon',
    //     customCollections: [
    //         {
    //             normalizeIconName: false,
    //             prefix: 'icon',
    //             dir: './assets/images/icons',
    //         },
    //     ],
    // },
    // https://image.nuxt.com/get-started/configuration
    image: {
        quality: 75,
        screens: {
            xs: 375, // override nuxt/img sizes to match our breakpoints
            sm: 480, // override
            vl: 1280, // override
            xl: 1440, // override
            xxl: 1600, // override
            hd: 1920, // additional size
            qhd: 2500, // additional size
        },
        // @ts-expect-error not working with [1]
        densities: '1',
        presets: {
            default: {
                sizes: 'xs:100vw md:100vw lg:100vw vl:100vw xl:100vw hd:100vw qhd:100vw',
            },
        },
    },
})
