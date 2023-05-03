import {
  Button,
  ButtonFormat,
  ButtonIconPosition,
} from "@amplication/ui/design-system";
import React, { useContext } from "react";
import "./CreateServiceWizard.scss";
import { AppContext } from "../../context/appContext";
import InnerTabLink from "../../Layout/InnerTabLink";

// eslint-disable-next-line @typescript-eslint/ban-types
const CreateServiceWizardFooter: React.FC<{}> = () => {
  const { currentProject, currentWorkspace } = useContext(AppContext);

  return (
    <div className={`create-service-wizard__footer`}>
      <Button
        buttonFormat={ButtonFormat.Outline}
        icon="arrow_left"
        iconPosition={ButtonIconPosition.Left}
        // onClick={}
      >
        {"Back to project"}
      </Button>
      <InnerTabLink
        to={`/${currentWorkspace?.id}/${currentProject?.id}/create-resource/settings/github-sync`}
        icon="settings"
      >
        Settings
      </InnerTabLink>
      <InnerTabLink
        to={`/${currentWorkspace?.id}/${currentProject?.id}/create-resource/settings/generation-settings`}
        icon="settings"
      >
        Settings
      </InnerTabLink>
      <InnerTabLink
        to={`/${currentWorkspace?.id}/${currentProject?.id}/create-resource/settings/repository`}
        icon="settings"
      >
        Repository
      </InnerTabLink>
      <Button
      //onClick={handleCreateServiceClick}
      >
        Continue
      </Button>
    </div>
  );
};

export default CreateServiceWizardFooter;
