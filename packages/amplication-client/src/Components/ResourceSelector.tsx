import {
  SelectMenu,
  SelectMenuItem,
  SelectMenuList,
  SelectMenuModal,
  Label,
  ButtonFormat,
} from "@amplication/ui/design-system";
import { Resource } from "../models";
import "./CommitSelector.scss";
import { ResourceSelectorItem } from "./ResourceSelectorItem";

const CLASS_NAME = "commit-selector";

type Props = {
  resources: Resource[];
  selectedResource: Resource | null;
  onSelectResource: (resource: Resource) => void;
};

const ResourceSelector = ({
  resources,
  onSelectResource,
  selectedResource,
}: Props) => {
  return (
    <div className={CLASS_NAME}>
      <div className={`${CLASS_NAME}__label-title`}>
        <Label text="Select resource" />
      </div>
      <SelectMenu
        title={<ResourceSelectorItem resource={selectedResource} />}
        buttonFormat={ButtonFormat.Outline}
        className={`${CLASS_NAME}__menu`}
        icon="chevron_down"
      >
        <SelectMenuModal>
          <SelectMenuList>
            <>
              {resources.map((resource) => (
                <SelectMenuItem
                  closeAfterSelectionChange
                  selected={resource.id === selectedResource?.id}
                  key={resource.id}
                  onSelectionChange={() => {
                    onSelectResource(resource);
                  }}
                >
                  <ResourceSelectorItem resource={resource} />
                </SelectMenuItem>
              ))}
            </>
          </SelectMenuList>
        </SelectMenuModal>
      </SelectMenu>
    </div>
  );
};

export default ResourceSelector;
