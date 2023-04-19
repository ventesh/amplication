import * as models from "../models";
import { EnumAuthProviderType } from "../models";
import { DefineUser } from "./create-resource/CreateServiceWizard";
import { TemplateSettings } from "./create-resource/wizardResourceSchema";

export const serviceSettingsFieldsInitValues = {
  generateAdminUI: true,
  generateGraphQL: true,
  generateRestApi: true,
};

export const sampleServiceResourceWithEntities = [
  {
    name: "Orders",
    fields: [
      {
        name: "Quantity",
        dataType: models.EnumDataType.WholeNumber,
      },
      {
        name: "Discount",
        dataType: models.EnumDataType.DecimalNumber,
      },
      {
        name: "Total Price",
        dataType: models.EnumDataType.WholeNumber,
      },
    ],
    relationsToEntityIndex: [1, 3],
  },
  {
    name: "Customer",
    fields: [
      {
        name: "First Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Last Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Email",
        dataType: models.EnumDataType.Email,
      },
      {
        name: "Phone",
        dataType: models.EnumDataType.SingleLineText,
      },
    ],
    relationsToEntityIndex: [2],
  },
  {
    name: "Address",
    fields: [
      {
        name: "Address 1",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Address 2",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "City",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "State",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Zip",
        dataType: models.EnumDataType.WholeNumber,
      },
    ],
  },
  {
    name: "Product",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Item Price",
        dataType: models.EnumDataType.DecimalNumber,
      },
      {
        name: "Description",
        dataType: models.EnumDataType.MultiLineText,
      },
    ],
  },
];

export const sampleInventoryManagementServiceResource = [
  {
    name: "Product",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Description",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "SKU",
        dataType: models.EnumDataType.WholeNumber,
      },
      {
        name: "Price",
        dataType: models.EnumDataType.DecimalNumber,
      },
      {
        name: "Category",
        dataType: models.EnumDataType.OptionSet,
      },
    ],
    relationsToEntityIndex: [1, 3],
  },
  {
    name: "Warehouse",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Location",
        dataType: models.EnumDataType.GeographicLocation,
      },
    ],
  },
  {
    name: "Supplier",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Contact",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Address",
        dataType: models.EnumDataType.SingleLineText,
      },
    ],
    relationsToEntityIndex: [3],
  },
  {
    name: "Order",
    fields: [
      {
        name: "OrderNumber",
        dataType: models.EnumDataType.WholeNumber,
      },
      {
        name: "Date",
        dataType: models.EnumDataType.DateTime,
      },
      {
        name: "Quantity",
        dataType: models.EnumDataType.WholeNumber,
      },
    ],
  },
];

export const sampleCustomerRelationshipServiceResource = [
  {
    name: "Customer",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Email",
        dataType: models.EnumDataType.Email,
      },
      {
        name: "Phone",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Address",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Company",
        dataType: models.EnumDataType.SingleLineText,
      },
    ],
    relationsToEntityIndex: [1, 3],
  },
  {
    name: "Contact",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Email",
        dataType: models.EnumDataType.Email,
      },
      {
        name: "Phone",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Title",
        dataType: models.EnumDataType.SingleLineText,
      },
    ],
    relationsToEntityIndex: [2],
  },
  {
    name: "Opportunity",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Account",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Stage",
        dataType: models.EnumDataType.OptionSet,
      },
      {
        name: "Amount",
        dataType: models.EnumDataType.DecimalNumber,
      },
    ],
    relationsToEntityIndex: [0, 3],
  },
  {
    name: "Deal",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Account",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Stage",
        dataType: models.EnumDataType.OptionSet,
      },
      {
        name: "Amount",
        dataType: models.EnumDataType.DecimalNumber,
      },
    ],
    relationsToEntityIndex: [1],
  },
];

export const sampleUserManagementServiceResource = [
  {
    name: "UserManagement",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Email",
        dataType: models.EnumDataType.Email,
      },
      {
        name: "Password",
        dataType: models.EnumDataType.MultiLineText,
      },
    ],
    relationsToEntityIndex: [1],
  },
  {
    name: "Role",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Description",
        dataType: models.EnumDataType.SingleLineText,
      },
    ],
    relationsToEntityIndex: [2],
  },
  {
    name: "Permission",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Description",
        dataType: models.EnumDataType.SingleLineText,
      },
    ],
  },
];

export const sampleSocialMediaManagementServiceResource = [
  {
    name: "Post",
    fields: [
      {
        name: "Title",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Body",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Image",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Comments",
        dataType: models.EnumDataType.SingleLineText,
      },
    ],
    relationsToEntityIndex: [1, 2],
  },
  {
    name: "Comment",
    fields: [
      {
        name: "Body",
        dataType: models.EnumDataType.SingleLineText,
      },
    ],
    relationsToEntityIndex: [2],
  },
  {
    name: "UserManagement",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Email",
        dataType: models.EnumDataType.Email,
      },
    ],
  },
];

export const sampleEventManagementServiceResource = [
  {
    name: "Event",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Description",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "StartDate",
        dataType: models.EnumDataType.DateTime,
      },
      {
        name: "EndDate",
        dataType: models.EnumDataType.DateTime,
      },
      {
        name: "Location",
        dataType: models.EnumDataType.GeographicLocation,
      },
    ],
    relationsToEntityIndex: [1, 3],
  },
  {
    name: "Attendee",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Email",
        dataType: models.EnumDataType.Email,
      },
      {
        name: "TicketType",
        dataType: models.EnumDataType.OptionSet,
      },
    ],
  },
  {
    name: "Ticket",
    fields: [
      {
        name: "TicketType",
        dataType: models.EnumDataType.OptionSet,
      },
      {
        name: "Price",
        dataType: models.EnumDataType.DecimalNumber,
      },
    ],
    relationsToEntityIndex: [1],
  },
  {
    name: "Session",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Speaker",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Time",
        dataType: models.EnumDataType.DateTime,
      },
    ],
  },
];

export const sampleMessagingAndChatServiceResource = [
  {
    name: "Conversation",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
    ],
    // relationsToEntityIndex: [1],
  },
  {
    name: "Message",
    fields: [
      {
        name: "Text",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Timestamp",
        dataType: models.EnumDataType.DateTime,
      },
    ],
  },
  {
    name: "UserManager",
    fields: [
      {
        name: "Name",
        dataType: models.EnumDataType.SingleLineText,
      },
      {
        name: "Email",
        dataType: models.EnumDataType.Email,
      },
    ],
  },
];

export type createServiceSettings = {
  generateAdminUI: boolean;
  generateGraphQL: boolean;
  generateRestApi: boolean;
  resourceType: string;
};

export function prepareServiceObject(
  serviceName: string,
  projectId: string,
  templateSettings: TemplateSettings,
  generateAdminUI: boolean,
  generateGraphQL: boolean,
  generateRestApi: boolean,
  gitRepository: models.ConnectGitRepositoryInput = null,
  serverDir: string,
  adminDir: string,
  plugins: models.PluginInstallationsCreateInput,
  wizardType: DefineUser,
  repoType: string,
  dbType: string,
  auth: string
  // gitOrganizationName: string
): models.ResourceCreateWithEntitiesInput {
  return {
    resource: {
      name: serviceName,
      description: templateSettings.description,
      resourceType: models.EnumResourceType.Service,
      project: {
        connect: {
          id: projectId,
        },
      },
      serviceSettings: {
        adminUISettings: {
          generateAdminUI: generateAdminUI,
          adminUIPath: adminDir,
        },
        serverSettings: {
          generateGraphQL: generateGraphQL,
          generateRestApi: generateRestApi,
          serverPath: serverDir,
        },
        authProvider: EnumAuthProviderType.Jwt,
      },
      gitRepository: gitRepository,
    },
    commitMessage: "",
    entities: templateSettings.entities,
    plugins: plugins,
    wizardType,
    repoType,
    dbType,
    authType: auth,
    // gitOrganizationName
  };
}

export function prepareMessageBrokerObject(
  projectId: string
): models.ResourceCreateInput {
  return {
    name: "My message broker",
    description: "",
    resourceType: models.EnumResourceType.MessageBroker,
    project: {
      connect: {
        id: projectId,
      },
    },
  };
}

export const resourceThemeMap: {
  [key in models.EnumResourceType]: {
    icon: string;
    color: string;
  };
} = {
  [models.EnumResourceType.ProjectConfiguration]: {
    icon: "app-settings",
    color: "#FFBD70",
  },
  [models.EnumResourceType.Service]: {
    icon: "services",
    color: "#A787FF",
  },
  [models.EnumResourceType.MessageBroker]: {
    icon: "queue",
    color: "#8DD9B9",
  },
};
