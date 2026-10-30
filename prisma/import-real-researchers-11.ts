import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 11)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Jessica N. Cohan ──────────────────────────────────────────────────
  const cohan = await prisma.user.upsert({
    where: { email: 'jessica.cohan@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Jessica N. Cohan',
      email: 'jessica.cohan@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Colorectal Surgery',
      university: 'University of Utah',
      bio: 'Our population is aging, and older adults comprise an increasing proportion of surgical patients. Dr. Cohan recognizes this as an important opportunity to develop and implement strategies that optimize surgical care for older adults. Her NIH-funded research uses qualitative techniques and user-centered design to align care with patient goals and develop strategies to identify and holistically manage multimorbidity and geriatric syndromes that uniquely influence each person\'s surgical treatment and recovery. She also conducts research using "big data" and participates in clinical trials to investigate complex surgical diseases, such as diverticulitis, with a goal of helping surgeons make better treatment decisions with their patients.',
      expertiseTags: [
        'geriatric surgery',
        'colorectal surgery',
        'diverticulitis',
        'colon and rectal cancer',
        'ulcerative colitis',
        'Crohn\'s disease',
        'patient-surgeon communication',
        'qualitative research',
        'health services research',
        'older adult surgical care',
      ],
      collaborationNeeds: [
        'geriatric medicine',
        'qualitative research',
        'health services research',
        'patient-centered outcomes',
        'clinical trials',
        'implementation science',
      ],
      contactInfo: 'jessica.cohan@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'NIH K23: Optimizing Surgical Care for Older Adults with Multimorbidity',
        description:
          'NIH/NIA K23-funded study developing an intervention to ensure the goals for surgery are valuable to older adults. Uses qualitative techniques and user-centered design to align care with patient goals and manage geriatric syndromes. Also NIH/NIA R01 Co-Investigator examining geriatric assessment domains in relation to treatment outcomes among older adults with colorectal cancer.',
        tags: ['geriatric surgery', 'older adults', 'patient goals', 'qualitative research', 'NIH'],
        neededExpertise: ['geriatric medicine', 'qualitative research', 'patient-centered outcomes'],
        status: 'active',
        userId: cohan.id,
      },
      {
        title: 'Diverticulitis Treatment Decision-Making Using Big Data',
        description:
          'Using large national datasets and clinical trials to investigate diverticulitis treatment decisions, examining the role of the surgeon and outpatient geriatricians in optimizing elective surgical care for older adults. 2025 ACS Commission on Cancer Cancer Liaison Physician Outstanding Performance Award recipient.',
        tags: ['diverticulitis', 'colorectal surgery', 'health services research', 'big data', 'surgical decision-making'],
        neededExpertise: ['health services research', 'clinical trials', 'implementation science'],
        status: 'active',
        userId: cohan.id,
      },
    ],
  });

  // ── 2. Bartley Pickron ───────────────────────────────────────────────────
  const pickron = await prisma.user.upsert({
    where: { email: 'bartley.pickron@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Bartley Pickron',
      email: 'bartley.pickron@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Colorectal Surgery',
      university: 'University of Utah',
      bio: 'The focus of my research has been the evaluation of a medical device to allow for a primary anastomosis at the time of rectal cancer resection without the need for proximal stool diversion. I am currently enrolling patients in two trials studying the effectiveness of an intraluminal colonic device that eliminates the need for ileostomy in most patients. Both of these devices are in the IDE phase for FDA approval. Most patients presenting for surgery for rectal cancer have completed treatment with chemotherapy and radiation. This combination is associated with an increased risk of anastomotic leakage. The hope of the investigation of these devices is that we can be more selective about which patients require ileostomy placement at the time of rectal cancer surgery.',
      expertiseTags: [
        'colorectal surgery',
        'rectal cancer',
        'ileostomy avoidance',
        'intraluminal colonic device',
        'anastomotic leakage',
        'laparoscopic surgery',
        'robotic surgery',
        'Fusobacterium nucleatum',
        'opioid prescribing',
        'enhanced recovery protocols',
      ],
      collaborationNeeds: [
        'device development',
        'clinical trials',
        'FDA regulatory pathway',
        'biostatistics',
        'cancer biology',
        'health economics',
      ],
      contactInfo: 'bartley.pickron@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Intraluminal Colonic Device to Eliminate Ileostomy in Rectal Cancer Surgery (IDE Trials)',
        description:
          'Enrolling patients in two IDE-phase clinical trials studying intraluminal colonic devices that eliminate the need for protective ileostomy after primary anastomosis in rectal cancer resection. Both devices are in the FDA approval pathway. Goal is to reduce the morbidity of ileostomy creation and reversal for rectal cancer patients.',
        tags: ['rectal cancer', 'ileostomy avoidance', 'colonic device', 'clinical trial', 'FDA approval'],
        neededExpertise: ['device development', 'clinical trials', 'FDA regulatory pathway'],
        status: 'active',
        userId: pickron.id,
      },
      {
        title: 'Fusobacterium nucleatum and Clinicopathologic Features of Colorectal Cancer',
        description:
          'Multicenter ColoCare Study examining the relationship between Fusobacterium nucleatum and clinicopathologic features of colorectal cancer. Also studying post-discharge opioid consumption patterns as a tool for evaluating opioid prescribing guidelines and venous thromboembolism prevention in surgical patients.',
        tags: ['colorectal cancer', 'Fusobacterium nucleatum', 'cancer biology', 'opioid prescribing', 'surgical outcomes'],
        neededExpertise: ['biostatistics', 'cancer biology', 'health economics'],
        status: 'active',
        userId: pickron.id,
      },
    ],
  });

  // ── 3. Michael Rollins ───────────────────────────────────────────────────
  const rollins = await prisma.user.upsert({
    where: { email: 'michael.rollins@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Michael Rollins',
      email: 'michael.rollins@utah.edu',
      password: defaultPassword,
      department: 'Pediatric Surgery / Colorectal',
      university: 'University of Utah',
      bio: 'I am a board-certified pediatric surgeon with expertise in the treatment of patients with anorectal malformations (imperforate anus, cloaca) and Hirschsprung disease. I am the founder and director of the Pediatric Colorectal Center at Primary Children\'s Hospital. I am a co-founder of the Pediatric Colorectal and Pelvic Learning Consortium (PCPLC, pcplc.org), organized in 2016 as an international consortium of surgeons, scientists, and other specialists in order to facilitate research on anorectal malformations, Hirschsprung disease, and other colorectal and pelvic disorders. The PCPLC includes 24 clinical centers and a central data coordinating center (University of Utah) and maintains a detailed registry of patients. I am also working with the Department of Human Genetics to investigate genetic mutations responsible for Hirschsprung disease.',
      expertiseTags: [
        'anorectal malformations',
        'Hirschsprung disease',
        'pediatric colorectal surgery',
        'inflammatory bowel disease',
        'constipation',
        'fecal incontinence',
        'PCPLC consortium',
        'genetics of Hirschsprung disease',
        'ECMO',
        'neonatal surgery',
      ],
      collaborationNeeds: [
        'genetics',
        'multi-institutional research',
        'outcomes research',
        'biostatistics',
        'pediatric gastroenterology',
        'neonatology',
      ],
      contactInfo: 'michael.rollins@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'PCPLC Registry: Outcomes in Anorectal Malformations and Hirschsprung Disease',
        description:
          'International multicenter PCPLC registry study examining outcomes in anorectal malformations, Hirschsprung disease, constipation, fecal incontinence, and rectal prolapse across 24 clinical centers. Includes studies on delayed diagnosis impact, comparison to NSQIP-P, and colonic pull-through outcomes in cloacal exstrophy.',
        tags: ['anorectal malformations', 'Hirschsprung disease', 'PCPLC', 'pediatric colorectal', 'multicenter registry'],
        neededExpertise: ['multi-institutional research', 'biostatistics', 'pediatric gastroenterology'],
        status: 'active',
        userId: rollins.id,
      },
      {
        title: 'Genetic Mutations Responsible for Hirschsprung Disease',
        description:
          'Collaboration with the Department of Human Genetics at U of U Health to investigate genetic mutations responsible for Hirschsprung disease. Aims to identify causative and modifying genes that determine disease severity and outcomes, enabling earlier diagnosis and potentially targeted therapy.',
        tags: ['Hirschsprung disease', 'genetics', 'pediatric surgery', 'neonatal surgery', 'genetic mutations'],
        neededExpertise: ['genetics', 'neonatology', 'outcomes research'],
        status: 'active',
        userId: rollins.id,
      },
    ],
  });

  // ── 4. Robert A. Swendiman ───────────────────────────────────────────────
  const swendiman = await prisma.user.upsert({
    where: { email: 'robert.swendiman@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Robert A. Swendiman',
      email: 'robert.swendiman@utah.edu',
      password: defaultPassword,
      department: 'Pediatric Surgery',
      university: 'University of Utah',
      bio: 'My research is broadly focused on two main areas: pediatric trauma and inflammatory bowel disease. For the past decade I have studied the management of blunt solid organ injury in children, identifying variation in care when treating children at trauma centers with pediatric and adult designations. The intended impact has been to improve the rate of splenic salvage nationally and decrease variation of care across centers. This research now directly impacts the triage and transfer criteria for pediatric patients within the state of Utah through the Utah Pediatric Trauma Network. I was also recently awarded the Early Career Development Research Grant through the Primary Children\'s Hospital Foundation to develop the research arm of our Complex Pediatric Inflammatory Bowel Disease Clinic.',
      expertiseTags: [
        'pediatric surgery',
        'pediatric trauma',
        'blunt solid organ injury',
        'splenic salvage',
        'inflammatory bowel disease',
        'pediatric IBD',
        'ileal pouch anal anastomosis',
        'chest wall deformities',
        'trauma triage',
        'Utah Pediatric Trauma Network',
      ],
      collaborationNeeds: [
        'pediatric gastroenterology',
        'outcomes research',
        'clinical epidemiology',
        'trauma surgery',
        'implementation science',
        'health policy',
      ],
      contactInfo: 'robert.swendiman@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Utah Pediatric Trauma Network: Reducing Variation in Blunt Organ Injury Care',
        description:
          'Studying variation in care for pediatric blunt solid organ injury across trauma centers, with the goal of improving splenic salvage rates nationally. Research now directly impacts triage and transfer criteria for pediatric patients in Utah through the Utah Pediatric Trauma Network. Published in JAMA Pediatrics on surge in pediatric firearm injuries during COVID-19.',
        tags: ['pediatric trauma', 'splenic salvage', 'trauma triage', 'Utah Pediatric Trauma Network', 'variation in care'],
        neededExpertise: ['clinical epidemiology', 'outcomes research', 'health policy'],
        status: 'active',
        userId: swendiman.id,
      },
      {
        title: 'Complex Pediatric IBD Clinic: Outcomes After IPAA in Children',
        description:
          'Primary Children\'s Hospital Foundation Early Career Award-funded development of the research arm of the Complex Pediatric IBD Clinic. Focuses on outcomes after total proctocolectomy with ileal pouch anal anastomosis (IPAA) in children with severe ulcerative colitis and surgical treatment of Crohn\'s disease.',
        tags: ['inflammatory bowel disease', 'ileal pouch anal anastomosis', 'pediatric IBD', 'ulcerative colitis', 'outcomes research'],
        neededExpertise: ['pediatric gastroenterology', 'implementation science', 'outcomes research'],
        status: 'active',
        userId: swendiman.id,
      },
    ],
  });

  // ── 5. Maren Shipe ───────────────────────────────────────────────────────
  const shipe = await prisma.user.upsert({
    where: { email: 'maren.shipe@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Maren Shipe',
      email: 'maren.shipe@utah.edu',
      password: defaultPassword,
      department: 'Pediatric Surgery',
      university: 'University of Utah',
      bio: 'My research is focused on improving surgical care, decision making, and surgical outcomes for children. I use different methodologies combining large data sets with advanced statistical modeling techniques to help surgeons, patients, and families make data-driven decisions. My research background includes work on lung cancer prediction models, cost-effectiveness analysis of thoracic surgical procedures, and modeling the impact of diagnostic delays during COVID-19.',
      expertiseTags: [
        'pediatric surgery',
        'prediction modeling',
        'childhood cancer',
        'thoracic surgery',
        'lung cancer screening',
        'cost-effectiveness analysis',
        'surgical outcomes',
        'statistical modeling',
        'empyema',
        'congenital lung lesions',
      ],
      collaborationNeeds: [
        'biostatistics',
        'data science',
        'health economics',
        'clinical epidemiology',
        'machine learning',
        'thoracic surgery',
      ],
      contactInfo: 'maren.shipe@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Prediction Modeling for Childhood Cancer Surgical Outcomes',
        description:
          'Developing and applying advanced statistical prediction models to improve surgical decision making and outcomes for children with cancer. Uses large data sets combined with machine learning and logistic regression techniques. Background includes development of the TREAT 2.0 lung cancer prediction model for indeterminate pulmonary nodules.',
        tags: ['prediction modeling', 'childhood cancer', 'surgical outcomes', 'machine learning', 'data science'],
        neededExpertise: ['biostatistics', 'machine learning', 'clinical epidemiology'],
        status: 'active',
        userId: shipe.id,
      },
      {
        title: 'Cost-Effectiveness and Outcomes in Pediatric Thoracic Surgery',
        description:
          'Cost-effectiveness analysis of fibrinolysis versus thoracoscopic decortication for early empyema (Ann Thorac Surg 2021) and modeling the impact of delaying non-small cell lung cancer diagnosis during COVID-19. Applies health economics methods to optimize decision-making in pediatric thoracic and oncologic surgery.',
        tags: ['thoracic surgery', 'empyema', 'cost-effectiveness', 'pediatric surgery', 'COVID-19'],
        neededExpertise: ['health economics', 'data science', 'thoracic surgery'],
        status: 'active',
        userId: shipe.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 11):');
  console.log('  - Dr. Jessica N. Cohan      (jessica.cohan@utah.edu)');
  console.log('  - Dr. Bartley Pickron       (bartley.pickron@utah.edu)');
  console.log('  - Dr. Michael Rollins       (michael.rollins@utah.edu)');
  console.log('  - Dr. Robert A. Swendiman   (robert.swendiman@utah.edu)');
  console.log('  - Dr. Maren Shipe           (maren.shipe@utah.edu)');
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
