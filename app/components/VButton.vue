<script lang="ts">
import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { NuxtLink } from '#components'

type ElementClass = string | false | null | undefined
export const props = {
    tag: [String, Boolean] as PropType<string | false>,
    iconName: String,
    label: [String, Boolean] as PropType<string | false>,
    to: [Object, String] as PropType<RouteLocationRaw>,
    href: [Object, String] as PropType<RouteLocationRaw>, // alias for `to` (same as <NuxtLink>)
    iconLast: { type: Boolean, default: true },
    iconClass: [String, Array] as PropType<ElementClass | ElementClass[]>,
    labelClass: [String, Array] as PropType<ElementClass | ElementClass[]>,
    disabled: Boolean,
}

export default defineComponent({
    props,
    setup(props, { slots, attrs }) {
        const internalTag = computed(() => {
            if (typeof props.tag === 'string') return props.tag
            else if (props.to || props.href) return NuxtLink
            else return 'button'
        })
        const internalTarget = computed(() => {
            if (typeof attrs.target === 'string') return attrs.target

            const url = typeof props.to === 'string' ? props.to : typeof props.href === 'string' ? props.href : ''

            if (!url || !isExternalUrl(url)) return

            return '_blank'
        })
        const hasIconSlot = computed(() => !!slots.icon)
        const hasIcon = computed(() => hasIconSlot.value || !!props.iconName)
        const hasLabel = computed(() => !!slots.default || !!props.label)

        const $style = useCssModule()
        const rootClasses = computed(() => {
            return [
                $style.root,
                props.iconLast && $style['root--icon-last'],
                hasLabel.value && $style['root--has-label'],
                hasIcon.value && $style['root--has-icon'],
                props.disabled && $style['root--disabled'],
            ]
        })

        return {
            internalTag,
            internalTarget,
            hasIconSlot,
            hasIcon,
            hasLabel,
            rootClasses,
        }
    },
})
</script>

<template>
    <component :is="internalTag" :class="rootClasses" :to="to" :href="href" :target="internalTarget"
        :disabled="internalTag === 'button' && disabled ? true : undefined">
        <slot name="icon" :icon-name="iconName" :icon-class="[$style.icon, iconClass]">
            <VIcon v-if="iconName" :class="[$style.icon, iconClass]" :name="iconName" mode="mask" />
        </slot>
        <span v-if="hasLabel" :class="[$style.label, labelClass]">
            <slot>{{ label }}</slot>
        </span>
    </component>
</template>

<style lang="scss" module>
.root {
    display: var(--v-button-display, inline-flex);
    align-items: var(--v-button-align-items, center);
    justify-content: var(--v-button-justify-content, center);
    padding: var(--v-button-padding, initial);
    border: var(--v-button-border, initial);
    background-color: var(--v-button-background-color, initial);
    font-family: var(--v-button-font-family, var(--typography-family-label));
    text-decoration: var(--v-button-text-decoration, none);
    user-select: none;

    // PROPS STYLE
    &--icon-last {
        flex-direction: row-reverse;
    }

    &:not(:where([inert], #{&}--disabled)) {
        cursor: var(--v-button-cursor, pointer);
    }

    // DISABLED
    &:where([inert], #{&}--disabled, [disabled]) {
        color: var(--v-button-disabled-color, lightgray);
        pointer-events: none; // prevents click on disabled link (<a> or <nuxt-link>)
    }

    @at-root {

        // remove the user agent style, but without specificity (i.e. :where()) for overriding it easily
        :where(button#{&}),
        :where(a#{&}:link),
        :where(a#{&}:where(:visited)) {
            color: inherit;
        }

        // remove the user agent style, but without specificity (i.e. :where()) for overriding it easily
        :where(button#{&}) {
            text-align: inherit;
        }
    }
}

// be aware than all nested svg are styled
.icon {
    flex-shrink: var(--v-button-icon-flex-shrink, 0);

    // Nuxt/icon render background-image instead mask-image
    // that make the color customisation impossible
    // https://github.com/nuxt/icon/issues/367
    color: var(--v-button-icon-color, inherit);
}

.label {
    overflow: var(--v-button-label-overflow, hidden);
    text-overflow: var(--v-button-label-text-overflow, ellipsis);
    white-space: var(--v-button-label-white-space, nowrap);
}
</style>
