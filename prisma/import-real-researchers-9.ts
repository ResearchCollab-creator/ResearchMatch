import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 9)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Anthony John Schaeffer ────────────────────────────────────────────
  const schaeffer = await prisma.user.upsert({
    where: { email: 'anthony.schaeffer@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Anthony John Schaeffer',
      email: 'anthony.schaeffer@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Urology (Pediatric)',
      university: 'University of Utah',
      bio: 'My research seeks to learn about the cost, quality, accessibility, and outcomes of pediatric urology care in the Intermountain West and beyond. I focus on some of the most complex and burdensome pediatric urology conditions, such as bladder exstrophy, Prune Belly Syndrome, posterior urethral valves, and spina bifida. My resource is the Utah Population Database, which I use to learn about the natural history of and long-term (i.e., 20+ year) outcomes of these and other pediatric urology conditions. This research is unique and significant in its ability to answer previously unanswerable questions: what happens to these children when they become adults, or how long-lasting are the operations our patients had in childhood?',
      expertiseTags: [
        'pediatric urology',
        'bladder exstrophy',
        'Prune Belly Syndrome',
        'posterior urethral valves',
        'spina bifida',
        'disorders of sex development',
        'hypospadias',
        'fetal urology',
        'health services research',
        'Utah Population Database',
      ],
      collaborationNeeds: [
        'health services research',
        'long-term outcomes research',
        'biostatistics',
        'pediatric nephrology',
        'neonatology',
        'health economics',
      ],
      contactInfo: 'anthony.schaeffer@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Long-Term Outcomes of Pediatric Urologic Conditions Using the Utah Population Database',
        description:
          'Using the Utah Population Database to study 20+ year surgical and nephrourologic outcomes for major pediatric urologic diseases including congenital hydronephrosis, spina bifida, posterior urethral valves, prune belly syndrome, and bladder exstrophy. Addresses previously unanswerable questions about adult outcomes of childhood urologic surgery.',
        tags: ['pediatric urology', 'bladder exstrophy', 'spina bifida', 'long-term outcomes', 'Utah Population Database'],
        neededExpertise: ['health services research', 'biostatistics', 'pediatric nephrology'],
        status: 'active',
        userId: schaeffer.id,
      },
      {
        title: 'Percutaneous Nephrolithotomy vs. Ureteroscopy for Kidney Stones in Children (JAMA)',
        description:
          'Multicenter study (Western Pediatric Urology Consortium) published in JAMA Network Open (2025) comparing percutaneous nephrolithotomy versus ureteroscopy for kidney stones in children. Also investigating cost, quality, and accessibility of pediatric urologic care using national databases.',
        tags: ['pediatric urology', 'kidney stones', 'nephrolithotomy', 'comparative effectiveness', 'multicenter study'],
        neededExpertise: ['health economics', 'neonatology', 'long-term outcomes research'],
        status: 'active',
        userId: schaeffer.id,
      },
    ],
  });

  // ── 2. Alexander W. Pastuszak ────────────────────────────────────────────
  const pastuszak = await prisma.user.upsert({
    where: { email: 'alex.pastuszak@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Alexander W. Pastuszak',
      email: 'alex.pastuszak@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Urology',
      university: 'University of Utah',
      bio: 'Dr. Pastuszak specializes in the treatment of male infertility, as well as male and female sexual dysfunction. His clinical and basic science research focuses on men\'s health, with his laboratory investigating the genetic and molecular factors that cause male infertility, erectile dysfunction, and Peyronie\'s disease. Dr. Pastuszak has R01 funding to investigate the molecular and genetic pathogenesis of Peyronie\'s disease and has authored over 140 peer-reviewed articles. His work has led to a better understanding of the genetic nature of Peyronie\'s disease, including heritable factors and novel genes with potential roles in its pathogenesis. As Cofounder and CEO of Paterna Biosciences, he is developing novel treatments for male and couple infertility with a focus on in vitro spermatogenesis and oocyte maturation.',
      expertiseTags: [
        'male infertility',
        'Peyronie\'s disease',
        'erectile dysfunction',
        'sexual dysfunction',
        'men\'s reproductive health',
        'genetics of infertility',
        'in vitro spermatogenesis',
        'oocyte maturation',
        'andrology',
        'transgenerational genetics',
      ],
      collaborationNeeds: [
        'molecular biology',
        'genetics',
        'reproductive medicine',
        'clinical trials',
        'bioinformatics',
        'epigenetics',
      ],
      contactInfo: 'alex.pastuszak@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Molecular and Genetic Pathogenesis of Peyronie\'s Disease (NIH R01)',
        description:
          'NIH R01-funded investigation into the molecular and genetic pathogenesis of Peyronie\'s disease, including heritable factors and novel genes with potential roles in its pathogenesis. Demonstrated significant familial clustering of Peyronie\'s disease in close and distant relatives using large-scale pedigree data.',
        tags: ['Peyronie\'s disease', 'genetics', 'male sexual dysfunction', 'molecular biology', 'NIH R01'],
        neededExpertise: ['molecular biology', 'genetics', 'bioinformatics'],
        status: 'active',
        userId: pastuszak.id,
      },
      {
        title: 'In Vitro Spermatogenesis and Novel Treatments for Male Infertility',
        description:
          'Developing novel treatments for male and couple infertility through Paterna Biosciences, with a focus on in vitro spermatogenesis and oocyte maturation. Investigates transgenerational effects of paternal exposures and the role of germline de novo mutations in infertility and offspring health.',
        tags: ['male infertility', 'in vitro spermatogenesis', 'reproductive medicine', 'transgenerational genetics', 'andrology'],
        neededExpertise: ['reproductive medicine', 'epigenetics', 'clinical trials'],
        status: 'active',
        userId: pastuszak.id,
      },
    ],
  });

  // ── 3. Glen A. Lau ───────────────────────────────────────────────────────
  const lau = await prisma.user.upsert({
    where: { email: 'glen.lau@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Glen A. Lau',
      email: 'glen.lau@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Urology (Pediatric)',
      university: 'University of Utah',
      bio: 'My research is primarily health services research focused on long-term outcomes of pediatric urologic surgeries, with a wide range of conditions including vesicoureteral reflux, inguinal pathology, neurogenic bladder/spina bifida and other pediatric urologic conditions. I have used our own institutional data, the Utah Population Database and national databases for these projects, which have led to multiple publications impacting pediatric urologic practice.',
      expertiseTags: [
        'pediatric urology',
        'vesicoureteral reflux',
        'neurogenic bladder',
        'spina bifida',
        'inguinal hernia',
        'myelomeningocele',
        'health services research',
        'outcomes research',
        'Utah Population Database',
        'bladder reconstruction',
      ],
      collaborationNeeds: [
        'health services research',
        'outcomes research',
        'biostatistics',
        'pediatric nephrology',
        'national database analysis',
        'pediatric neurosurgery',
      ],
      contactInfo: 'glen.lau@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Long-Term Outcomes of Intravesical Botulinum Toxin and Enterocystoplasty in Myelomeningocele',
        description:
          'National trends and outcomes study on the use of intravesical botulinum toxin and enterocystoplasty among patients with myelomeningocele (Urology, 2022). Uses the Utah Population Database and national databases to examine continence outcomes and bladder management in neurogenic bladder patients.',
        tags: ['myelomeningocele', 'neurogenic bladder', 'botulinum toxin', 'enterocystoplasty', 'pediatric urology'],
        neededExpertise: ['health services research', 'national database analysis', 'pediatric nephrology'],
        status: 'active',
        userId: lau.id,
      },
      {
        title: 'Outcomes of Vesicoureteral Reflux Management in Children',
        description:
          'Health services research examining long-term outcomes after various interventions for vesicoureteral reflux in children, including ureteral reimplantation and injection therapy. Studies the long-term impact of these procedures on renal function and infection outcomes using institutional and population-level data.',
        tags: ['vesicoureteral reflux', 'pediatric urology', 'ureteral reimplantation', 'outcomes research', 'health services'],
        neededExpertise: ['outcomes research', 'biostatistics', 'pediatric nephrology'],
        status: 'active',
        userId: lau.id,
      },
    ],
  });

  // ── 4. James M. Hotaling ─────────────────────────────────────────────────
  const hotaling = await prisma.user.upsert({
    where: { email: 'james.hotaling@utah.edu' },
    update: {},
    create: {
      name: 'Dr. James M. Hotaling',
      email: 'james.hotaling@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Urology',
      university: 'University of Utah',
      bio: 'Our goal is to understand the genetics of male infertility and its relation to somatic health. We run a large tissue banking effort and have created a large (>1.5M people) fertility database to study these relationships and their ties to familial health. We are seeking to cure male infertility by advancing our understanding of its genetic, environmental and familial underpinnings. I am also Associate Vice President for Research Innovation and Translation at the University of Utah.',
      expertiseTags: [
        'male infertility',
        'genetics of infertility',
        'genetic epidemiology',
        'spermatogonial stem cells',
        'erectile dysfunction',
        'Peyronie\'s disease',
        'men\'s health',
        'penile reconstruction',
        'computational genetics',
        'fertility database',
      ],
      collaborationNeeds: [
        'computational genetics',
        'bioinformatics',
        'reproductive biology',
        'epidemiology',
        'clinical data science',
        'stem cell biology',
      ],
      contactInfo: 'james.hotaling@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Genetics of Male Infertility: A 1.5M-Person Fertility Database',
        description:
          'Created and studying a large (>1.5M person) fertility database combined with tissue banking to understand the genetic, environmental, and familial underpinnings of male infertility. Investigates familial cancer risk in subfertile men, impact of socioeconomic status on fertility treatment outcomes, and Hispanic ethnicity and fertility outcomes.',
        tags: ['male infertility', 'genetics', 'fertility database', 'genetic epidemiology', 'reproductive health'],
        neededExpertise: ['computational genetics', 'bioinformatics', 'epidemiology'],
        status: 'active',
        userId: hotaling.id,
      },
      {
        title: 'Spermatogonial Stem Cells and T Cells in Testicular Germ Cell Tumors',
        description:
          'Investigating T cells in testicular germ cell tumors and the fundamental contributions of rare subsets to tumor biology. Parallel work on spermatogonial stem cells to advance understanding of male reproductive biology and potential therapeutic applications for infertility.',
        tags: ['spermatogonial stem cells', 'testicular cancer', 'T cells', 'reproductive biology', 'male infertility'],
        neededExpertise: ['stem cell biology', 'reproductive biology', 'clinical data science'],
        status: 'active',
        userId: hotaling.id,
      },
    ],
  });

  // ── 5. Kenneth I. Aston ──────────────────────────────────────────────────
  const aston = await prisma.user.upsert({
    where: { email: 'kenneth.aston@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Kenneth I. Aston',
      email: 'kenneth.aston@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Urology (Andrology & IVF)',
      university: 'University of Utah',
      bio: 'I am a clinical lab director in Andrology and IVF, and my primary focus is delivering excellent care and the best outcomes possible for patients struggling with infertility and those who are preserving fertility prior to gonadotoxic treatments. Areas of focus for my research include exploring the genetic factors that underlie unexplained male infertility and the genetic intersection between male infertility and other comorbidities. I am a co-founder of two international consortia aimed at leveraging multidisciplinary collaborations to improve male infertility diagnosis and treatment. I also lead several projects to optimize outcomes of fertility treatments through lab automation and optimization of materials used in fertility treatments.',
      expertiseTags: [
        'andrology',
        'IVF',
        'male infertility',
        'reproductive genetics',
        'reproductive epigenetics',
        'assisted reproductive technologies',
        'fertility preservation',
        'embryology',
        'clinical exomes',
        'lab automation',
      ],
      collaborationNeeds: [
        'genetics',
        'epigenetics',
        'reproductive biology',
        'bioinformatics',
        'clinical genomics',
        'lab automation',
      ],
      contactInfo: 'kenneth.aston@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Clinical Exomes in Diagnostics and Management of Male Infertility',
        description:
          'International consortium study working toward clinical exomes in diagnostics and management of male infertility. Investigates diverse monogenic sources of human spermatogenic failure and the rising role of genetics in andrology research and clinical practice. Published in Am J Hum Genet and Nature Communications.',
        tags: ['male infertility', 'clinical exomes', 'genetics', 'spermatogenic failure', 'andrology'],
        neededExpertise: ['genetics', 'clinical genomics', 'bioinformatics'],
        status: 'active',
        userId: aston.id,
      },
      {
        title: 'Reproductive Epigenetics and Lab Automation for IVF Outcome Optimization',
        description:
          'Investigating reproductive epigenetics to understand how epigenetic modifications impact fertility treatment outcomes. Leads projects to optimize fertility treatment outcomes through lab automation and optimization of materials used in IVF, including studies of DMRT1 domain mutations causing male infertility.',
        tags: ['reproductive epigenetics', 'IVF', 'lab automation', 'assisted reproductive technologies', 'fertility outcomes'],
        neededExpertise: ['epigenetics', 'reproductive biology', 'lab automation'],
        status: 'active',
        userId: aston.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 9):');
  console.log('  - Dr. Anthony John Schaeffer  (anthony.schaeffer@utah.edu)');
  console.log('  - Dr. Alexander W. Pastuszak  (alex.pastuszak@utah.edu)');
  console.log('  - Dr. Glen A. Lau             (glen.lau@utah.edu)');
  console.log('  - Dr. James M. Hotaling       (james.hotaling@utah.edu)');
  console.log('  - Dr. Kenneth I. Aston        (kenneth.aston@utah.edu)');
  console.log('\nAll use password: password123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
