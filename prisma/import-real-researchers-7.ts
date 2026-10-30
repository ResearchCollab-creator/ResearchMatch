import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 7)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Cali Elyse Johnson ────────────────────────────────────────────────
  const johnson = await prisma.user.upsert({
    where: { email: 'cali.johnson@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Cali Elyse Johnson',
      email: 'cali.johnson@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Vascular Surgery',
      university: 'University of Utah',
      bio: 'I am a vascular surgeon, Assistant Professor (Clinical), Co-Director of the Aortic Program, Researcher and Educator. My research focuses on improving outcomes for older and frail patients undergoing vascular surgery, gender differences in surgical training and assessment, and the impact of respiratory viral infections on acute aortic events. I hold a doctoral degree in Organizational Change and combine clinical expertise with education research to improve vascular surgery training and patient outcomes.',
      expertiseTags: [
        'vascular surgery',
        'aortic surgery',
        'frailty in surgery',
        'vascular graft infections',
        'aortic events',
        'endovascular surgery',
        'surgical education',
        'gender differences in surgery',
        'intermittent claudication',
        'patient-reported outcomes',
      ],
      collaborationNeeds: [
        'geriatric medicine',
        'epidemiology',
        'health services research',
        'surgical education research',
        'biostatistics',
        'health informatics',
      ],
      contactInfo: 'cali.johnson@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Frailty and Long-Term Survival in Older Vascular Surgery Patients',
        description:
          'Investigating long-term survival among older adults with frailty undergoing elective vascular surgery procedures. Uses national registry and institutional data to identify preoperative functional performance as the best predictor for loss of independence after major surgery.',
        tags: ['vascular surgery', 'frailty', 'older adults', 'surgical outcomes', 'patient-reported outcomes'],
        neededExpertise: ['geriatric medicine', 'biostatistics', 'health services research'],
        status: 'active',
        userId: johnson.id,
      },
      {
        title: 'Gender Differences in Autonomy and Performance Assessment for Vascular Surgery Trainees',
        description:
          'Examining gender differences in autonomy and performance assessments in a national cohort of vascular surgery trainees. Combines education research with health services methods to identify and address disparities in surgical training environments.',
        tags: ['surgical education', 'gender differences', 'vascular surgery', 'trainee assessment', 'health disparities'],
        neededExpertise: ['surgical education research', 'health informatics', 'epidemiology'],
        status: 'active',
        userId: johnson.id,
      },
    ],
  });

  // ── 2. Christopher O. Audu ───────────────────────────────────────────────
  const audu = await prisma.user.upsert({
    where: { email: 'christopher.audu@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Christopher O. Audu',
      email: 'christopher.audu@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Vascular Surgery',
      university: 'University of Utah',
      bio: 'There is a growing body of epigenetic, chromatin modifying enzymes that have been found to contribute to vascular pathology such as aneurysmal development, vascular inflammation, and diabetic wound healing. Several of these enzymes do not have any concerted drug development efforts towards them, largely because of a lack of structural information. We are interested in studying some of these enzymes, understanding their biophysical properties and immunology, and eventually performing direct-to-biology medicinal chemistry studies to develop new therapeutics targeting these enzymes. The lab will initially focus on two proteins: SETDB2 (a histone methylase) and SIRTUINS (NAD+ dependent histone demethylases).',
      expertiseTags: [
        'vascular inflammation',
        'aneurysmal development',
        'epigenetics',
        'histone demethylases',
        'diabetic wound healing',
        'medicinal chemistry',
        'immunology',
        'chromatin biology',
        'precision medicine',
        'drug development',
      ],
      collaborationNeeds: [
        'structural biology',
        'drug discovery',
        'vascular biology',
        'clinical translation',
        'computational chemistry',
        'diabetology',
      ],
      contactInfo: 'christopher.audu@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'SETDB2 Histone Methylase in Vascular Inflammation and Aneurysmal Disease',
        description:
          'Investigating the role of the histone methyltransferase SETDB2 in vascular inflammation, aneurysmal development, and diabetic wound healing. Macrophage-specific inhibition of the histone demethylase JMJD3 decreases STING and pathologic inflammation in diabetic wound repair, providing a new therapeutic target.',
        tags: ['epigenetics', 'vascular inflammation', 'aneurysm', 'wound healing', 'SETDB2'],
        neededExpertise: ['structural biology', 'vascular biology', 'drug discovery'],
        status: 'active',
        userId: audu.id,
      },
      {
        title: 'Medicinal Chemistry Targeting Histone Demethylases for Vascular Therapeutics',
        description:
          'Performing direct-to-biology medicinal chemistry studies to develop new therapeutics targeting histone demethylases including SIRTUINS. Efforts towards therapeutic development targeting these enzymes will inform precision medicine approaches and provide insight into therapeutically-relevant vascular disease mechanisms.',
        tags: ['medicinal chemistry', 'histone demethylases', 'SIRTUINS', 'precision medicine', 'drug development'],
        neededExpertise: ['computational chemistry', 'clinical translation', 'diabetology'],
        status: 'active',
        userId: audu.id,
      },
    ],
  });

  // ── 3. Benjamin S. Brooke ────────────────────────────────────────────────
  const brooke = await prisma.user.upsert({
    where: { email: 'benjamin.brooke@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Benjamin S. Brooke',
      email: 'benjamin.brooke@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Vascular Surgery',
      university: 'University of Utah',
      bio: 'My research is broadly focused on improving the quality of care delivered to surgery patients by studying variations in clinical practice, identifying processes of care associated with the best outcomes, and developing strategies to implement evidence-based findings into practice. This work encompasses a spectrum of methodologies, such as big-data population analyses, implementation science, bioinformatics, health economics, and qualitative analyses. My research has been continuously funded by extramural grants from PCORI, NIH, the Veterans Administration (VA) Office of Rural Health, VA HSR&D, and the Office of the National Coordinator for Health Information Technology.',
      expertiseTags: [
        'vascular surgery',
        'aortic aneurysm disease',
        'peripheral arterial disease',
        'frailty assessment',
        'health informatics',
        'big data analytics',
        'implementation science',
        'health economics',
        'patient-reported outcomes',
        'opioid stewardship',
      ],
      collaborationNeeds: [
        'biostatistics',
        'health informatics',
        'implementation science',
        'health economics',
        'qualitative research',
        'geriatric medicine',
      ],
      contactInfo: 'benjamin.brooke@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Frailty Assessment and Patient-Reported Outcomes in Vascular Surgery',
        description:
          'Investigating frailty assessment tools and patient-reported outcomes as predictors of surgical outcomes in vascular surgery patients. Uses big-data population analyses and implementation science methods to identify and disseminate best practices in frailty-aware surgical care.',
        tags: ['frailty assessment', 'patient-reported outcomes', 'vascular surgery', 'implementation science', 'big data'],
        neededExpertise: ['geriatric medicine', 'biostatistics', 'implementation science'],
        status: 'active',
        userId: brooke.id,
      },
      {
        title: 'Post-Surgical Opioid Prescribing and Care Coordination in Veterans',
        description:
          'VA HSR&D Merit Award-funded study reducing chronic opioid use among veterans undergoing community care surgery. Uses health informatics and data linkage to examine care coordination during transitions of surgical care and develop interventions to improve post-operative pain management.',
        tags: ['opioid stewardship', 'health informatics', 'veterans health', 'care coordination', 'post-operative care'],
        neededExpertise: ['health economics', 'qualitative research', 'health informatics'],
        status: 'active',
        userId: brooke.id,
      },
    ],
  });

  // ── 4. M. Libby Weaver ───────────────────────────────────────────────────
  const weaver = await prisma.user.upsert({
    where: { email: 'libby.weaver@utah.edu' },
    update: {},
    create: {
      name: 'Dr. M. Libby Weaver',
      email: 'libby.weaver@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Vascular Surgery',
      university: 'University of Utah',
      bio: 'I am an Assistant Professor of Surgery and Associate Program Director for the Vascular Surgery Fellowship. My research focuses on assessment and curriculum development in health professions education, appropriate and high-value care delivery in vascular surgery, and health and workforce disparities. I hold a Master of Health Professions Education (MHPE) and am deeply committed to surgical education research alongside clinical work in vascular surgery including peripheral artery disease, dialysis access, aortic aneurysm disease, and carotid artery disease.',
      expertiseTags: [
        'vascular surgery',
        'surgical education',
        'health professions education',
        'health disparities',
        'workforce disparities',
        'peripheral artery disease',
        'high-value care',
        'diabetic foot wounds',
        'curriculum development',
        'competency-based education',
      ],
      collaborationNeeds: [
        'medical education research',
        'health equity',
        'biostatistics',
        'implementation science',
        'wound care research',
        'qualitative research',
      ],
      contactInfo: 'libby.weaver@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Wearable Insoles for Recurrent Diabetic Ulcer Prevention (WIREDUP)',
        description:
          'NIH/NIDDK-funded study (2025–2030) evaluating wearable insoles for prevention of recurrent diabetic foot ulcers. Co-Investigator on this $806,274 grant led by PI Caitlin Hicks examining novel device-based approaches to reduce the burden of diabetic foot complications.',
        tags: ['diabetic foot wounds', 'wound care', 'peripheral artery disease', 'wearable devices', 'NIH'],
        neededExpertise: ['wound care research', 'biostatistics', 'implementation science'],
        status: 'active',
        userId: weaver.id,
      },
      {
        title: 'Representation of Underrepresented Groups as PIs in Vascular Device Trials',
        description:
          'Investigating the representation of women and racially and ethnically marginalized principal investigators in vascular device trials (published JAMA Surgery 2024). Parallel work on health and workforce disparities and curriculum innovation for surgical trainees.',
        tags: ['health disparities', 'workforce disparities', 'surgical education', 'clinical trials', 'vascular surgery'],
        neededExpertise: ['health equity', 'medical education research', 'qualitative research'],
        status: 'active',
        userId: weaver.id,
      },
    ],
  });

  // ── 5. M. Ben Christensen ─────────────────────────────────────────────────
  const christensen = await prisma.user.upsert({
    where: { email: 'ben.christensen@utah.edu' },
    update: {},
    create: {
      name: 'Dr. M. Ben Christensen',
      email: 'ben.christensen@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Research',
      university: 'University of Utah',
      bio: 'My research focuses on understanding the genetic basis of fibrosing disorders, specifically superficial fibrosing disorders (Peyronie\'s and Dupuytren\'s Diseases) and idiopathic subglottic stenosis. The etiology of these diseases is poorly understood, although data support a hereditary component. My lab is investigating potential genetic contributions to these diseases through whole genome sequencing of affected families and RNA-sequencing of diseased and control tissue. Identification of genetic markers for these diseases will allow for early screening and treatment.',
      expertiseTags: [
        'Peyronie\'s disease',
        'Dupuytren\'s disease',
        'fibrosing disorders',
        'idiopathic subglottic stenosis',
        'whole genome sequencing',
        'RNA sequencing',
        'genetics',
        'tissue biomechanics',
        'neuroprosthetics',
        'erectile dysfunction',
      ],
      collaborationNeeds: [
        'genetics',
        'bioinformatics',
        'otolaryngology',
        'urology',
        'RNA sequencing analysis',
        'clinical genetics',
      ],
      contactInfo: 'ben.christensen@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Genetic Basis of Peyronie\'s and Dupuytren\'s Disease via Whole Genome Sequencing',
        description:
          'Investigating the hereditary component of superficial fibrosing disorders — Peyronie\'s and Dupuytren\'s Diseases — through whole genome sequencing of affected families and RNA-sequencing of diseased and control tissue. Identification of genetic markers will enable early screening and targeted treatment.',
        tags: ['Peyronie\'s disease', 'Dupuytren\'s disease', 'genetics', 'whole genome sequencing', 'fibrosing disorders'],
        neededExpertise: ['genetics', 'bioinformatics', 'RNA sequencing analysis'],
        status: 'active',
        userId: christensen.id,
      },
      {
        title: 'Familial Clustering and Genetic Markers in Idiopathic Subglottic Stenosis',
        description:
          'Studying the familial and genetic underpinnings of idiopathic subglottic stenosis using pedigree data from the Utah Population Database. Extends work on familial associated idiopathic urethral stricture disease and vocal fold fiber development to identify shared fibrosing mechanisms.',
        tags: ['idiopathic subglottic stenosis', 'genetics', 'familial clustering', 'fibrosing disorders', 'otolaryngology'],
        neededExpertise: ['clinical genetics', 'otolaryngology', 'urology'],
        status: 'active',
        userId: christensen.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 7):');
  console.log('  - Dr. Cali Elyse Johnson    (cali.johnson@utah.edu)');
  console.log('  - Dr. Christopher O. Audu   (christopher.audu@utah.edu)');
  console.log('  - Dr. Benjamin S. Brooke    (benjamin.brooke@utah.edu)');
  console.log('  - Dr. M. Libby Weaver       (libby.weaver@utah.edu)');
  console.log('  - Dr. M. Ben Christensen    (ben.christensen@utah.edu)');
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
