import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 2)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Joseph Tonna ──────────────────────────────────────────────────────
  const tonna = await prisma.user.upsert({
    where: { email: 'joseph.tonna@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Joseph Tonna',
      email: 'joseph.tonna@utah.edu',
      password: defaultPassword,
      department: 'Surgery',
      university: 'University of Utah',
      bio: 'My overall career focus is as a clinical trialist of rescue therapies for critically ill patients, such as extracorporeal membrane oxygenation (ECMO). Since 2014, I have produced a body of research on ECMO during cardiac arrest (extracorporeal cardiopulmonary resuscitation, ECPR) and authored >140 publications. I am the Chair of the Registry Committee of the Extracorporeal Life Support Organization (ELSO), overseeing the world\'s largest ECMO Registry, and have led/co-led three international guidelines in ECMO. My research currently focuses on understanding the association between clinical management during ECPR and survival.',
      expertiseTags: [
        'extracorporeal membrane oxygenation',
        'ECMO',
        'extracorporeal cardiopulmonary resuscitation',
        'ECPR',
        'mechanical circulatory support',
        'cardiac arrest',
        'cardiogenic shock',
        'critical care',
        'emergency medicine',
        'respiratory failure',
        'heart and lung transplantation',
        'clinical trials',
      ],
      collaborationNeeds: [
        'biostatistics',
        'clinical data analysis',
        'cardiology',
        'intra-aortic balloon pump',
        'physiologic modeling',
        'health outcomes research',
      ],
      contactInfo: 'joseph.tonna@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'RESCUE-HCA: ECPR Mortality Prediction and External Validation',
        description:
          'Multi-center study developing and externally validating a mortality prediction score for patients undergoing extracorporeal cardiopulmonary resuscitation (ECPR) during in-hospital cardiac arrest. Aims to improve patient selection and outcomes for this high-acuity rescue therapy.',
        tags: ['ECPR', 'ECMO', 'cardiac arrest', 'mortality prediction', 'clinical trials'],
        neededExpertise: ['biostatistics', 'clinical data analysis', 'health outcomes research'],
        status: 'active',
        userId: tonna.id,
      },
      {
        title: 'VA ECMO Trial: Physiology of Unloading in Cardiogenic Shock',
        description:
          'NIH NHLBI R01 funded multi-center randomized clinical trial to understand the physiologic effects of adding an intra-aortic balloon pump to patients on VA ECMO for cardiogenic shock. PI and site PI for this landmark trial examining mechanical circulatory support strategies.',
        tags: ['ECMO', 'cardiogenic shock', 'intra-aortic balloon pump', 'randomized trial', 'NIH'],
        neededExpertise: ['physiologic modeling', 'cardiology', 'biostatistics'],
        status: 'active',
        userId: tonna.id,
      },
    ],
  });

  // ── 2. Matthew A. Firpo ──────────────────────────────────────────────────
  const firpo = await prisma.user.upsert({
    where: { email: 'matthew.firpo@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Matthew A. Firpo',
      email: 'matthew.firpo@utah.edu',
      password: defaultPassword,
      department: 'Surgery Research Laboratories',
      university: 'University of Utah',
      bio: 'As Director of the Department of Surgery Research Laboratories, I support a diverse portfolio of research endeavors. My cancer research focuses on pancreatic cancer with an emphasis on improving intervention and detection strategies. I have recently developed a machine learning algorithm to screen high-risk groups for earlier detection of pancreatic cancer. A long-term collaboration with researchers at the University of Utah and Tufts University involves developing wound-healing hydrogels for eliciting neovascularization. Another long-term research effort with collaborators in Otolaryngology and Internal Medicine seeks to inform the biology of congenital CMV infection to identify effective intervention strategies to prevent or lessen hearing loss in children.',
      expertiseTags: [
        'pancreatic cancer',
        'gastrointestinal cancers',
        'cancer detection',
        'machine learning for cancer screening',
        'bioengineering',
        'wound healing',
        'hydrogel biomaterials',
        'neovascularization',
        'congenital CMV',
        'hearing loss',
        'molecular biology',
        'biochemistry',
      ],
      collaborationNeeds: [
        'machine learning',
        'clinical oncology',
        'clinical data',
        'otolaryngology',
        'audiology',
        'biomarker discovery',
      ],
      contactInfo: 'matthew.firpo@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'ML Algorithm for Early Detection of Pancreatic Cancer',
        description:
          'Developing and validating a machine learning algorithm to screen high-risk groups for earlier detection of pancreatic cancer using multivariate serum biomarker panels. Earlier detection would lead to significantly improved outcomes in this lethal disease.',
        tags: ['pancreatic cancer', 'machine learning', 'cancer screening', 'biomarkers', 'early detection'],
        neededExpertise: ['machine learning', 'clinical data', 'biomarker discovery'],
        status: 'active',
        userId: firpo.id,
      },
      {
        title: 'Injectable Hydrogel Microparticles for Wound Healing and Neovascularization',
        description:
          'Expanding on successes in wound-healing hydrogels to develop injectable hydrogel-based microparticles that could be deployed in numerous wound healing applications. Long-term collaboration with University of Utah and Tufts University researchers.',
        tags: ['bioengineering', 'wound healing', 'hydrogel', 'neovascularization', 'biomaterials'],
        neededExpertise: ['bioengineering', 'clinical trials', 'materials science'],
        status: 'active',
        userId: firpo.id,
      },
      {
        title: 'Congenital CMV Biology and Hearing Loss Prevention',
        description:
          'Investigating the biology of congenital cytomegalovirus (CMV) infection to identify effective intervention strategies to prevent or lessen hearing loss in children. Interdisciplinary collaboration with Otolaryngology and Internal Medicine.',
        tags: ['congenital CMV', 'hearing loss', 'virology', 'otolaryngology', 'pediatrics'],
        neededExpertise: ['otolaryngology', 'audiology', 'clinical data'],
        status: 'active',
        userId: firpo.id,
      },
    ],
  });

  // ── 3. Christopher R. LaChapelle ─────────────────────────────────────────
  const lachapelle = await prisma.user.upsert({
    where: { email: 'christopher.lachapelle@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Christopher R. LaChapelle',
      email: 'christopher.lachapelle@utah.edu',
      password: defaultPassword,
      department: 'General Surgery',
      university: 'University of Utah',
      bio: 'As an early-career and largely clinically-based surgeon, my research focuses on a broad range of topics within the care and recovery of burn patients. I hope to meld my past career as a physical therapist with my current career as a burn surgeon to help clarify how surgery and rehabilitation can be used to facilitate, expedite and enhance the recovery of burn survivors, and to identify if there are any additive or synergistic relationships between the two approaches.',
      expertiseTags: [
        'burn surgery',
        'burn rehabilitation',
        'general surgery',
        'physical therapy',
        'hand surgery',
        'wound care',
        'pharmacologic management',
        'surgical critical care',
      ],
      collaborationNeeds: [
        'rehabilitation research',
        'outcomes research',
        'health economics',
        'pharmacology',
        'randomized controlled trials',
        'physical therapy research',
      ],
      contactInfo: 'christopher.lachapelle@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Hand Compression Timing and Edema Management After Burns',
        description:
          'Comparing hand compression applied within 48 hours of injury versus postoperatively and the impact on edema, flexibility, strength and dexterity in burn patients. Also examining international practice patterns on management of hand edema in burns.',
        tags: ['burn rehabilitation', 'hand surgery', 'edema management', 'compression therapy', 'outcomes'],
        neededExpertise: ['rehabilitation research', 'outcomes research', 'physical therapy research'],
        status: 'active',
        userId: lachapelle.id,
      },
      {
        title: 'Opioid Use and Oxandrolone in Burn Patient Management',
        description:
          'Evaluating the impact of intraoperative methadone on postoperative opioid use in burn patients, and assessing the role of oxandrolone in lean body mass loss in large burns. Parallel work on economics of burn care and novel procedure reimbursement.',
        tags: ['burn surgery', 'pharmacology', 'opioid management', 'health economics', 'burn care'],
        neededExpertise: ['pharmacology', 'randomized controlled trials', 'health economics'],
        status: 'active',
        userId: lachapelle.id,
      },
    ],
  });

  // ── 4. Marta McCrum ──────────────────────────────────────────────────────
  const mccrum = await prisma.user.upsert({
    where: { email: 'marta.mccrum@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Marta McCrum',
      email: 'marta.mccrum@utah.edu',
      password: defaultPassword,
      department: 'General Surgery',
      university: 'University of Utah',
      bio: 'My research focuses on advancing equity, access, and outcomes in trauma and emergency surgical care. I apply methods from health services research, health policy, and network science to examine how geography, hospital structures, and system design influence surgical outcomes. Recent work has used network analysis to identify how regional surgical networks function and how structural barriers contribute to inequities in access to care. I also lead projects aimed at improving recovery and survivorship for trauma patients in rural communities, addressing unique challenges faced by older adults and vulnerable populations.',
      expertiseTags: [
        'trauma surgery',
        'emergency general surgery',
        'health equity',
        'health services research',
        'network analysis',
        'rural health',
        'surgical outcomes',
        'health policy',
        'palliative care',
        'surgical critical care',
      ],
      collaborationNeeds: [
        'health policy',
        'data science',
        'geospatial analysis',
        'epidemiology',
        'community-based research',
        'qualitative research',
      ],
      contactInfo: 'marta.mccrum@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Structural Barriers to Emergency Surgical Care Access',
        description:
          'Using network analysis and community detection methods to identify how geography, hospital structures, and system design contribute to inequities in access to emergency surgical care. Examines regional surgical networks and hospital selection patterns.',
        tags: ['health equity', 'network analysis', 'emergency surgery', 'access to care', 'health services research'],
        neededExpertise: ['data science', 'geospatial analysis', 'epidemiology'],
        status: 'active',
        userId: mccrum.id,
      },
      {
        title: 'Rural Trauma Survivorship and Recovery in Vulnerable Populations',
        description:
          'Federally funded study aimed at improving recovery and survivorship for trauma patients in rural communities, with a particular focus on older adults. Generates actionable evidence to inform trauma system design and strengthen regionalized networks.',
        tags: ['rural health', 'trauma surgery', 'survivorship', 'aging', 'health disparities'],
        neededExpertise: ['community-based research', 'qualitative research', 'epidemiology'],
        status: 'active',
        userId: mccrum.id,
      },
    ],
  });

  // ── 5. Jill Shea ─────────────────────────────────────────────────────────
  const shea = await prisma.user.upsert({
    where: { email: 'jill.shea@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Jill Shea',
      email: 'jill.shea@utah.edu',
      password: defaultPassword,
      department: 'Bioengineering / Surgery',
      university: 'University of Utah',
      bio: 'My research is dedicated to enhancing surgical outcomes through innovative technologies, with particular emphasis on developing and implementing surgically relevant disease models. A noteworthy collaboration involves developing a bone scaffold that incorporates a new biomaterial with stem cells to promote bone regeneration, as well as integrated antimicrobial properties to prevent infections. I am also engaged in drug delivery research in collaboration with Dr. Courtney Scaife and experts in pharmacology to advance cancer treatments. My cancer care research extends to exploration of MRI-guided focused ultrasound for breast cancer treatment, progressing from the laboratory to clinical trials.',
      expertiseTags: [
        'bone regeneration',
        'synthetic bone grafts',
        'bioengineering',
        'antimicrobial biomaterials',
        'drug delivery',
        'cancer therapeutics',
        'pancreatic cancer',
        'breast cancer',
        'peripheral nerve regeneration',
        'MRI-guided focused ultrasound',
        'wound healing',
        'surgical disease models',
      ],
      collaborationNeeds: [
        'clinical trials',
        'oncology',
        'MRI imaging',
        'craniomaxillofacial surgery',
        'orthopedic surgery',
        'stem cell biology',
      ],
      contactInfo: 'jill.shea@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Antimicrobial Bone Scaffold for Craniofacial and Orthopedic Repair',
        description:
          'Developing a bone scaffold incorporating a new biomaterial with stem cells to promote bone regeneration, plus integrated antimicrobial properties to prevent infections. Especially vital given the complexity and serious health concerns associated with craniomaxillofacial and orthopedic trauma. NIH NRSA-funded.',
        tags: ['bone regeneration', 'antimicrobial', 'biomaterials', 'craniofacial surgery', 'orthopedics'],
        neededExpertise: ['craniomaxillofacial surgery', 'orthopedic surgery', 'stem cell biology'],
        status: 'active',
        userId: shea.id,
      },
      {
        title: 'MRI-Guided Focused Ultrasound for Non-Invasive Breast Cancer Therapy',
        description:
          'Validating and developing an MRI-guided focused ultrasound (HIFU) panel for early detection and non-invasive treatment of breast cancer. Progressing from laboratory validation to sponsored NIH clinical trials with co-investigators Drs. Allison Payne and Cindy Madsen.',
        tags: ['breast cancer', 'MRI', 'focused ultrasound', 'non-invasive treatment', 'clinical trials'],
        neededExpertise: ['MRI imaging', 'clinical trials', 'oncology'],
        status: 'active',
        userId: shea.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 2):');
  console.log('  - Dr. Joseph Tonna          (joseph.tonna@utah.edu)');
  console.log('  - Dr. Matthew A. Firpo      (matthew.firpo@utah.edu)');
  console.log('  - Dr. Christopher LaChapelle (christopher.lachapelle@utah.edu)');
  console.log('  - Dr. Marta McCrum          (marta.mccrum@utah.edu)');
  console.log('  - Dr. Jill Shea             (jill.shea@utah.edu)');
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
