import { ArgsType, Field } from "@nestjs/graphql";
import { GitGroupsInput } from "../inputs/GitGroupsInput";

@ArgsType()
export class GitGroupsArgs {
  @Field(() => GitGroupsInput, { nullable: false })
  where!: GitGroupsInput;
}
