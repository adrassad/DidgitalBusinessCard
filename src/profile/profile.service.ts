import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../config/env';
import { ProfileRepository } from './profile.repository';
import type { AchievementModel, EducationModel, ExperienceModel, ProfileLinkModel, ProfileModel, ProjectModel, SkillModel } from './models/profile.model';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(ProfileRepository) private readonly profiles: ProfileRepository,
    @Inject(ConfigService) private readonly config: ConfigService<Env, true>,
  ) {}

  async getProfile(): Promise<ProfileModel | null> {
    const slug = this.config.get('PROFILE_SLUG', { infer: true });
    const profile = await this.profiles.findBySlug(slug);
    if (!profile) {
      return null;
    }
    return {
      id: profile.id,
      slug: profile.slug,
      name: profile.name,
      headline: profile.headline,
      description: profile.description,
    };
  }

  async getLinks(profileId: string): Promise<ProfileLinkModel[]> {
    const links = await this.profiles.findLinks(profileId);
    return links.map((link) => ({
      id: link.id,
      type: link.type,
      url: link.url,
      label: link.label,
      sortOrder: link.sortOrder,
    }));
  }

  async getProjects(profileId: string): Promise<ProjectModel[]> {
    const projects = await this.profiles.findProjects(profileId);
    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      repositoryUrl: project.repositoryUrl,
      projectUrl: project.projectUrl,
      status: project.status,
      sortOrder: project.sortOrder,
    }));
  }
  
  async getExperiences(profileId: string): Promise<ExperienceModel[]> {
   const experiences = await this.profiles.findExperiences(profileId);
    return experiences.map((experience) => ({
      id: experience.id,
      company: experience.company,
      position: experience.position,
      description: experience.description,
      responsibilities: experience.responsibilities,
      startDate: formatMonth(experience.startDate),
      endDate: experience.endDate ? formatMonth(experience.endDate) : null,
      isCurrent: experience.endDate === null,
      sortOrder: experience.sortOrder,
    }));

    function formatMonth(value: Date): string {
      const year = value.getUTCFullYear();
      const monthNumber = String(value.getUTCMonth() + 1).padStart(2, '0');
      return `${year}-${monthNumber}`;
    }
  }

  async getAchievements(experienceId: string): Promise<AchievementModel[]> {
    const achievements = await this.profiles.findAchievements(experienceId);
    return achievements.map((achievement) => ({
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      sortOrder: achievement.sortOrder,
    }));
  }

  async getEducation(profileId: string): Promise<EducationModel[]> {
    const education = await this.profiles.findEducation(profileId);
    return education.map((item) => ({
      id: item.id,
      institution: item.institution,
      degree: item.degree,
      specialization: item.specialization,
      description: item.description,
      graduationYear: item.graduationYear,
      sortOrder: item.sortOrder,
    }));
  }

  async getSkills(profileId: string): Promise<SkillModel[]> {
    const skills = await this.profiles.findSkills(profileId);
    return skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      level: skill.level,
      sortOrder: skill.sortOrder,
      category: {
        id: skill.category.id,
        code: skill.category.code,
        name: skill.category.name,
      },
    }));
  }
  
}