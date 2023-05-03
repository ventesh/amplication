import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { Icon, IconSize } from "../Icon/Icon";

import "./Button.scss";

export enum ButtonStyle {
  Regular = "regular",
  Success = "success",
  Danger = "danger",
}

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum ButtonFormat {
  Primary = "primary",
  Outline = "outline",
  Text = "text",
}

export enum IconPosition {
  Left = "left",
  Right = "right",
}

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonFormat?: ButtonFormat;
  buttonSize?: ButtonSize;
  buttonStyle?: ButtonStyle;
  icon?: string;
  iconSize?: IconSize;
  iconPosition?: IconPosition;
  iconClassName?: string;
  children?: React.ReactNode;
}

const CLASS_NAME = "amplication-button";

export const Button = ({
  buttonStyle = ButtonStyle.Regular,
  buttonSize = ButtonSize.Small,
  buttonFormat = ButtonFormat.Primary,
  className,
  icon,
  iconSize = calcIconSize(buttonSize),
  iconClassName,
  iconPosition = IconPosition.Right,
  disabled,
  children,
  ...rest
}: Props) => {
  return (
    <button
      className={classNames(
        CLASS_NAME,
        className,
        buttonFormat,
        buttonSize,
        { [buttonStyle]: !disabled && buttonStyle },
        disabled,
        {
          "icon-right": icon && children && iconPosition === IconPosition.Right,
        },
        { "icon-left": icon && children && iconPosition === IconPosition.Left },
        { "icon-only": icon && !children }
      )}
      disabled={disabled}
      {...rest}
    >
      {iconPosition === IconPosition.Right && children}
      {icon && (
        <Icon
          icon={icon}
          size={iconSize}
          className={classNames(`${CLASS_NAME}__icon`, iconClassName)}
        />
      )}
      {iconPosition === IconPosition.Left && children}
    </button>
  );
};

const calcIconSize = (buttonSize: ButtonSize): IconSize => {
  switch (buttonSize) {
    case ButtonSize.Large:
      return "medium";
    case ButtonSize.Medium:
      return "small";
    case ButtonSize.Small:
      return "xsmall";
    default:
      return "medium";
  }
};
