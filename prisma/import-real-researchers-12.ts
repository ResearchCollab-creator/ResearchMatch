import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 12)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Stephen Fenton ────────────────────────────────────────────────────
  const fenton = await prisma.user.upsert({
    where: { email: 'stephen.fenton@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Stephen Fenton',
      email: 'stephen.fenton@utah.edu',
      password: defaultPassword,
      department: 'Pediatric Surgery',
      university: 'University of Utah',
      bio: 'I am the founder and director of the Grant Scott Bonham Fetal Center at Primary Children\'s Hospital, which specializes in a multidisciplinary approach to the care of a pregnant mother whose fetus has been diagnosed with a complex congenital anomaly. I am also the founder of the Utah Pediatric Trauma Network, a statewide network inclusive of all regions and hospitals in Utah, to develop, refine, and recommend methodologies, standards and guidelines to reduce morbidity, mortality, and the cost of injury to pediatric patients. My research focus includes congenital diaphragmatic hernia, congenital lung lesions, and resource utilization in pediatric trauma care.',
      expertiseTags: [
        'pediatric surgery',
        'fetal surgery',
        'congenital diaphragmatic hernia',
        'congenital lung lesions',
        'neonatal surgery',
        'fetal in-utero intervention',
        'pediatric trauma',
        'Utah Pediatric Trauma Network',
        'ECMO',
        'minimally invasive surgery',
      ],
      collaborationNeeds: [
        'maternal-fetal medicine',
        'neonatology',
        'pediatric pulmonology',
        'trauma systems research',
        'health policy',
        'outcomes research',
      ],
      contactInfo: 'stephen.fenton@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Utah Pediatric Trauma Network: Statewide Trauma Collaborative Outcomes',
        description:
          'Founding and directing a statewide pediatric trauma collaborative that safely helps non-pediatric hospitals admit children with mild traumatic brain injury. Research demonstrates that a statewide solid organ injury protocol can optimize triage, treatment, and transfer of pediatric abdominal trauma. Published in J Trauma and Acute Care Surgery (2023).',
        tags: ['pediatric trauma', 'trauma network', 'statewide collaborative', 'traumatic brain injury', 'pediatric surgery'],
        neededExpertise: ['trauma systems research', 'health policy', 'outcomes research'],
        status: 'active',
        userId: fenton.id,
      },
      {
        title: 'Congenital Diaphragmatic Hernia: Timing of Repair and Neonatal Management',
        description:
          'Investigating controversies in neonatal management of congenital diaphragmatic hernia (CDH), including optimal timing of operative repair and ECMO support. Directs the Grant Scott Bonham Fetal Center for multidisciplinary care of complex congenital anomalies diagnosed prenatally.',
        tags: ['congenital diaphragmatic hernia', 'neonatal surgery', 'fetal surgery', 'ECMO', 'congenital lung lesions'],
        neededExpertise: ['maternal-fetal medicine', 'neonatology', 'pediatric pulmonology'],
        status: 'active',
        userId: fenton.id,
      },
    ],
  });

  // ── 2. Jayant Agarwal ────────────────────────────────────────────────────
  const agarwal = await prisma.user.upsert({
    where: { email: 'jayant.agarwal@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Jayant Agarwal',
      email: 'jayant.agarwal@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Plastic & Reconstructive Surgery',
      university: 'University of Utah',
      bio: 'My research is translational with an emphasis on identifying novel methods and devices to improve the lives of those undergoing reconstructive surgery after trauma or tumor extirpation. For the past 15 years I have held a weekly collaborative research group meeting that includes institutional experts in engineering and biological sciences. Our group has developed several technologies that solve problems related to vascular micro-anastomosis, peripheral nerve regeneration, bone remodeling and healing, and drug delivery science. Our team has received several grants from the NIH, VA, DOD, NSF and State of Utah. We have numerous issued patents and several of the technologies have been spun out to form new companies or licensed to existing companies.',
      expertiseTags: [
        'plastic and reconstructive surgery',
        'peripheral nerve regeneration',
        'drug delivery',
        'bone regeneration',
        'microvascular anastomosis',
        'percutaneous osseointegrated implants',
        'nerve guidance conduits',
        'amputee rehabilitation',
        'bioengineering',
        'translational surgery',
      ],
      collaborationNeeds: [
        'bioengineering',
        'neuroscience',
        'materials science',
        'drug delivery',
        'device commercialization',
        'rehabilitation medicine',
      ],
      contactInfo: 'jayant.agarwal@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Tacrolimus-Eluting Nerve Guidance Conduit for Peripheral Nerve Regeneration (NIH STTR)',
        description:
          'NIH STTR-funded project developing a tacrolimus-eluting nerve guidance conduit for enhanced regeneration in critical-sized peripheral nerve injuries. A tacrolimus-eluting conduit enhances regeneration in a critical-sized peripheral nerve injury rat model. Multiple issued patents and ongoing commercialization efforts.',
        tags: ['peripheral nerve regeneration', 'drug delivery', 'nerve guidance conduit', 'NIH STTR', 'bioengineering'],
        neededExpertise: ['bioengineering', 'neuroscience', 'drug delivery'],
        status: 'active',
        userId: agarwal.id,
      },
      {
        title: 'Percutaneous Osseointegrated Implants and Fluoridated Bone Scaffolds for Amputee Rehabilitation',
        description:
          'VA RR&D and DOD-funded development of percutaneous osseointegrated implants for transfemoral amputees and fluoridated bone scaffolds for treatment of critical-size defects. Novel vascular anastomotic coupling device for end-to-end anastomosis of arteries and veins (IEEE Trans Biomed Eng 2024).',
        tags: ['percutaneous osseointegrated implants', 'amputee rehabilitation', 'bone scaffolds', 'microvascular anastomosis', 'VA research'],
        neededExpertise: ['materials science', 'rehabilitation medicine', 'device commercialization'],
        status: 'active',
        userId: agarwal.id,
      },
    ],
  });

  // ── 3. Sujee Jeyapalina ──────────────────────────────────────────────────
  const jeyapalina = await prisma.user.upsert({
    where: { email: 'sujee.jeyapalina@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Sujee Jeyapalina',
      email: 'sujee.jeyapalina@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Plastics & Orthopaedics Research',
      university: 'University of Utah',
      bio: 'My research focuses on understanding the body\'s inflammatory responses to implanted medical devices and developing strategies to modulate these reactions — ultimately improving device longevity and patient outcomes. My primary focus is on understanding the healing responses of percutaneous osseointegrated (OI) implant systems. As one of the leading groups in the research and development of the percutaneous OI device system, we strive to understand the mechanisms of healing cascades using advance molecular techniques and contribute to improved patient care, device innovation, and scientific progress. Through an interdisciplinary and collaborative approach, our work extends beyond the laboratory, delivering tangible benefits for amputees — restoring mobility and enhancing quality of life.',
      expertiseTags: [
        'percutaneous osseointegrated prosthesis',
        'orthopedic implants',
        'implant inflammation',
        'bone scaffolds',
        'antimicrobial biomaterials',
        'RNA sequencing',
        'spatial genomics',
        'Long-COVID research',
        'dental implants',
        'wound healing',
      ],
      collaborationNeeds: [
        'immunology',
        'biomaterials science',
        'orthopedic surgery',
        'single-cell RNA sequencing',
        'veteran health research',
        'dental research',
      ],
      contactInfo: 'sujee.jeyapalina@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Percutaneous Osseointegrated Prosthesis (POP) for Amputee Rehabilitation (VA Trial)',
        description:
          'VARR&D Co-PI on functional expectations study for transhumeral percutaneous osseointegrated patients. Successful clinical feasibility trial led to a larger VA-supported clinical trial. R21-funded study determining efficacy of a novel apatite-based antimicrobial bone scaffold for craniofacial surgical applications.',
        tags: ['percutaneous osseointegrated prosthesis', 'amputee rehabilitation', 'bone scaffolds', 'VA research', 'clinical trial'],
        neededExpertise: ['orthopedic surgery', 'biomaterials science', 'veteran health research'],
        status: 'active',
        userId: jeyapalina.id,
      },
      {
        title: 'RNA-Based Techniques for Radiation-Induced Fibrosis and Long-COVID Research',
        description:
          'Using bulk RNA sequencing, single-cell RNA sequencing, and spatial genomics to study early molecular changes associated with radiation therapy and to investigate Long-COVID in the veteran population. Utilizes VA EHR datasets for studying COVID-19, dental implant failures, and breast implant complications.',
        tags: ['RNA sequencing', 'radiation-induced fibrosis', 'Long-COVID', 'spatial genomics', 'veterans health'],
        neededExpertise: ['single-cell RNA sequencing', 'immunology', 'dental research'],
        status: 'active',
        userId: jeyapalina.id,
      },
    ],
  });

  // ── 4. Teresa M. Bell ────────────────────────────────────────────────────
  const bell = await prisma.user.upsert({
    where: { email: 'teresa.bell@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Teresa M. Bell',
      email: 'teresa.bell@utah.edu',
      password: defaultPassword,
      department: 'Surgery / General Surgery',
      university: 'University of Utah',
      bio: 'The overall goal of my work is to 1) utilize real-world data, patient-reported outcomes, and surveillance informatics to optimize care for critically injured patients at risk for residual functional impairment and psychological sequelae, 2) translate research findings into meaningful outcomes for patients by implementing interventions scalable to regional trauma systems, and 3) improve administration of public health efforts by disseminating evidence-based guidelines nationally to reduce mortality, disability, and substance use disorders after injury. I have been awarded over $1.2M as Principal Investigator and contributed to $5M+ in clinical collaborator awards. My research has been funded by NICHD, NCATS, NIGMS, the Eastern Association for Surgery of Trauma, as well as state funding agencies.',
      expertiseTags: [
        'trauma surgery',
        'patient-reported outcomes',
        'real-world data',
        'opioid prescribing',
        'substance use disorders',
        'adolescent trauma',
        'surveillance informatics',
        'pediatric trauma',
        'care transitions',
        'traumatic brain injury',
      ],
      collaborationNeeds: [
        'data linkage',
        'clinical research design',
        'trauma systems research',
        'addiction medicine',
        'implementation science',
        'health informatics',
      ],
      contactInfo: 'teresa.bell@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Outpatient Opioid Prescriptions and Substance Use Disorders After Adolescent Trauma',
        description:
          'NIHCD-funded study demonstrating outpatient opioid prescriptions are associated with future substance use disorders and overdose following adolescent trauma (Ann Surg 2022). Technology-facilitated platform for addressing opioid risks and promoting resilience following traumatic injury in young people.',
        tags: ['adolescent trauma', 'opioid prescribing', 'substance use disorders', 'pediatric trauma', 'resilience'],
        neededExpertise: ['addiction medicine', 'clinical research design', 'health informatics'],
        status: 'active',
        userId: bell.id,
      },
      {
        title: 'Real-World Data and Surveillance Informatics for Critically Injured Patient Outcomes',
        description:
          'Using real-world data linkage and unstructured data enrichment to optimize care for critically injured patients at risk for residual functional impairment. Implements interventions scalable to regional trauma systems, including the Rwanda 912 mHealth application and telehealth recovery program for adolescent and young adult trauma survivors.',
        tags: ['real-world data', 'trauma systems', 'care transitions', 'patient-reported outcomes', 'mHealth'],
        neededExpertise: ['data linkage', 'trauma systems research', 'implementation science'],
        status: 'active',
        userId: bell.id,
      },
    ],
  });

  // ── 5. J.J. Horns ────────────────────────────────────────────────────────
  const horns = await prisma.user.upsert({
    where: { email: 'jj.horns@utah.edu' },
    update: {},
    create: {
      name: 'Dr. J.J. Horns',
      email: 'jj.horns@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Biostatistics',
      university: 'University of Utah',
      bio: 'I am a biostatistician with particular expertise in big-data analysis and serve the department of surgery as an analytic support resource for people interested in questions of public health. My role allows me to collaborate with hundreds of researchers across the department of surgery, other departments within the University of Utah, and institutions across the globe. Through these amazing partnerships I have had the opportunity to study everything from outcomes in patients undergoing gender affirming surgery to the mental health burden on pregnant women with extremely premature births. My personal research focuses on social discrepancies in access to, and efficacy of, healthcare.',
      expertiseTags: [
        'biostatistics',
        'big data analysis',
        'population health',
        'healthcare access',
        'social discrepancies',
        'familiality',
        'fertility outcomes',
        'emergency surgical access',
        'gender-affirming surgery',
        'mental health epidemiology',
      ],
      collaborationNeeds: [
        'clinical researchers across surgery',
        'population health researchers',
        'epidemiology',
        'health disparities researchers',
        'data science',
        'public health',
      ],
      contactInfo: 'jj.horns@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Social Discrepancies in Access to and Efficacy of Healthcare',
        description:
          'Personal research program investigating social discrepancies in access to and efficacy of healthcare across multiple domains: disparities in spatial access to emergency surgical services (JAMA Health Forum 2022), impact of socioeconomic status on fertility treatment outcomes, and effect of health service area on primary care physician provision of low-value cancer screening.',
        tags: ['health disparities', 'healthcare access', 'emergency surgery', 'population health', 'social determinants'],
        neededExpertise: ['epidemiology', 'population health researchers', 'data science'],
        status: 'active',
        userId: horns.id,
      },
      {
        title: 'Biostatistical Support for Surgery Department Research Collaborations',
        description:
          'Providing big-data analysis and biostatistical expertise as a collaborative resource across the University of Utah Department of Surgery. Active collaborations span trends in mental health and substance use disorder service utilization before/after bariatric surgery (Annals of Surgery 2025), fertility outcomes, and international research partnerships.',
        tags: ['biostatistics', 'big data', 'collaborative research', 'bariatric surgery', 'mental health'],
        neededExpertise: ['clinical researchers across surgery', 'public health', 'health disparities researchers'],
        status: 'active',
        userId: horns.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 12):');
  console.log('  - Dr. Stephen Fenton        (stephen.fenton@utah.edu)');
  console.log('  - Dr. Jayant Agarwal        (jayant.agarwal@utah.edu)');
  console.log('  - Dr. Sujee Jeyapalina      (sujee.jeyapalina@utah.edu)');
  console.log('  - Dr. Teresa M. Bell        (teresa.bell@utah.edu)');
  console.log('  - Dr. J.J. Horns            (jj.horns@utah.edu)');
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
