import React from "react";
import { Meta } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "ButtonV3",
  component: Button,
};

export const Default = (args: any) => {
  return <Button {...args}>Example</Button>;
};

export const WithIcon = (props: any) => {
  return (
    <Button
      buttonStyle={props.buttonStyle}
      icon="info"
      iconSize={props.iconSize}
      iconClassName={props.iconStyle}
      iconPosition={props.iconPosition}
    >
      Example
    </Button>
  );
};
