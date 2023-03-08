import { Field, InputType } from "@nestjs/graphql";
import { EnumGitProvider } from "../enums/EnumGitProvider";

@InputType({
  isAbstract: true,
})
export class GitGroupsInput {
  @Field(() => EnumGitProvider, { nullable: false })
  gitProvider!: EnumGitProvider;

  @Field(() => String, { nullable: false })
  oAuthUserName!: string;
}
