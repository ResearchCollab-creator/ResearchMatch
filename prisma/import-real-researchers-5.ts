import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 5)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Alvin C. Kwok ─────────────────────────────────────────────────────
  const kwok = await prisma.user.upsert({
    where: { email: 'alvin.kwok@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Alvin C. Kwok',
      email: 'alvin.kwok@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Plastic Surgery',
      university: 'University of Utah',
      bio: 'There are generally higher rates of postoperative adverse events after reconstructive surgery compared to other non-reconstructive procedures. My research focuses on improving patient outcomes after reconstructive surgery using database-driven research techniques as well as clinical trials. My work spans breast reconstruction, oncologic reconstruction, and microsurgery, with a particular focus on identifying modifiable risk factors and optimizing perioperative care to reduce complications and improve patient safety.',
      expertiseTags: [
        'breast reconstruction',
        'oncologic reconstruction',
        'plastic surgery',
        'microsurgery',
        'reconstructive surgery',
        'clinical outcomes research',
        'quality improvement',
        'patient safety',
        'database-driven research',
        'free flap reconstruction',
      ],
      collaborationNeeds: [
        'health services research',
        'biostatistics',
        'clinical trials',
        'oncology',
        'database analysis',
        'frailty assessment',
      ],
      contactInfo: 'alvin.kwok@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Outcomes of Prepectoral vs. Subpectoral Tissue Expander Placement in Breast Reconstruction',
        description:
          'Evaluating early complications after prepectoral tissue expander placement in first-stage breast reconstruction with and without acellular dermal matrix. Uses NSQIP and institutional databases to compare immediate, delayed immediate, and delayed autologous free flap breast reconstruction outcomes (2010–2020).',
        tags: ['breast reconstruction', 'tissue expander', 'plastic surgery', 'clinical outcomes', 'NSQIP'],
        neededExpertise: ['biostatistics', 'database analysis', 'clinical trials'],
        status: 'active',
        userId: kwok.id,
      },
      {
        title: 'Frailty and Microvascular Breast Reconstruction: National Trends and Risk Stratification',
        description:
          'Analyzing the modified five-item frailty index for predicting complications following free flap breast reconstruction and national trends in length of stay for microvascular breast reconstruction using the ACS NSQIP database (10,465 cases).',
        tags: ['microsurgery', 'breast reconstruction', 'frailty', 'patient safety', 'quality improvement'],
        neededExpertise: ['health services research', 'frailty assessment', 'oncology'],
        status: 'active',
        userId: kwok.id,
      },
    ],
  });

  // ── 2. Chelsea A. Harris ─────────────────────────────────────────────────
  const harris = await prisma.user.upsert({
    where: { email: 'chelsea.harris@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Chelsea A. Harris',
      email: 'chelsea.harris@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Plastic & Reconstructive Surgery',
      university: 'University of Utah',
      bio: 'My research mission centers on eliminating disparities for both patients and health care workers. The cornerstone of this work is the Cultural Complications Curriculum (CulturalComplications.com), a program that leveraged Morbidity & Mortality conferences to help clinicians address instances of cultural breakdown with the same rigor applied to medical or surgical errors. This work combines qualitative methodology, complex survey techniques, and database analyses to generate a holistic understanding of how identity and context impact outcomes. The curriculum has been requested by over 600 departments globally. My work is a featured element of the ACS Diversity Equity & Inclusion toolkit and The SECOND trial interventions. On the clinical side, my scholarship examines how to better elucidate patient preferences and integrate those preferences into care across a spectrum of disease from wound care to abdominal wall reconstruction.',
      expertiseTags: [
        'plastic and reconstructive surgery',
        'health disparities',
        'diversity equity and inclusion',
        'cultural competency in surgery',
        'surgical education',
        'wound care',
        'abdominoplasty',
        'qualitative research',
        'health services research',
        'organizational behavior',
      ],
      collaborationNeeds: [
        'qualitative research',
        'DEI research',
        'health equity',
        'organizational behavior',
        'survey research',
        'implementation science',
      ],
      contactInfo: 'chelsea.harris@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Cultural Complications Curriculum: Addressing Disparities in Surgical Care',
        description:
          'Developing and disseminating the Cultural Complications Curriculum (CulturalComplications.com), a program that leverages M&M conferences to address instances of cultural breakdown. Combines qualitative methodology, complex survey techniques, and database analyses. Featured in the ACS Diversity Equity & Inclusion toolkit and The SECOND trial interventions. Requested by over 600 departments globally.',
        tags: ['DEI', 'cultural competency', 'surgical education', 'health disparities', 'qualitative research'],
        neededExpertise: ['qualitative research', 'DEI research', 'implementation science'],
        status: 'active',
        userId: harris.id,
      },
      {
        title: 'Patient Preferences and Functional Outcomes in Abdominal Wall Reconstruction',
        description:
          'Examining how to better elucidate patient preferences and integrate those preferences into care across a spectrum of disease from wound care to abdominal wall reconstruction. Uses survey techniques and database analyses to understand identity and context impacts on outcomes.',
        tags: ['abdominal wall reconstruction', 'patient preferences', 'wound care', 'health services research', 'outcomes'],
        neededExpertise: ['survey research', 'health equity', 'organizational behavior'],
        status: 'active',
        userId: harris.id,
      },
    ],
  });

  // ── 3. Scott S. Short ────────────────────────────────────────────────────
  const short = await prisma.user.upsert({
    where: { email: 'scott.short@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Scott S. Short',
      email: 'scott.short@utah.edu',
      password: defaultPassword,
      department: 'Pediatric Surgery',
      university: 'University of Utah',
      bio: 'My research focuses on impacting patient clinical outcomes and quality. At University of Utah Health, I lead the involvement in the ENRICH-US trial, a national multi-institutional R01-funded study evaluating methods to improve surgical outcomes in children. I am also involved in multiple surgical collaboratives that allow for larger studies needed to improve the surgical care of children, including the PCPLC, Western Pediatric Surgical Research Collaborative, and multi-institutional studies utilizing data from NSQIP. My clinical focus includes pediatric colorectal surgery, inflammatory bowel disease, and minimally invasive pediatric surgery.',
      expertiseTags: [
        'pediatric surgery',
        'pediatric general surgery',
        'inflammatory bowel disease',
        'anorectal malformation',
        'Hirschsprung disease',
        'pediatric colorectal surgery',
        'ERAS',
        'quality improvement',
        'patient safety',
        'clinical outcomes',
        'minimally invasive surgery',
      ],
      collaborationNeeds: [
        'health services research',
        'outcomes research',
        'biostatistics',
        'clinical trials',
        'pediatric gastroenterology',
        'implementation science',
      ],
      contactInfo: 'scott.short@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'ENRICH-US Trial: Improving Surgical Outcomes in Children (NIH R01)',
        description:
          'National multi-institutional R01-funded study (ENRICH-US trial) evaluating methods to improve surgical outcomes in children. Site PI for this landmark collaborative involving the PCPLC, Western Pediatric Surgical Research Collaborative, and multi-institutional NSQIP data.',
        tags: ['pediatric surgery', 'clinical trial', 'NIH', 'surgical outcomes', 'quality improvement'],
        neededExpertise: ['biostatistics', 'clinical trials', 'implementation science'],
        status: 'active',
        userId: short.id,
      },
      {
        title: 'Colorectal and Pelvic Learning Consortium (PCPLC) Outcomes Studies',
        description:
          'Multi-institutional studies through the Pediatric Colorectal and Pelvic Learning Consortium (PCPLC) examining outcomes in anorectal malformation, Hirschsprung disease, constipation, fecal incontinence, and rectal prolapse. Co-Chair of the 2025 PCPLC Annual Conference.',
        tags: ['anorectal malformation', 'Hirschsprung disease', 'pediatric colorectal surgery', 'fecal incontinence', 'clinical outcomes'],
        neededExpertise: ['outcomes research', 'health services research', 'pediatric gastroenterology'],
        status: 'active',
        userId: short.id,
      },
    ],
  });

  // ── 4. Katie Russell ─────────────────────────────────────────────────────
  const russell = await prisma.user.upsert({
    where: { email: 'katie.russell@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Katie Russell',
      email: 'katie.russell@utah.edu',
      password: defaultPassword,
      department: 'Pediatric Surgery',
      university: 'University of Utah',
      bio: 'My research focuses on advancing the care of injured and sick children through pediatric trauma and surgery research, with an emphasis on multi-institutional collaboration and clinical trials. I am a founding member and incoming president of the Western Pediatric Surgery Research Consortium (WPSRC) and serve on the board of the A+ Pediatric Trauma Network, where I work to foster large-scale, cooperative studies that improve outcomes for children. My current areas of investigation include implementation of the Pediatric Brain Injury Guidelines for Kids, development of evidence-based protocols for pediatric cervical spine clearance, teletrauma, and the creation of a Western Pediatric Trauma Network to optimize systems of care. On July 31, 2025, I completed a multi-institutional trial through the WTA enrolling 72 sites and 19,000 children in a prospective study on pediatric cervical spine clearance.',
      expertiseTags: [
        'pediatric trauma',
        'pediatric surgery',
        'cervical spine clearance',
        'brain injury guidelines',
        'teletrauma',
        'pectus deformities',
        'congenital diaphragmatic hernia',
        'whole blood resuscitation',
        'multi-institutional research',
        'trauma networks',
      ],
      collaborationNeeds: [
        'clinical trials',
        'multi-institutional collaboration',
        'trauma research',
        'pediatric neurosurgery',
        'implementation science',
        'biostatistics',
      ],
      contactInfo: 'katie.russell@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Pediatric Brain Injury Guidelines for Kids (BIG) — WTA Multi-Institutional Trial',
        description:
          'Multi-institutional trial through the Western Trauma Association (WTA) enrolling 72 sites and 19,000 children in a prospective study on pediatric cervical spine clearance and implementation of the Pediatric Brain Injury Guidelines for Kids. Completed July 2025.',
        tags: ['pediatric trauma', 'brain injury', 'cervical spine', 'clinical trial', 'WTA'],
        neededExpertise: ['clinical trials', 'multi-institutional collaboration', 'pediatric neurosurgery'],
        status: 'active',
        userId: russell.id,
      },
      {
        title: 'Western Pediatric Trauma Network: Teletrauma and Systems of Care',
        description:
          'Creating a Western Pediatric Trauma Network to optimize systems of care and developing a pediatric teletrauma program to improve access to pediatric trauma care and timely assessment of pediatric traumas. Founding member and incoming president of the WPSRC.',
        tags: ['pediatric trauma', 'teletrauma', 'trauma network', 'systems of care', 'multi-institutional'],
        neededExpertise: ['implementation science', 'biostatistics', 'trauma research'],
        status: 'active',
        userId: russell.id,
      },
    ],
  });

  // ── 5. Zachary Kastenberg ────────────────────────────────────────────────
  const kastenberg = await prisma.user.upsert({
    where: { email: 'zachary.kastenberg@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Zachary Kastenberg',
      email: 'zachary.kastenberg@utah.edu',
      password: defaultPassword,
      department: 'Pediatric Surgery',
      university: 'University of Utah',
      bio: 'I am a pediatric surgeon with a long-standing interest in childhood liver disease, health policy, and health economics. My current academic efforts combine a clinical practice in pediatric hepatobiliary surgery and liver transplantation with research employing the strategies of econometrics and cost-effectiveness analysis. I completed a three-year AHRQ T32-funded postdoctoral fellowship providing formal methodologic training in Health Services Research. My research focuses on defining high-risk patient cohorts through database analyses, evaluating diagnostic tests, and describing the cost-effectiveness of novel diagnostic strategies when employed across populations. Through the Intermountain Foundation at Primary Children\'s Hospital I leveraged an Early Career Development Award to describe important disparities in care for infants with biliary atresia and identify the incremental health care costs associated with these disparities.',
      expertiseTags: [
        'pediatric surgery',
        'pediatric hepatobiliary surgery',
        'liver transplant',
        'biliary atresia',
        'hepatoblastoma',
        'health economics',
        'cost-effectiveness analysis',
        'health services research',
        'pediatric liver disease',
        'econometrics',
      ],
      collaborationNeeds: [
        'health policy',
        'econometrics',
        'biostatistics',
        'pediatric hepatology',
        'liver biology',
        'neonatology',
      ],
      contactInfo: 'zachary.kastenberg@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Disparities in Biliary Atresia Care: Costs and Health Policy Implications',
        description:
          'Describing important disparities in care for infants with biliary atresia and identifying the incremental health care costs associated with these disparities. Evaluating cost-effectiveness of population-based bilirubin screening for early detection of biliary atresia in this vulnerable population.',
        tags: ['biliary atresia', 'health disparities', 'health economics', 'cost-effectiveness', 'neonatal surgery'],
        neededExpertise: ['health policy', 'econometrics', 'neonatology'],
        status: 'active',
        userId: kastenberg.id,
      },
      {
        title: 'Hepatoblastoma Surgical Guidelines and Outcomes (VPCAT/COG AHEP0731)',
        description:
          "Implementation of comprehensive surgical guidelines for hepatoblastoma through analysis of the Children's Oncology Group AHEP0731 Phase III trial. Also examining the age-stratified cost of biliary atresia and defining high-risk pediatric liver disease cohorts through national database analyses.",
        tags: ['hepatoblastoma', 'pediatric liver disease', 'surgical guidelines', 'clinical trial', 'oncology'],
        neededExpertise: ['biostatistics', 'pediatric hepatology', 'liver biology'],
        status: 'active',
        userId: kastenberg.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 5):');
  console.log('  - Dr. Alvin C. Kwok          (alvin.kwok@utah.edu)');
  console.log('  - Dr. Chelsea A. Harris       (chelsea.harris@utah.edu)');
  console.log('  - Dr. Scott S. Short          (scott.short@utah.edu)');
  console.log('  - Dr. Katie Russell           (katie.russell@utah.edu)');
  console.log('  - Dr. Zachary Kastenberg      (zachary.kastenberg@utah.edu)');
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
