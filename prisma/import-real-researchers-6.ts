import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 6)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Courtney Scaife ───────────────────────────────────────────────────
  const scaife = await prisma.user.upsert({
    where: { email: 'courtney.scaife@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Courtney Scaife',
      email: 'courtney.scaife@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Surgical Oncology',
      university: 'University of Utah',
      bio: 'My research concentrates on translational research utilizing pancreas and other GI cancer murine, xenograft, and organoid models; studies of mechanisms of metastases and early diagnosis, as well as clinical quality outcomes, patient clinical outcomes and access to care research. I have participated in study design, surgical technique, and data analysis in several pharmacologic treatment studies utilizing our murine pancreatic adenocarcinoma models. Additionally, I focus on disparities and socioeconomic barriers to surgical oncology care to improve access and equity in cancer treatment.',
      expertiseTags: [
        'pancreatic cancer',
        'GI cancer',
        'tumor organoid models',
        'murine cancer models',
        'surgical oncology',
        'neuroendocrine tumors',
        'translational research',
        'cancer disparities',
        'gallbladder cancer',
        'esophageal cancer',
        'biliary surgery',
      ],
      collaborationNeeds: [
        'molecular biology',
        'bioinformatics',
        'health disparities research',
        'clinical trials',
        'cancer genomics',
        'health economics',
      ],
      contactInfo: 'courtney.scaife@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Tumor Organoid Models and Markers for Pancreatic Cancer Diagnosis',
        description:
          'Developing and utilizing pancreas cancer murine, xenograft, and organoid models to study mechanisms of metastases, early diagnosis biomarkers, and pharmacologic treatment strategies. Co-PI on Huntsman GI Disease Center NET Organoid model grant with Dr. Jill Shea.',
        tags: ['pancreatic cancer', 'tumor organoids', 'cancer biomarkers', 'translational research', 'murine models'],
        neededExpertise: ['molecular biology', 'cancer genomics', 'bioinformatics'],
        status: 'active',
        userId: scaife.id,
      },
      {
        title: 'Disparities and Socioeconomic Barriers to Surgical Oncology Care',
        description:
          'Investigating quality, cost-effectiveness, and socioeconomic barriers to surgical oncology care. Research examines pre-operative biomarkers that may predict nodal status in pancreatic ductal adenocarcinoma and structural disparities that limit access to cancer care.',
        tags: ['cancer disparities', 'surgical oncology', 'health equity', 'cost-effectiveness', 'access to care'],
        neededExpertise: ['health disparities research', 'health economics', 'clinical trials'],
        status: 'active',
        userId: scaife.id,
      },
    ],
  });

  // ── 2. Fiemu Nwariaku ────────────────────────────────────────────────────
  const nwariaku = await prisma.user.upsert({
    where: { email: 'fiemu.nwariaku@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Fiemu Nwariaku',
      email: 'fiemu.nwariaku@utah.edu',
      password: defaultPassword,
      department: 'Surgery',
      university: 'University of Utah',
      bio: 'My primary research interests focus on endocrine tumors of the thyroid, parathyroid, and adrenal glands, as well as pancreatic neuroendocrine tumors. Our group is particularly interested in thyroid cancer and adrenal tumors. Using genomic and molecular approaches, we plan to determine how genetic mutations influence the behavior of endocrine tumors, including recurrence and metastases. We believe that this knowledge will better guide the treatment options for patients with endocrine tumors. Additionally, our global health group is interested in global inequities in trauma and cancer care. We leverage technology such as mobile devices and geospatial information to guide resource allocation for trauma and cancer challenges specifically in Asia and parts of sub-Saharan Africa.',
      expertiseTags: [
        'endocrine surgery',
        'thyroid cancer',
        'adrenal tumors',
        'parathyroid tumors',
        'pancreatic neuroendocrine tumors',
        'hormone-driven cancers',
        'genomics',
        'global health',
        'minimally invasive robotic surgery',
        'mobile technology for health',
      ],
      collaborationNeeds: [
        'genomics',
        'molecular biology',
        'global health',
        'mobile technology',
        'geospatial analysis',
        'cancer genetics',
      ],
      contactInfo: 'fiemu.nwariaku@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Genomic Determinants of Endocrine Tumor Behavior and Recurrence',
        description:
          'Using genomic and molecular approaches to determine how genetic mutations influence the behavior of thyroid cancer and adrenal tumors, including recurrence and metastases. Aims to develop better treatment options guided by molecular profiling of endocrine tumors.',
        tags: ['thyroid cancer', 'adrenal tumors', 'genomics', 'endocrine tumors', 'cancer genetics'],
        neededExpertise: ['genomics', 'molecular biology', 'cancer genetics'],
        status: 'active',
        userId: nwariaku.id,
      },
      {
        title: 'Mobile Technology to Reduce Road Traffic Deaths in West Africa',
        description:
          'Leveraging mobile devices and geospatial information to guide resource allocation and reduce road traffic injury occurrences and deaths in West Africa, particularly Nigeria. Uses parallel geocoding and data analysis to address global trauma care inequities.',
        tags: ['global health', 'mobile technology', 'trauma', 'West Africa', 'geospatial analysis'],
        neededExpertise: ['mobile technology', 'geospatial analysis', 'global health'],
        status: 'active',
        userId: nwariaku.id,
      },
    ],
  });

  // ── 3. Cindy Brown Matsen ────────────────────────────────────────────────
  const matsen = await prisma.user.upsert({
    where: { email: 'cindy.matsen@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Cindy Brown Matsen',
      email: 'cindy.matsen@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Surgical Oncology',
      university: 'University of Utah',
      bio: 'Breast cancer surgery is a perfect context for studying how to make good decisions when faced with a complex disease that has many different treatment options. My work focuses on the most fundamental aspect of cancer care delivery, the doctor-patient relationship, and has impacts on both parties. By helping providers understand each individual patient\'s values, preferences, and goals, my work has improved the way we communicate with patients to make the best treatment decisions possible. By expanding the evidence that patients and providers have individual preferences for how they want to engage in the decision-making process, I have helped providers acquire communication skills that help them honor these preferences. This impacts how patients evaluate their cancer care experience and their treatment decisions.',
      expertiseTags: [
        'breast cancer surgery',
        'surgical oncology',
        'patient-provider communication',
        'shared decision making',
        'patient education',
        'cancer care delivery',
        'patient experience',
        'cost communication',
        'decision role preferences',
        'multidisciplinary care',
      ],
      collaborationNeeds: [
        'communication research',
        'health psychology',
        'behavioral science',
        'health economics',
        'patient experience research',
        'implementation science',
      ],
      contactInfo: 'cindy.matsen@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Shared Decision Making and Patient Preferences in Breast Cancer Surgery',
        description:
          'Investigating how patients and providers have individual preferences for engaging in the decision-making process and developing communication skills that honor these preferences. Research examines decision role preferences and choice of surgery, including contralateral prophylactic mastectomy, and surgeon variability in recommendations.',
        tags: ['breast cancer', 'shared decision making', 'patient preferences', 'surgical oncology', 'communication'],
        neededExpertise: ['communication research', 'health psychology', 'behavioral science'],
        status: 'active',
        userId: matsen.id,
      },
      {
        title: 'Cost Communication and Patient Experience in Cancer Care Delivery',
        description:
          'Examining how cost communication impacts patient evaluation of their cancer care experience and treatment decisions. Explores how improving provider communication skills leads to better patient-centered outcomes in the breast cancer care delivery setting.',
        tags: ['cancer care delivery', 'cost communication', 'patient experience', 'breast cancer', 'health economics'],
        neededExpertise: ['health economics', 'patient experience research', 'implementation science'],
        status: 'active',
        userId: matsen.id,
      },
    ],
  });

  // ── 4. Sheri Holmen ──────────────────────────────────────────────────────
  const holmen = await prisma.user.upsert({
    where: { email: 'sheri.holmen@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Sheri Holmen',
      email: 'sheri.holmen@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Basic and Translational Research',
      university: 'University of Utah',
      bio: 'Primary and metastatic brain tumors are often associated with an unfavorable prognosis and are difficult to treat clinically. Our research program is dedicated to elucidating the molecular mechanisms underpinning these malignancies, with the goal of uncovering vulnerabilities amenable to targeted therapeutic intervention. We have developed innovative preclinical models that not only confirm the oncogenic roles of specific genes in tumor initiation but also evaluate their necessity for tumor progression and maintenance. In gliomas, high-throughput sequencing identified IDH as a definitive oncogene and promising therapeutic target, paving the way for FDA approval of vorasidenib in August 2024 for IDH-mutant gliomas. In melanoma, our investigations revealed pronounced AKT activation in brain metastases mediated through focal adhesion kinase (FAK), which has spurred the launch of a Phase 1b/2 clinical trial (NCT06194929).',
      expertiseTags: [
        'melanoma',
        'brain tumors',
        'glioma',
        'IDH mutation',
        'cancer cell signaling',
        'targeted therapy',
        'tumor microenvironment',
        'mouse models',
        'AKT signaling',
        'FAK signaling',
        'RAF/MEK inhibition',
        'translational oncology',
      ],
      collaborationNeeds: [
        'clinical oncology',
        'neurosurgery',
        'immunotherapy',
        'clinical trial design',
        'bioinformatics',
        'cancer genomics',
      ],
      contactInfo: 'sheri.holmen@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'IDH as Oncogene in Gliomas: From Discovery to FDA-Approved Therapy',
        description:
          'High-throughput sequencing identified IDH as a definitive oncogene and promising therapeutic target in gliomas. This discovery paved the way for FDA approval of vorasidenib in August 2024 for IDH-mutant gliomas. Ongoing investigations use preclinical mouse models to further characterize IDH-driven tumor biology and identify combination therapy strategies.',
        tags: ['glioma', 'IDH mutation', 'targeted therapy', 'brain tumors', 'translational oncology'],
        neededExpertise: ['clinical trial design', 'neurosurgery', 'bioinformatics'],
        status: 'active',
        userId: holmen.id,
      },
      {
        title: 'FAK/RAF/MEK Inhibition in Melanoma Brain Metastases (Phase 1b/2 Trial)',
        description:
          'Preclinical studies demonstrated that AKT-driven brain metastasis in melanoma is mediated through focal adhesion kinase (FAK). Combined inhibition of FAK and RAF/MEK with avutometinib elicited tumor regression, curtailed lung and brain metastases, and markedly prolonged survival. Findings spurred a Phase 1b/2 clinical trial (NCT06194929) evaluating defactinib and avutometinib.',
        tags: ['melanoma', 'brain metastases', 'FAK inhibition', 'RAF/MEK', 'clinical trial', 'targeted therapy'],
        neededExpertise: ['clinical oncology', 'immunotherapy', 'cancer genomics'],
        status: 'active',
        userId: holmen.id,
      },
    ],
  });

  // ── 5. Kirstyn Brownson ──────────────────────────────────────────────────
  const brownson = await prisma.user.upsert({
    where: { email: 'kirstyn.brownson@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Kirstyn Brownson',
      email: 'kirstyn.brownson@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Breast Surgery',
      university: 'University of Utah',
      bio: 'I am a fellowship-trained surgical breast oncologist passionate about providing breast cancer patients with the best evidence-based, patient-focused care via a team-based approach. My research centers around tailoring care for patients with ductal carcinoma in-situ, deciphering the extent of disease in patients with lobular carcinoma of the breast, and early detection of lymphedema. My interest in improving cancer care for underserved populations led to a partnership with the Center for Global Surgery, where I study breast cancer outcomes in low and middle-income countries. As Clerkship Director for the 3rd year School of Medicine Surgery Clerkship, I study how feedback, workplace environment, and interaction with an interprofessional team impact the education of surgical learners.',
      expertiseTags: [
        'breast cancer surgery',
        'DCIS',
        'lobular carcinoma',
        'lymphedema',
        'oncoplastic surgery',
        'surgical education',
        'global surgery',
        'interprofessional education',
        'patient experience',
        'quality improvement',
      ],
      collaborationNeeds: [
        'global surgery',
        'lymphedema research',
        'medical education research',
        'interprofessional education',
        'implementation science',
        'low and middle income country health',
      ],
      contactInfo: 'kirstyn.brownson@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Breast Cancer Outcomes in Low and Middle-Income Countries (Global Surgery)',
        description:
          'Partnership with the Center for Global Surgery to study breast cancer outcomes in low and middle-income countries. Aims to improve access to evidence-based cancer care for underserved populations globally, with current fieldwork in Mongolia and Ghana.',
        tags: ['global surgery', 'breast cancer', 'health disparities', 'low-income countries', 'surgical oncology'],
        neededExpertise: ['global surgery', 'low and middle income country health', 'implementation science'],
        status: 'active',
        userId: brownson.id,
      },
      {
        title: 'Lymphedema Early Detection and DCIS Extent in Breast Cancer Patients',
        description:
          'Investigating early detection of lymphedema and deciphering the extent of disease in patients with lobular carcinoma and ductal carcinoma in-situ (DCIS). Also studying patient-derived xenograft engraftment to predict survival in newly diagnosed triple-negative breast cancer (TOWARDS study).',
        tags: ['lymphedema', 'DCIS', 'lobular carcinoma', 'breast cancer', 'triple-negative breast cancer'],
        neededExpertise: ['lymphedema research', 'medical education research', 'interprofessional education'],
        status: 'active',
        userId: brownson.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 6):');
  console.log('  - Dr. Courtney Scaife      (courtney.scaife@utah.edu)');
  console.log('  - Dr. Fiemu Nwariaku       (fiemu.nwariaku@utah.edu)');
  console.log('  - Dr. Cindy Brown Matsen   (cindy.matsen@utah.edu)');
  console.log('  - Dr. Sheri Holmen         (sheri.holmen@utah.edu)');
  console.log('  - Dr. Kirstyn Brownson     (kirstyn.brownson@utah.edu)');
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
