import React from "react";
import { Button, ButtonFormat } from "@amplication/ui/design-system";
import "./PendingChangesBar.scss";
import PendingChanges from "./PendingChanges";

const CLASS_NAME = "pending-changes-bar";

type Props = {
  projectId: string;
  handleClick: () => void;
};

const PendingChangesBar = ({ projectId, handleClick }: Props) => {
  return (
    <div className={CLASS_NAME}>
      <div className={`${CLASS_NAME}__heading`}>
        <Button
          buttonFormat={ButtonFormat.Text}
          icon="close"
          iconSize="xsmall"
          onClick={handleClick}
        />
        <h2>Pending Changes</h2>
      </div>
      <PendingChanges projectId={projectId} />
    </div>
  );
};

export default PendingChangesBar;
