import {
  Button,
  Dialog,
  ButtonIconPosition,
  ButtonFormat,
} from "@amplication/ui/design-system";
import React, { useCallback, useState } from "react";
import "./AddNewProject.scss";
import NewProject from "./NewProject";

const CLASS_NAME = "add-new-project";

const AddNewProject = () => {
  const [projectDialogStatus, setProjectDialogStatus] =
    useState<boolean>(false);

  const handleNewProjectClick = useCallback(() => {
    setProjectDialogStatus(!projectDialogStatus);
  }, [projectDialogStatus, setProjectDialogStatus]);

  const handleProjectCreated = useCallback(() => {
    setProjectDialogStatus(false);
  }, [setProjectDialogStatus]);

  return (
    <>
      <Dialog
        className="new-entity-dialog"
        isOpen={projectDialogStatus}
        onDismiss={handleNewProjectClick}
        title="Create new project"
      >
        <NewProject onProjectCreated={handleProjectCreated} />
      </Dialog>
      <Button
        onClick={handleNewProjectClick}
        type="button"
        buttonFormat={ButtonFormat.Text}
        icon="plus"
        iconPosition={ButtonIconPosition.Left}
      >
        Add New Project
      </Button>
    </>
  );
};

export default AddNewProject;
