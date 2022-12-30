import { Field, ObjectType } from "@nestjs/graphql";
import { EnumGitOrganizationType } from "@amplication/code-gen-types/models";

@ObjectType({
  isAbstract: true,
  description: undefined,
})
export class RemoteGitOrganization {
  @Field(() => String)
  name: string;

  @Field(() => EnumGitOrganizationType)
  type: EnumGitOrganizationType;
}
