import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 3)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Derek J. Dosdall ──────────────────────────────────────────────────
  const dosdall = await prisma.user.upsert({
    where: { email: 'derek.dosdall@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Derek J. Dosdall',
      email: 'derek.dosdall@utah.edu',
      password: defaultPassword,
      department: 'Surgery / CVRTI',
      university: 'University of Utah',
      bio: 'My research has implemented and developed innovative cardiac arrhythmia mapping techniques to understand the substrate and mechanisms that lead to arrhythmia onset and maintenance. My team has particular expertise in developing large animal models of arrhythmias to investigate mechanistic underpinnings and to develop effective therapies. Our research has revealed the role of the specialized conduction system in ventricular fibrillation. We are developing new leads and algorithms for implanted devices for patients at risk for arrhythmias, and testing a novel gene therapy for heart failure by evaluating remodeling at the nanostructural, cellular, tissue, and whole heart levels.',
      expertiseTags: [
        'cardiac arrhythmia mapping',
        'Purkinje fiber biology',
        'ventricular fibrillation',
        'cardiac device technology',
        'large animal models',
        'electrophysiology',
        'bioengineering',
        'gene therapy',
        'cardiac conduction system',
        'pre-clinical animal models',
      ],
      collaborationNeeds: [
        'gene therapy',
        'cardiac surgery',
        'clinical translation',
        'bioengineering',
        'molecular cardiology',
        'device engineering',
      ],
      contactInfo: 'derek.dosdall@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Novel Gene Therapy for Ischemic Heart Failure',
        description:
          'Testing a novel AAV9-cBIN1 gene therapy that rescues chronic heart failure due to ischemic cardiomyopathy in a canine model. The therapy has demonstrated significant functional and hemodynamic improvement in a relevant pre-clinical model, evaluating remodeling at the nanostructural, cellular, tissue, and whole heart levels.',
        tags: ['gene therapy', 'heart failure', 'ischemic cardiomyopathy', 'pre-clinical model', 'AAV9'],
        neededExpertise: ['gene therapy', 'molecular cardiology', 'clinical translation'],
        status: 'active',
        userId: dosdall.id,
      },
      {
        title: 'Purkinje System and Specialized Conduction in Ventricular Fibrillation',
        description:
          'Investigating the role of the specialized conduction system in ventricular fibrillation onset and maintenance, and identifying effective methods for utilizing the His-Purkinje system to terminate ventricular arrhythmias. Developing new leads and algorithms for implanted devices for patients at risk.',
        tags: ['ventricular fibrillation', 'Purkinje fiber', 'cardiac conduction', 'arrhythmia mapping', 'cardiac devices'],
        neededExpertise: ['device engineering', 'bioengineering', 'cardiac surgery'],
        status: 'active',
        userId: dosdall.id,
      },
    ],
  });

  // ── 2. Matthew L. Goodwin ────────────────────────────────────────────────
  const goodwin = await prisma.user.upsert({
    where: { email: 'matthew.goodwin@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Matthew L. Goodwin',
      email: 'matthew.goodwin@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Cardiothoracic Surgery',
      university: 'University of Utah',
      bio: 'My research is broadly focused on outcomes in heart and lung transplantation. In the past few years there have been new and innovative procurement and transplantation methods in thoracic transplantation. I utilize national and institutional datasets to investigate these novel techniques on transplantation outcomes. More recently, we have been investigating advanced echocardiographic techniques in predicting post-operative outcomes in thoracic transplantation and durable ventricular support. I am the Principal Investigator for our institution for the ROMA Trial, a multicenter prospective clinical trial investigating single versus multiple arterial grafts for women undergoing coronary artery bypass surgeries.',
      expertiseTags: [
        'heart and lung transplantation',
        'thoracic surgery',
        'mechanical circulatory support',
        'echocardiography',
        'cardiac surgery',
        'coronary artery disease',
        'valve surgery',
        'cardiogenic shock',
        'durable ventricular support',
        'donor procurement',
      ],
      collaborationNeeds: [
        'clinical data analysis',
        'outcomes research',
        'biostatistics',
        'echocardiography research',
        'health services research',
      ],
      contactInfo: 'matthew.goodwin@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'ROMA Trial: Multiple vs. Single Arterial Grafts for Women in CABG',
        description:
          'Multicenter prospective clinical trial (ROMA Trial) investigating single versus multiple arterial grafts for women undergoing coronary artery bypass surgeries. Serving as Principal Investigator for the University of Utah site.',
        tags: ['coronary artery bypass', 'clinical trial', 'cardiac surgery', 'women\'s health', 'arterial grafts'],
        neededExpertise: ['biostatistics', 'clinical data analysis', 'outcomes research'],
        status: 'active',
        userId: goodwin.id,
      },
      {
        title: 'Advanced Echocardiography for Post-Transplant Outcomes Prediction',
        description:
          'Investigating advanced echocardiographic techniques in predicting post-operative outcomes in thoracic transplantation and durable ventricular support. Uses national and institutional datasets to evaluate novel procurement and transplantation methods.',
        tags: ['echocardiography', 'heart transplantation', 'lung transplantation', 'mechanical circulatory support', 'outcomes'],
        neededExpertise: ['echocardiography research', 'health services research', 'biostatistics'],
        status: 'active',
        userId: goodwin.id,
      },
    ],
  });

  // ── 3. Hongchao Guo ──────────────────────────────────────────────────────
  const guo = await prisma.user.upsert({
    where: { email: 'hongchao.guo@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Hongchao Guo',
      email: 'hongchao.guo@utah.edu',
      password: defaultPassword,
      department: 'Surgery / CVRTI',
      university: 'University of Utah',
      bio: 'I have developed a laboratory focusing on deciphering the genetic and epigenetic mechanisms underlying cardiovascular development and diseases. The research goal of my lab is to develop precise medicine for patients with cardiovascular disease using a combination of molecular/cellular biology, stem cell and mice models, and next-generation sequencing and genome editing technologies. I have applied next-generation sequencing technologies in the human induced pluripotent stem cell (iPSC) differentiation model and identified novel regulators (e.g. BANCR, SETD7) in heart development and disease, which provide potential therapeutic targets for heart disease. My lab is funded by NIH K99/R00 career development award.',
      expertiseTags: [
        'stem cell biology',
        'iPSC',
        'genetics',
        'epigenetics',
        'cardiovascular development',
        'genome editing',
        'next-generation sequencing',
        'CRISPR',
        'regeneration',
        'molecular biology',
        'cardiovascular disease',
      ],
      collaborationNeeds: [
        'cardiovascular medicine',
        'clinical translation',
        'bioinformatics',
        'genomics',
        'cardiology',
        'precision medicine',
      ],
      contactInfo: 'hongchao.guo@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'iPSC Models of Cardiovascular Developmental Disorders',
        description:
          'Using human induced pluripotent stem cell (iPSC) differentiation models and next-generation sequencing to identify novel genetic and epigenetic regulators (e.g. BANCR, SETD7) of heart development and disease. Findings provide potential therapeutic targets for heart disease.',
        tags: ['iPSC', 'cardiovascular development', 'genetics', 'epigenetics', 'stem cell biology'],
        neededExpertise: ['bioinformatics', 'genomics', 'cardiology'],
        status: 'active',
        userId: guo.id,
      },
      {
        title: 'Epigenetic Regulation of Cardiovascular Disease by Behavioral and Environmental Risk Factors',
        description:
          'Investigating epigenetic mechanisms linking behavioral (smoking, e-cigarettes, alcohol) and environmental factors to cardiovascular disease. Identifying mechanistic, diagnostic, and therapeutic insights that hold promise for identifying precise treatment approaches.',
        tags: ['epigenetics', 'cardiovascular disease', 'precision medicine', 'risk factors', 'genome editing'],
        neededExpertise: ['clinical translation', 'cardiovascular medicine', 'precision medicine'],
        status: 'active',
        userId: guo.id,
      },
    ],
  });

  // ── 4. S. Adil Husain ────────────────────────────────────────────────────
  const husain = await prisma.user.upsert({
    where: { email: 'adil.husain@utah.edu' },
    update: {},
    create: {
      name: 'Dr. S. Adil Husain',
      email: 'adil.husain@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Pediatric Cardiothoracic Surgery',
      university: 'University of Utah',
      bio: 'As Section Chief of Pediatric Cardiothoracic Surgery, I have directed my research focus into areas of greatest interest but also those that will help our group expand in regards to national recognition. The University of Utah Health has been a contributing center to several such projects, which include the study of stem cells in the treatment of single ventricle disease, the utility of intraoperative steroid administration in neonatal cardiac surgery, long term outcomes for the Ross procedure in neonates and infants, and the impact of AV valve interventions during the various stages of single ventricle palliation. Our program is also the highest enroller of patients in several registries associated with the Congenital Heart Surgeons Society (CHSS).',
      expertiseTags: [
        'pediatric cardiothoracic surgery',
        'Ross procedure',
        'congenital heart surgery',
        'single ventricle palliation',
        'neonatal cardiac surgery',
        'stem cell therapy',
        'atrioventricular valve interventions',
        'heart center leadership',
        'surgical registry',
      ],
      collaborationNeeds: [
        'stem cell biology',
        'clinical trials',
        'outcomes research',
        'biostatistics',
        'neonatology',
        'pediatric cardiology',
      ],
      contactInfo: 'adil.husain@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'ALPS Trial: Mesenchymal Stem Cell Injections in Hypoplastic Left Heart Syndrome',
        description:
          'Multi-institutional trial evaluating allogeneic human mesenchymal stem cell (hMSC) injections in patients with hypoplastic left heart syndrome (HLHS). Investigating stem cells as a therapy to support ventricular function in single ventricle congenital heart disease.',
        tags: ['stem cell therapy', 'hypoplastic left heart syndrome', 'congenital heart disease', 'single ventricle', 'clinical trial'],
        neededExpertise: ['stem cell biology', 'clinical trials', 'pediatric cardiology'],
        status: 'active',
        userId: husain.id,
      },
      {
        title: 'AV Valve Interventions During Single Ventricle Palliation — CHSS Registry Study',
        description:
          'Investigating the role of atrioventricular valve interventions during each stage of palliative surgery for patients with single ventricle. Leveraging the Congenital Heart Surgeons Society (CHSS) registry — the largest enrolling program — to generate robust outcomes data.',
        tags: ['single ventricle palliation', 'atrioventricular valve', 'congenital heart surgery', 'surgical registry', 'outcomes'],
        neededExpertise: ['outcomes research', 'biostatistics', 'surgical registry'],
        status: 'active',
        userId: husain.id,
      },
    ],
  });

  // ── 5. Craig H. Selzman ──────────────────────────────────────────────────
  const selzman = await prisma.user.upsert({
    where: { email: 'craig.selzman@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Craig H. Selzman',
      email: 'craig.selzman@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Cardiothoracic Surgery',
      university: 'University of Utah',
      bio: 'Our research spans the basic and clinical sciences. We are focused on patients with advanced forms of heart failure that often require mechanical support. In particular, we are keen to investigate the factors that are involved with making a bad heart recover — both clinically and biologically. We are involved with a number of clinical trials investigating innovative technologies to support the failing heart. Our basic and translational science is based at the Cardiovascular Research and Training Institute. Historically, we have focused on transcriptional regulation of inflammation in myocardial ischemia-reperfusion and pressure overload. More recently, we have been examining the role of human amniotic fluid as a robust cardioprotective agent.',
      expertiseTags: [
        'cardiothoracic surgery',
        'mechanical circulatory support',
        'heart transplantation',
        'heart failure',
        'LVAD',
        'myocardial ischemia-reperfusion',
        'myocardial hypertrophy',
        'amniotic fluid cardioprotection',
        'cardiac surgery',
        'translational cardiology',
      ],
      collaborationNeeds: [
        'basic science',
        'molecular biology',
        'clinical trials',
        'translational research',
        'inflammation biology',
        'regenerative medicine',
      ],
      contactInfo: 'craig.selzman@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Human Amniotic Fluid as a Cardioprotective Agent',
        description:
          'Examining the role of human amniotic fluid as a robust cardioprotective agent in the setting of heart failure and cardiac surgery. Randomized, double-blind, placebo-controlled clinical trial of sterile filtered human amniotic fluid for treatment of COVID-19 related cardiac complications.',
        tags: ['amniotic fluid', 'cardioprotection', 'heart failure', 'cardiac surgery', 'clinical trial'],
        neededExpertise: ['clinical trials', 'translational research', 'molecular biology'],
        status: 'active',
        userId: selzman.id,
      },
      {
        title: 'Transcriptional Regulation of Inflammation in Myocardial Ischemia-Reperfusion',
        description:
          'Investigating transcriptional regulation of inflammation in myocardial ischemia-reperfusion and pressure overload. Basic and translational science conducted at CVRTI, with the goal of identifying molecular targets to improve myocardial recovery after injury.',
        tags: ['myocardial ischemia-reperfusion', 'inflammation', 'heart failure', 'transcription factors', 'translational cardiology'],
        neededExpertise: ['molecular biology', 'inflammation biology', 'regenerative medicine'],
        status: 'active',
        userId: selzman.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 3):');
  console.log('  - Dr. Derek J. Dosdall    (derek.dosdall@utah.edu)');
  console.log('  - Dr. Matthew L. Goodwin  (matthew.goodwin@utah.edu)');
  console.log('  - Dr. Hongchao Guo        (hongchao.guo@utah.edu)');
  console.log('  - Dr. S. Adil Husain      (adil.husain@utah.edu)');
  console.log('  - Dr. Craig H. Selzman    (craig.selzman@utah.edu)');
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
