import type { PrismaClient } from '../../src/generated/prisma/client';
import type { SeedData } from './data';

export async function applySeed(prisma: PrismaClient, data: SeedData): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.profile.upsert({
      where: { id: data.profile.id },
      create: {
        id: data.profile.id,
        slug: data.profile.slug,
        name: data.profile.name,
        headline: data.profile.headline,
        description: data.profile.description,
      },
      update: {
        slug: data.profile.slug,
        name: data.profile.name,
        headline: data.profile.headline,
        description: data.profile.description,
      },
    });

    for (const link of data.links) {
      await tx.profileLink.upsert({
        where: { id: link.id },
        create: {
          id: link.id,
          profileId: data.profile.id,
          type: link.type,
          url: link.url,
          label: link.label,
          sortOrder: link.sortOrder,
        },
        update: {
          profileId: data.profile.id,
          type: link.type,
          url: link.url,
          label: link.label,
          sortOrder: link.sortOrder,
        },
      });
    }

    for (const project of data.projects) {
      await tx.project.upsert({
        where: { id: project.id },
        create: {
          id: project.id,
          profileId: data.profile.id,
          name: project.name,
          description: project.description,
          repositoryUrl: project.repositoryUrl,
          projectUrl: project.projectUrl,
          status: project.status,
          sortOrder: project.sortOrder,
        },
        update: {
          profileId: data.profile.id,
          name: project.name,
          description: project.description,
          repositoryUrl: project.repositoryUrl,
          projectUrl: project.projectUrl,
          status: project.status,
          sortOrder: project.sortOrder,
        },
      });
    }
    
    for (const experience of data.experiences) {
      await tx.experience.upsert({
        where: { id: experience.id },
        create: {
          id: experience.id,
          profileId: data.profile.id,
          company: experience.company,
          position: experience.position,
          description: experience.description,
          responsibilities: experience.responsibilities,
          startDate: experience.startDate,
          endDate: experience.endDate,
          sortOrder: experience.sortOrder,
        },
        update: {
          profileId: data.profile.id,
          company: experience.company,
          position: experience.position,
          description: experience.description,
          responsibilities: experience.responsibilities,
          startDate: experience.startDate,
          endDate: experience.endDate,
          sortOrder: experience.sortOrder,
        },
      });
      for (const achievement of experience.achievements) {
        await tx.achievement.upsert({
          where: { id: achievement.id },
          create: {
            id: achievement.id,
            experienceId: experience.id,
            title: achievement.title,
            description: achievement.description,
            sortOrder: achievement.sortOrder,
          },
          update: {
            experienceId: experience.id,
            title: achievement.title,
            description: achievement.description,
            sortOrder: achievement.sortOrder,
          },
        });
      }
    }
    
    for (const item of data.education) {
      await tx.education.upsert({
        where: { id: item.id },
        create: {
          id: item.id,
          profileId: data.profile.id,
          institution: item.institution,
          degree: item.degree,
          specialization: item.specialization,
          description: item.description,
          graduationYear: item.graduationYear,
          sortOrder: item.sortOrder,
          
        },
        update: {
          profileId: data.profile.id,
          institution: item.institution,
          degree: item.degree,
          specialization: item.specialization,
          description: item.description,
          graduationYear: item.graduationYear,
          sortOrder: item.sortOrder,
        },
      });
    }

    for (const category of data.categories) {
      await tx.skillCategory.upsert({
        where: { id: category.id },
        create: {
          id: category.id,
          code: category.code,
          name: category.name,
          sortOrder: category.sortOrder,
        },
        update: {
          code: category.code,
          name: category.name,
          sortOrder: category.sortOrder,
        },
      });
    }

    for (const skill of data.skills) {
      await tx.skill.upsert({
        where: { id: skill.id },
        create: {
          id: skill.id,
          profileId: data.profile.id,
          categoryId: skill.categoryId,
          name: skill.name,
          level: skill.level,
          sortOrder: skill.sortOrder,
        },
        update: {
          profileId: data.profile.id,
          categoryId: skill.categoryId,
          name: skill.name,
          level: skill.level,
          sortOrder: skill.sortOrder,
        },
      });
    }
  });
}