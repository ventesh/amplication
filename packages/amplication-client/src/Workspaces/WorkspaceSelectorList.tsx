import { gql, useQuery } from "@apollo/client";
import {
  ButtonFormat,
  CircularProgress,
  ButtonIconPosition,
} from "@amplication/ui/design-system";
import { Button } from "../Components/Button";
import * as models from "../models";
import WorkspaceSelectorListItem from "./WorkspaceSelectorListItem";

type TData = {
  workspaces: models.Workspace[];
};

const CLASS_NAME = "workspaces-selector__list";

type Props = {
  selectedWorkspace: models.Workspace;
  onWorkspaceSelected: (workspaceId: string) => void;
  onNewWorkspaceClick: () => void;
};

function WorkspaceSelectorList({
  selectedWorkspace,
  onWorkspaceSelected,
  onNewWorkspaceClick,
}: Props) {
  const { data, loading } = useQuery<TData>(GET_WORKSPACES);

  return (
    <div className={CLASS_NAME}>
      {loading ? (
        <CircularProgress centerToParent />
      ) : (
        <>
          {data?.workspaces.map((workspace) => (
            <WorkspaceSelectorListItem
              onWorkspaceSelected={onWorkspaceSelected}
              workspace={workspace}
              selected={selectedWorkspace.id === workspace.id}
              key={workspace.id}
            />
          ))}

          <hr className={`${CLASS_NAME}__divider`} />

          <div className={`${CLASS_NAME}__new`}>
            <Button
              buttonFormat={ButtonFormat.Text}
              disabled={loading}
              icon="plus"
              className={`${CLASS_NAME}__button`}
              iconPosition={ButtonIconPosition.Left}
              onClick={onNewWorkspaceClick}
            >
              Create new workspace
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default WorkspaceSelectorList;

const GET_WORKSPACES = gql`
  query getWorkspaces {
    workspaces {
      id
      name
      subscription {
        id
        subscriptionPlan
      }
    }
  }
`;
