import { Inject } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AchievementModel, EducationModel, ExperienceModel, ProfileLinkModel, ProfileModel, ProjectModel, SkillModel } from './models/profile.model';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(@Inject(ProfileService) private readonly profiles: ProfileService) {}

  @Query(() => ProfileModel, { nullable: true })
  profile(): Promise<ProfileModel | null> {
    return this.profiles.getProfile();
  }

  @ResolveField(() => [ProfileLinkModel])
  links(@Parent() profile: ProfileModel): Promise<ProfileLinkModel[]> {
    return this.profiles.getLinks(profile.id);
  }

  @ResolveField(() => [ProjectModel])
  projects(@Parent() profile: ProfileModel): Promise<ProjectModel[]> {
    return this.profiles.getProjects(profile.id);
  }

  @ResolveField(() => [ExperienceModel])
  experience(@Parent() profile: ProfileModel): Promise<ExperienceModel[]> {
    return this.profiles.getExperiences(profile.id);
  }

  @ResolveField(() => [EducationModel])
  education(@Parent() profile: ProfileModel): Promise<EducationModel[]> {
    return this.profiles.getEducation(profile.id);
  }

  @ResolveField(() => [SkillModel])
  skills(@Parent() profile: ProfileModel): Promise<SkillModel[]> {
    return this.profiles.getSkills(profile.id);
  }

}

@Resolver(() => ExperienceModel)
export class ExperienceResolver {
  constructor(@Inject(ProfileService) private readonly profiles: ProfileService) {}

  @ResolveField(() => [AchievementModel])
  achievements(@Parent() experience: ExperienceModel): Promise<AchievementModel[]> {
    return this.profiles.getAchievements(experience.id);
  }
}