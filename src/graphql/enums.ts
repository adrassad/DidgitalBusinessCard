import { registerEnumType } from '@nestjs/graphql';
import { LinkType, ProjectStatus, SkillCategoryCode, SkillLevel} from '../generated/prisma/enums';

registerEnumType(LinkType, { name: 'LinkType' });
registerEnumType(ProjectStatus, { name: 'ProjectStatus' });
registerEnumType(SkillLevel, { name: 'SkillLevel' });
registerEnumType(SkillCategoryCode, { name: 'SkillCategoryCode' });