import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding mentor opt-ins...');

  // Opt in a selection of researchers as mentors
  const mentorUpdates: {
    email: string;
    mentorshipFocus: string[];
    mentoringAreas: string[];
    mentorshipStyle: string;
    maxMentees: number | null;
  }[] = [
    {
      email: 'joseph.tonna@utah.edu',
      mentorshipFocus: ['Graduate students', 'Postdocs'],
      mentoringAreas: [
        'clinical trials',
        'critical care research',
        'ECMO',
        'grant writing',
        'academic publishing',
      ],
      mentorshipStyle: 'Monthly 1:1 meetings, available for email Q&A',
      maxMentees: 3,
    },
    {
      email: 'sheri.holmen@utah.edu',
      mentorshipFocus: ['Graduate students', 'Postdocs', 'Early-career faculty'],
      mentoringAreas: [
        'cancer biology',
        'melanoma research',
        'grant writing',
        'academic career development',
        'lab management',
      ],
      mentorshipStyle: 'Bi-weekly check-ins, open to co-mentorship arrangements',
      maxMentees: 2,
    },
    {
      email: 'thomas.varghese@utah.edu',
      mentorshipFocus: ['Medical students', 'Graduate students'],
      mentoringAreas: [
        'thoracic surgery',
        'clinical research',
        'health outcomes research',
        'manuscript writing',
      ],
      mentorshipStyle: 'Flexible; happy to review drafts and provide feedback',
      maxMentees: 4,
    },
    {
      email: 'anthony.schaeffer@utah.edu',
      mentorshipFocus: ['Graduate students', 'Postdocs', 'Early-career faculty'],
      mentoringAreas: [
        'urology',
        'surgical research',
        'clinical trial design',
        'academic surgery career',
      ],
      mentorshipStyle: 'Monthly meetings; open to co-authorship on relevant projects',
      maxMentees: 3,
    },
    {
      email: 'james.hotaling@utah.edu',
      mentorshipFocus: ['Undergraduate students', 'Graduate students', 'Medical students'],
      mentoringAreas: [
        'male reproductive health',
        'epidemiology',
        'clinical research methods',
        'data analysis',
        'research career development',
      ],
      mentorshipStyle: 'Monthly meetings plus ad hoc availability via email',
      maxMentees: 5,
    },
    {
      email: 'jessica.cohan@utah.edu',
      mentorshipFocus: ['Medical students', 'Graduate students', 'Postdocs'],
      mentoringAreas: [
        'surgery',
        'academic medicine',
        'work-life integration',
        'women in surgery',
        'grant writing',
      ],
      mentorshipStyle: 'Informal mentorship, available for coffee chats and Q&A',
      maxMentees: null,
    },
    {
      email: 'stephen.fenton@utah.edu',
      mentorshipFocus: ['Undergraduate students', 'Graduate students', 'Medical students'],
      mentoringAreas: [
        'pediatric surgery',
        'research design',
        'biostatistics',
        'manuscript preparation',
      ],
      mentorshipStyle: 'Monthly structured meetings with goal-setting',
      maxMentees: 3,
    },
  ];

  let updated = 0;
  for (const m of mentorUpdates) {
    const result = await prisma.user.updateMany({
      where: { email: m.email },
      data: {
        isMentor: true,
        mentorshipFocus: m.mentorshipFocus,
        mentoringAreas: m.mentoringAreas,
        mentorshipStyle: m.mentorshipStyle,
        maxMentees: m.maxMentees,
      },
    });
    if (result.count > 0) {
      console.log(`  ✓ ${m.email}`);
      updated++;
    } else {
      console.log(`  ✗ ${m.email} — not found, skipping`);
    }
  }

  console.log(`\nDone. ${updated}/${mentorUpdates.length} mentors updated.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
