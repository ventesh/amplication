import React from "react";
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

export enum ButtonType {
  Primary = "primary",
  Outline = "outline",
  Text = "text",
}

export enum IconPosition {
  Left = "left",
  Right = "right",
}

export interface Props {
  /** The display style of the button */
  className?: string;
  buttonStyle?: ButtonStyle;
  buttonSize?: ButtonSize;
  buttonType?: ButtonType;
  icon?: string;
  iconSize?: IconSize;
  iconClassName?: string;
  /** Icon can have left or right position. Default position is right */
  iconPosition?: IconPosition;
  children?: React.ReactNode;
}

const CLASS_NAME = "amplication-button";

export const Button = ({
  buttonStyle = ButtonStyle.Regular,
  buttonSize = ButtonSize.Medium,
  buttonType = ButtonType.Primary,
  className,
  children,
  icon,
  iconSize = calcIconSize(buttonSize),
  iconClassName,
  iconPosition = IconPosition.Right,
  ...rest
}: Props) => {
  return (
    <button
      className={classNames(
        CLASS_NAME,
        className,
        buttonStyle,
        buttonType,
        buttonSize,
        { "right-icon": icon && iconPosition === IconPosition.Right },
        { "left-icon": icon && iconPosition === IconPosition.Left }
      )}
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
