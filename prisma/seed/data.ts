import { LinkType, ProjectStatus, SkillCategoryCode, SkillLevel } from '../../src/generated/prisma/enums';
import { ids } from './ids';

export const PROFILE_SLUG = 'andrey-sharapov';

const month = (year: number, monthNumber: number): Date =>
  new Date(Date.UTC(year, monthNumber - 1, 1));

export interface SeedData {
  profile: {
    id: string;
    slug: string;
    name: string;
    headline: string;
    description: string;
  };
  links: Array<{
    id: string;
    type: LinkType;
    url: string;
    label: string;
    sortOrder: number;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    repositoryUrl: string | null;
    projectUrl: string | null;
    status: ProjectStatus;
    sortOrder: number;
  }>;
    experiences: Array<{
    id: string;
    company: string;
    position: string;
    description: string;
    responsibilities: string[];
    startDate: Date;
    endDate: Date | null;
    sortOrder: number;
    achievements: Array<{
      id: string;
      title: string;
      description: string | null;
      sortOrder: number;
    }>;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string | null;
    specialization: string | null;
    description: string | null;
    graduationYear: number;
    sortOrder: number;
  }>;
  categories: Array<{
    id: string;
    code: SkillCategoryCode;
    name: string;
    sortOrder: number;
  }>;
  skills: Array<{
    id: string;
    name: string;
    categoryId: string;
    level: SkillLevel;
    sortOrder: number;
  }>;
}

function skill(
  name: keyof typeof ids.skills,
  category: keyof typeof ids.categories,
  level: SkillLevel,
  sortOrder: number,
) {
  return {
    id: ids.skills[name],
    name,
    categoryId: ids.categories[category],
    level,
    sortOrder,
  };
}

export const seedData: SeedData = {
  profile: {
    id: ids.profile,
    slug: PROFILE_SLUG,
    name: 'Андрей Шарапов',
    headline: 'Разработка backend и интеграции API',
    description:
      'Занимаюсь корпоративными информационными системами, backend-сервисами и интеграциями API, обменом данными и автоматизацией процессов, SQL и настройкой прикладных систем. Собственный проект CryPrice — мониторинг DeFi: данные публичных кошельков и Health Factor в Aave V3. Опыт блокчейна относится к этому проекту.',
  },
  links: [
    {
      id: ids.links.github,
      type: LinkType.GITHUB,
      url: 'https://github.com/adrassad',
      label: 'GitHub',
      sortOrder: 1,
    },
    {
      id: ids.links.linkedin,
      type: LinkType.LINKEDIN,
      url: 'https://www.linkedin.com/in/adrassad',
      label: 'LinkedIn',
      sortOrder: 2,
    },
    {
      id: ids.links.x,
      type: LinkType.X,
      url: 'https://x.com/AdrasSad',
      label: 'X',
      sortOrder: 3,
    },
    {
      id: ids.links.email,
      type: LinkType.EMAIL,
      url: 'mailto:adras.sad@gmail.com',
      label: 'Email',
      sortOrder: 4,
    },
  ],
  projects: [
    {
      id: ids.projects.cryprice,
      name: 'CryPrice',
      description:
        'Мультичейн-платформа мониторинга DeFi. Агрегирует данные публичных кошельков и позиций кредитования, отслеживает Health Factor в Aave V3 в сетях Ethereum, Arbitrum, Avalanche и Base, классифицирует риск ликвидации, считает распределение портфеля на стороне сервера, формирует PDF-отчёты и отправляет уведомления в Telegram после входа через Google. Есть калькулятор цен. В состав входят backend на Node.js/Express, интеграции с блокчейнами, PostgreSQL, Redis, фоновая синхронизация, Flutter Web-клиент и лендинг на React/Vite. Система только читает данные: ключи не хранит и транзакции не выполняет.',
      repositoryUrl: 'https://github.com/adrassad/cryprice',
      projectUrl: 'https://cryprice.dev/',
      status: ProjectStatus.ACTIVE,
      sortOrder: 1,
    },
  ],
  experiences: [
    {
      id: ids.experience.defo,
      company: 'ДЭФО офисная мебель',
      position: 'Ведущий программист 1С',
      description:
        'Разработка и сопровождение корпоративных информационных систем на платформе 1С:Предприятие, автоматизация бизнес-процессов и обмен данными между системами. В этот период также были серверные сервисы, API и разработка на Groovy для Naumen ITSM. Эти задачи не относятся ко всему сроку с апреля 2017 года.',
      responsibilities: [
        'Разработка и сопровождение корпоративных информационных систем и бизнес-логики',
        'Интеграции между информационными системами через HTTP- и веб-сервисы, XML, JSON и SOAP',
        'Разработка HTTP-сервисов и механизмов обмена данными для корпоративных систем, внешних приложений и мобильных клиентов',
        'Автоматизация бизнес-процессов, отчётности и обработки данных',
        'Работа с SQL-базами данных и настройка прикладных систем',
        'Разработка Telegram-бота для Naumen ITSM на Groovy',
        'Интеграция Naumen ITSM с GanttPro',
        'Доработка и адаптация корпоративных программных решений',
      ],
      startDate: month(2017, 4),
      endDate: null,
      sortOrder: 1,
      achievements: [
        {
          id: 'c3a8e1f4-7b2d-4e19-8a60-1d5f9c2b7e41',
          title: 'Перевод филиалов в новую учётную систему',
          description:
            'Благодарность управляющей компании ДЭФО за работу по переводу филиалов в новую учётную систему.',
          sortOrder: 1,
        },
        {
          id: '9b6d0c55-2e74-4a3f-91c8-6f0a4d8e2b17',
          title: 'Благодарность за вклад в развитие торговой марки ДЭФО',
          description:
            'Благодарность 2024 года за вклад и высокую эффективность в развитии торговой марки ДЭФО.',
          sortOrder: 2,
        },
      ],
    },
    {
      id: ids.experience.blankt,
      company: 'БЛАНКТ',
      position: 'Программист 1С',
      description:
        'Автоматизация системы 1С:Зарплата и управление персоналом, кадровые процессы, отчётность и обмен данными.',
      responsibilities: [
        'Автоматизация учётной системы «Зарплата и управление персоналом» (1С:Предприятие)',
        'Разработка системы контроля рабочего времени линейного персонала с использованием Face ID',
        'Автоматизация кадровых процессов',
        'Разработка отчётов',
        'Проектирование обмена данными через XML, JSON, SOAP, веб-сервисы и HTTP-сервисы',
        'Создание мобильных приложений и механизмов синхронизации с серверной базой',
      ],
      startDate: month(2016, 2),
      endDate: month(2017, 4),
      sortOrder: 2,
      achievements: [],
    },
    {
      id: ids.experience.eliteProfit,
      company: 'Элит-профит',
      position: 'Сервис-инженер / программист 1С',
      description:
        'Установка, обновление и сопровождение программ 1С:Предприятие, консультации клиентов, доработка учётных систем и обмен данными.',
      responsibilities: [
        'Установка, обновление и сопровождение программных продуктов 1С:Предприятие',
        'Консультирование клиентов и адаптация типовых конфигураций',
        'Разработка и модификация учётных систем, отчётов и прикладной бизнес-логики',
        'Обмен данными через XML, JSON, SOAP, HTTP и веб-сервисы',
        'Интеграция телефонии «Элит-Коллцентр» с корпоративными учётными системами',
        'Сопровождение стандартных и нестандартных баз данных',
        'Выездное техническое обслуживание',
      ],
      startDate: month(2006, 2),
      endDate: month(2013, 12),
      sortOrder: 3,
      achievements: [],
    },
  ],

  education: [
    {
      id: ids.education.migku,
      institution: 'Московский институт государственного и корпоративного управления',
      degree: 'Высшее образование',
      specialization: 'Прикладная информатика в экономике, разработчик информационных систем',
      description: null,
      graduationYear: 2011,
      sortOrder: 1,
    },
    {
      id: ids.education.college,
      institution: 'Политехнический колледж им. Н. А. Кубяка',
      degree: 'Среднее специальное образование',
      specialization: 'Менеджер с углубленной подготовкой «Хозяйственно-правовая деятельность»',
      description: null,
      graduationYear: 2007,
      sortOrder: 2,
    },
    {
      id: ids.education.pu6,
      institution: 'ПУ-6 г. Унеча',
      degree: 'Среднее специальное образование',
      specialization: 'Информатика, оператор ЭВМ',
      description: 'Красный диплом',
      graduationYear: 2004,
      sortOrder: 3,
    },
  ],

  categories: [
    { id: ids.categories.PROGRAMMING_LANGUAGES, code: SkillCategoryCode.PROGRAMMING_LANGUAGES, name: 'Языки программирования', sortOrder: 1 },
    { id: ids.categories.BACKEND_DEVELOPMENT, code: SkillCategoryCode.BACKEND_DEVELOPMENT, name: 'Backend-разработка', sortOrder: 2 },
    { id: ids.categories.APIS_AND_INTEGRATIONS, code: SkillCategoryCode.APIS_AND_INTEGRATIONS, name: 'API и интеграции', sortOrder: 3 },
    { id: ids.categories.DATABASES, code: SkillCategoryCode.DATABASES, name: 'Базы данных', sortOrder: 4 },
    { id: ids.categories.DEVOPS_AND_TOOLS, code: SkillCategoryCode.DEVOPS_AND_TOOLS, name: 'DevOps и инструменты', sortOrder: 5 },
    { id: ids.categories.BLOCKCHAIN_AND_DEFI, code: SkillCategoryCode.BLOCKCHAIN_AND_DEFI, name: 'Blockchain и DeFi', sortOrder: 6 },
    { id: ids.categories.APPLICATION_DEVELOPMENT, code: SkillCategoryCode.APPLICATION_DEVELOPMENT, name: 'Разработка приложений', sortOrder: 7 },
    { id: ids.categories.AUTOMATION_AND_BOTS, code: SkillCategoryCode.AUTOMATION_AND_BOTS, name: 'Автоматизация и боты', sortOrder: 8 },
  ],

  skills: [
    skill('Node.js', 'PROGRAMMING_LANGUAGES', SkillLevel.ADVANCED, 1),
    skill('JavaScript', 'PROGRAMMING_LANGUAGES', SkillLevel.ADVANCED, 2),
    skill('TypeScript', 'PROGRAMMING_LANGUAGES', SkillLevel.ADVANCED, 3),
    skill('Java', 'PROGRAMMING_LANGUAGES', SkillLevel.ADVANCED, 4),
    skill('Python', 'PROGRAMMING_LANGUAGES', SkillLevel.ADVANCED, 5),
    skill('SQL', 'PROGRAMMING_LANGUAGES', SkillLevel.ADVANCED, 6),
    skill('Dart', 'PROGRAMMING_LANGUAGES', SkillLevel.ADVANCED, 7),
    skill('Express.js', 'BACKEND_DEVELOPMENT', SkillLevel.ADVANCED, 1),
    skill('Spring Boot', 'BACKEND_DEVELOPMENT', SkillLevel.ADVANCED, 2),
    skill('Spring MVC', 'BACKEND_DEVELOPMENT', SkillLevel.ADVANCED, 3),
    skill('Java Database', 'BACKEND_DEVELOPMENT', SkillLevel.ADVANCED, 4),
    skill('REST API', 'APIS_AND_INTEGRATIONS', SkillLevel.ADVANCED, 1),
    skill('SOAP', 'APIS_AND_INTEGRATIONS', SkillLevel.ADVANCED, 2),
    skill('JSON', 'APIS_AND_INTEGRATIONS', SkillLevel.ADVANCED, 3),
    skill('XML', 'APIS_AND_INTEGRATIONS', SkillLevel.ADVANCED, 4),
    skill('PostgreSQL', 'DATABASES', SkillLevel.ADVANCED, 1),
    skill('Redis', 'DATABASES', SkillLevel.ADVANCED, 2),
    skill('Linux', 'DEVOPS_AND_TOOLS', SkillLevel.ADVANCED, 1),
    skill('Git', 'DEVOPS_AND_TOOLS', SkillLevel.ADVANCED, 2),
    skill('Ethers.js', 'BLOCKCHAIN_AND_DEFI', SkillLevel.ADVANCED, 1),
    skill('DeFi', 'BLOCKCHAIN_AND_DEFI', SkillLevel.ADVANCED, 2),
    skill('Blockchain', 'BLOCKCHAIN_AND_DEFI', SkillLevel.ADVANCED, 3),
    skill('Flutter', 'APPLICATION_DEVELOPMENT', SkillLevel.ADVANCED, 1),
    skill('React', 'APPLICATION_DEVELOPMENT', SkillLevel.INTERMEDIATE, 2),
    skill('Telegram Bot Development', 'AUTOMATION_AND_BOTS', SkillLevel.ADVANCED, 1),
  ],
};