import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { LinkType, ProjectStatus, SkillCategoryCode, SkillLevel} from '../../generated/prisma/enums';

@ObjectType()
export class ProfileModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  headline!: string;

  @Field(() => String)
  description!: string;
}

@ObjectType()
export class ProfileLinkModel {
  @Field(() => ID)
  id!: string;

  @Field(() => LinkType)
  type!: LinkType;

  @Field(() => String)
  url!: string;

  @Field(() => String)
  label!: string;

  @Field(() => Int)
  sortOrder!: number;
}

@ObjectType()
export class ProjectModel {
  @Field(() => ID)
  id!: string;
  @Field(() => String)
  name!: string;
  @Field(() => String)
  description!: string;
  @Field(() => String, { nullable: true })
  repositoryUrl!: string | null;
  @Field(() => String, { nullable: true })
  projectUrl!: string | null;
  @Field(() => ProjectStatus)
  status!: ProjectStatus;
  @Field(() => Int)
  sortOrder!: number;
}

@ObjectType()
export class ExperienceModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  company!: string;

  @Field(() => String)
  position!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [String])
  responsibilities!: string[];

  @Field(() => String)
  startDate!: string;

  @Field(() => String, { nullable: true })
  endDate!: string | null;

  @Field(() => Boolean)
  isCurrent!: boolean;

  @Field(() => Int)
  sortOrder!: number;
}

@ObjectType()
export class EducationModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  institution!: string;

  @Field(() => String, { nullable: true })
  degree!: string | null;

  @Field(() => String, { nullable: true })
  specialization!: string | null;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Int)
  graduationYear!: number;

  @Field(() => Int)
  sortOrder!: number;
}

@ObjectType()
export class AchievementModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Int)
  sortOrder!: number;
}

@ObjectType()
export class SkillCategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => SkillCategoryCode)
  code!: SkillCategoryCode;

  @Field(() => String)
  name!: string;
}

@ObjectType()
export class SkillModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => SkillLevel)
  level!: SkillLevel;

  @Field(() => Int)
  sortOrder!: number;

  @Field(() => SkillCategoryModel)
  category!: SkillCategoryModel;
}