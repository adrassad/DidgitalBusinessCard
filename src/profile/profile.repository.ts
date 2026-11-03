import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  findBySlug(slug: string) {
    return this.prisma.profile.findUnique({ where: { slug } });
  }

  findLinks(profileId: string) {
    return this.prisma.profileLink.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  findProjects(profileId: string) {
    return this.prisma.project.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  findExperiences(profileId: string) {
    return this.prisma.experience.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    });
  }
  findEducation(profileId: string) {
    return this.prisma.education.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  findAchievements(experienceId: string) {
    return this.prisma.achievement.findMany({
      where: { experienceId },
      orderBy: { sortOrder: 'asc' },
    });
  }
  
  findSkills(profileId: string) {
    return this.prisma.skill.findMany({
      where: { profileId },
      orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
      include: { category: true },
    });
  }
}