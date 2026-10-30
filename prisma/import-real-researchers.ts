import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing real researcher profiles...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Ademuyiwa Aromolaran ──────────────────────────────────────────────
  const aromolaran = await prisma.user.upsert({
    where: { email: 'ademuyiwa.aromolaran@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Ademuyiwa Aromolaran',
      email: 'ademuyiwa.aromolaran@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Cardiothoracic Surgery',
      university: 'University of Utah',
      bio: 'The Aromolaran lab utilizes state-of-the-art electrophysiological and biochemical approaches to address fundamental questions in ion channel biology and how it relates to life-threatening arrhythmias, functional deficits in the heart, and metabolic disorders. Specific areas of active research include the role of dietary interventions (including excess saturated fat) in modulating arrhythmic substrates and trigger mechanisms, the interaction of impaired myocardial bioenergetics and electrical function, and the role of heightened inflammation on remodeled ion channel biophysics and associated arrhythmogenesis.',
      expertiseTags: [
        'ion channel biology',
        'cellular electrophysiology',
        'arrhythmias',
        'heart failure',
        'metabolic disorders',
        'preclinical disease models',
        'electrophysiology',
        'cardiothoracic surgery',
      ],
      collaborationNeeds: [
        'clinical trials',
        'translational research',
        'biostatistics',
        'obesity research',
        'diabetes research',
        'inflammation biology',
      ],
      contactInfo: 'ademuyiwa.aromolaran@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Dietary Fat, Ion Channel Remodeling, and Arrhythmogenesis',
        description:
          'Investigating how excess saturated fat modulates arrhythmic substrates and trigger mechanisms in the heart. The project aims to identify novel druggable targets linking diet, metabolism, and cardiac electrical dysfunction.',
        tags: ['ion channel biology', 'arrhythmias', 'diet', 'metabolism', 'electrophysiology'],
        neededExpertise: ['clinical trials', 'translational research', 'biostatistics'],
        status: 'active',
        userId: aromolaran.id,
      },
      {
        title: 'Inflammation-Driven Ion Channel Biophysics in Heart Failure',
        description:
          'Examining the role of heightened inflammation on remodeled ion channel biophysics and associated arrhythmogenesis in heart failure patients. Goal is to validate novel druggable targets that could change health outcomes for millions.',
        tags: ['heart failure', 'inflammation', 'ion channel biology', 'preclinical disease models'],
        neededExpertise: ['obesity research', 'diabetes research', 'inflammation biology'],
        status: 'active',
        userId: aromolaran.id,
      },
    ],
  });

  // ── 2. Jason Glotzbach ───────────────────────────────────────────────────
  const glotzbach = await prisma.user.upsert({
    where: { email: 'jason.glotzbach@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Jason Glotzbach',
      email: 'jason.glotzbach@utah.edu',
      password: defaultPassword,
      department: 'Cardiothoracic Surgery',
      university: 'University of Utah',
      bio: 'My academic focus is in clinical and translational research related to aortic disease. My work focuses on filling in the knowledge gap of the causative clinical factors and genomic variants associated with the development and progression of bicuspid aortic valve (BAV) and BAV aortopathy. It is the hope that improved clinical outcomes and predictive aortic disease risk at the individual patient level will be possible. My other research focuses on investigating the genetic basis of various aortic diseases.',
      expertiseTags: [
        'aortic surgery',
        'aortic disease',
        'bicuspid aortic valve',
        'structural heart valve disease',
        'thoracic endovascular repair',
        'aortic dissection',
        'Marfan syndrome',
        'TAVR',
        'cardiothoracic surgery',
        'adult cardiac surgery',
      ],
      collaborationNeeds: [
        'genomics',
        'genetics',
        'clinical outcomes research',
        'epidemiology',
        'bioinformatics',
      ],
      contactInfo: 'jason.glotzbach@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Genomic Variants in Bicuspid Aortic Valve Disease and Aortopathy',
        description:
          'Identifying causative clinical factors and genomic variants associated with the development and progression of bicuspid aortic valve (BAV) and BAV aortopathy. Improved predictive models could enable individualized aortic disease risk assessment.',
        tags: [
          'bicuspid aortic valve',
          'aortic disease',
          'genomics',
          'structural heart disease',
          'genetics',
        ],
        neededExpertise: ['genomics', 'genetics', 'bioinformatics', 'epidemiology'],
        status: 'active',
        userId: glotzbach.id,
      },
      {
        title: 'Genetic Basis of Thoracic Aortic Disease',
        description:
          'Multi-institutional investigation of the genetic underpinnings of various aortic diseases including aortic aneurysm, dissection, and connective tissue disorders such as Marfan syndrome. Leveraging large-population databases for familial associations.',
        tags: ['aortic aneurysm', 'aortic dissection', 'genetics', 'Marfan syndrome', 'population database'],
        neededExpertise: ['clinical outcomes research', 'epidemiology', 'genomics'],
        status: 'active',
        userId: glotzbach.id,
      },
    ],
  });

  // ── 3. Eric R. Griffiths ─────────────────────────────────────────────────
  const griffiths = await prisma.user.upsert({
    where: { email: 'eric.griffiths@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Eric R. Griffiths',
      email: 'eric.griffiths@utah.edu',
      password: defaultPassword,
      department: 'Surgery (Pediatric Cardiac)',
      university: 'University of Utah',
      bio: 'My research focuses on improving outcomes for pediatric patients supported with ventricle assist devices, specifically patients with single ventricle anatomy. I am interested in optimizing device placement, timing of interventions and mechanisms of support to minimize complications. Our center has developed a national reputation for our work in single ventricle VAD support, especially for patients at stage I and II palliation. I am also an investigator with the Advanced Therapies Improving Outcomes (ACTION) Network, an international collaborative learning network where we published the largest series of single ventricle patients supported with VADs.',
      expertiseTags: [
        'congenital heart surgery',
        'cardiac transplant',
        'pediatric ventricle assist devices',
        'single ventricle palliation',
        'Fontan physiology',
        'Fontan associated liver disease',
        'ventricular assist devices',
        'complex biventricular repairs',
      ],
      collaborationNeeds: [
        'hepatology',
        'outcomes research',
        'data science',
        'biostatistics',
        'genomic sequencing',
        'clinical prediction models',
      ],
      contactInfo: 'eric.griffiths@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Optimizing VAD Support in Single Ventricle Pediatric Patients',
        description:
          'Investigating device placement, timing of interventions, and mechanisms of support to minimize complications in single ventricle patients on ventricular assist devices. Part of the ACTION Network international collaborative.',
        tags: [
          'ventricular assist devices',
          'single ventricle',
          'congenital heart disease',
          'pediatric surgery',
          'palliation',
        ],
        neededExpertise: ['outcomes research', 'biostatistics', 'clinical prediction models'],
        status: 'active',
        userId: griffiths.id,
      },
      {
        title: 'Genomic Predictors of Outcomes in Congenital Cardiac Surgery',
        description:
          'Applying genome sequencing to forecast surgical outcomes following congenital cardiac surgery, with a focus on identifying genetic markers that predict complications and guide personalized perioperative management.',
        tags: ['genomics', 'congenital heart disease', 'surgical outcomes', 'precision medicine'],
        neededExpertise: ['genomic sequencing', 'bioinformatics', 'data science'],
        status: 'active',
        userId: griffiths.id,
      },
    ],
  });

  // ── 4. Reilly Hobbs ──────────────────────────────────────────────────────
  const hobbs = await prisma.user.upsert({
    where: { email: 'reilly.hobbs@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Reilly Hobbs',
      email: 'reilly.hobbs@utah.edu',
      password: defaultPassword,
      department: 'Pediatric Cardiothoracic Surgery',
      university: 'University of Utah',
      bio: "Dr. Hobbs' clinical research focuses on the clinical outcomes of children born with congenital heart disease. His basic science interests are focused on identifying the interaction between specific organ cell death, immunologic pathways of clearance of cellular debris, and the identification of clinically relevant biomarkers for organ-specific cell death.",
      expertiseTags: [
        'neonatal and pediatric heart surgery',
        'heart transplantation',
        'ventricular assist devices',
        'ECMO',
        'aortic valve repair',
        'Ross procedure',
        'congenital heart disease',
        'single ventricle palliation',
        'Fontan associated liver disease',
      ],
      collaborationNeeds: [
        'biomarker discovery',
        'immunology',
        'cell death pathways',
        'neuroscience',
        'outcomes research',
        'clinical data analysis',
      ],
      contactInfo: 'reilly.hobbs@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Biomarkers of Organ-Specific Cell Death After Congenital Heart Surgery',
        description:
          'Identifying clinically relevant biomarkers for neurologic and organ-specific cellular injury following congenital heart surgery. Combines basic science investigation of cell death pathways with clinical outcome measurement.',
        tags: [
          'biomarkers',
          'congenital heart disease',
          'cell death',
          'immunology',
          'pediatric surgery',
        ],
        neededExpertise: ['biomarker discovery', 'immunology', 'cell death pathways', 'neuroscience'],
        status: 'active',
        userId: hobbs.id,
      },
      {
        title: 'Atrioventricular Valve Intervention Timing in Single Ventricle Palliation',
        description:
          'Investigating the impact of atrioventricular valve intervention at each stage of single ventricle palliation on outcomes including transplant-free survival and ventricular function.',
        tags: [
          'single ventricle palliation',
          'Fontan',
          'atrioventricular valve',
          'congenital heart disease',
          'surgical outcomes',
        ],
        neededExpertise: ['outcomes research', 'biostatistics', 'clinical data analysis'],
        status: 'active',
        userId: hobbs.id,
      },
    ],
  });

  // ── 5. Brian Mitzman ─────────────────────────────────────────────────────
  const mitzman = await prisma.user.upsert({
    where: { email: 'brian.mitzman@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Brian Mitzman',
      email: 'brian.mitzman@utah.edu',
      password: defaultPassword,
      department: 'Cardiothoracic Surgery',
      university: 'University of Utah',
      bio: 'My academic focus is in value-driven analysis of patient-derived outcomes in surgery using population-based data. My work focuses on formal cost-effectiveness analyses and billing variability to examine the state of healthcare economics on a national level in the surgical realm. Studies have evaluated the variability in billing for surgical resections in lung cancer patients and found predictors of excess charges by region and practice type. In progress funded work includes an NIMHD R21 evaluating lung cancer screening strategies and a Site PI for TROPION-Lung12, a Phase III trial evaluating novel agents in resected early-stage lung cancer from AstraZeneca.',
      expertiseTags: [
        'robotic surgery',
        'minimally invasive surgery',
        'thoracic malignancy',
        'lung cancer',
        'esophageal cancer',
        'value-based surgical care',
        'cost-effectiveness in healthcare',
        'health economics',
        'surgical outcomes',
        'clinical trials',
      ],
      collaborationNeeds: [
        'health economist',
        'data scientist',
        'outcomes researcher',
        'biostatistics',
        'health services research',
        'cancer screening methods',
      ],
      contactInfo: 'brian.mitzman@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Billing Variability and Cost-Effectiveness of Lung Cancer Resections',
        description:
          'Evaluating the variability in billing for surgical resections in lung cancer patients and identifying predictors of excess charges by region and practice type. Uses large national population-based datasets for generalizable outcomes.',
        tags: [
          'lung cancer',
          'health economics',
          'cost-effectiveness',
          'billing variability',
          'population-based research',
        ],
        neededExpertise: ['health economist', 'health services research', 'biostatistics'],
        status: 'active',
        userId: mitzman.id,
      },
      {
        title: 'Distributionally-Optimal Lung Cancer Screening Strategies (NIMHD R21)',
        description:
          'Evaluating lung cancer screening strategies through a distributional cost-effectiveness analysis to address disparities in screening access and outcomes across diverse populations.',
        tags: ['lung cancer', 'cancer screening', 'health disparities', 'cost-effectiveness', 'NIMHD'],
        neededExpertise: ['data scientist', 'outcomes researcher', 'cancer screening methods'],
        status: 'active',
        userId: mitzman.id,
      },
    ],
  });

  console.log('Successfully imported 5 real researcher profiles:');
  console.log('  - Dr. Ademuyiwa Aromolaran (ademuyiwa.aromolaran@utah.edu)');
  console.log('  - Dr. Jason Glotzbach     (jason.glotzbach@utah.edu)');
  console.log('  - Dr. Eric R. Griffiths   (eric.griffiths@utah.edu)');
  console.log('  - Dr. Reilly Hobbs        (reilly.hobbs@utah.edu)');
  console.log('  - Dr. Brian Mitzman       (brian.mitzman@utah.edu)');
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
