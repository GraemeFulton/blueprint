/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import classNames from "classnames";
import * as React from "react";

import { IconName } from "@blueprintjs/icons";

import {
    AbstractPureComponent,
    Classes,
    DISPLAYNAME_PREFIX,
    HTMLDivProps,
    Intent,
    IntentProps,
    MaybeElement,
    Props,
} from "../../common";
import { H5 } from "../html/html";
import { Icon } from "../icon/icon";

/** This component also supports the full range of HTML `<div>` props. */
export interface CalloutProps extends IntentProps, Props, HTMLDivProps {
    /** Callout contents. */
    children?: React.ReactNode;

    /**
     * Name of a Blueprint UI icon (or an icon element) to render on the left side.
     *
     * If this prop is omitted or `undefined`, the `intent` prop will determine a default icon.
     * If this prop is explicitly `null`, no icon will be displayed (regardless of `intent`).
     */
    icon?: IconName | MaybeElement;

    /**
     * Visual intent color to apply to background, title, and icon.
     *
     * Defining this prop also applies a default icon, if the `icon` prop is omitted.
     */
    intent?: Intent;

    /**
     * String content of optional title element.
     *
     * Due to a conflict with the HTML prop types, to provide JSX content simply
     * pass `<H4>JSX title content</H4>` as first `children` element instead of
     * using this prop (note uppercase tag name to use the Blueprint Heading
     * component).
     */
    title?: string;
}

/**
 * Callout component.
 *
 * @see https://blueprintjs.com/docs/#core/components/callout
 */
export class Callout extends AbstractPureComponent<CalloutProps> {
    public static displayName = `${DISPLAYNAME_PREFIX}.Callout`;

    public render() {
        const { className, children, icon, intent, title, ...htmlProps } = this.props;
        const iconName = this.getIconName(icon, intent);
        const classes = classNames(
            Classes.CALLOUT,
            Classes.intentClass(intent),
            { [Classes.CALLOUT_ICON]: iconName != null },
            className,
        );

        return (
            <div className={classes} {...htmlProps}>
                {iconName && <Icon icon={iconName} aria-hidden={true} tabIndex={-1} />}
                {title && <H5>{title}</H5>}
                {children}
            </div>
        );
    }

    private getIconName(icon?: CalloutProps["icon"], intent?: Intent): IconName | MaybeElement {
        // 1. no icon
        if (icon === null) {
            return undefined;
        }
        // 2. defined iconName prop
        if (icon !== undefined) {
            return icon;
        }
        // 3. default intent icon
        switch (intent) {
            case Intent.DANGER:
                return "error";
            case Intent.PRIMARY:
                return "info-sign";
            case Intent.WARNING:
                return "warning-sign";
            case Intent.SUCCESS:
                return "tick";
            default:
                return undefined;
        }
    }
}
