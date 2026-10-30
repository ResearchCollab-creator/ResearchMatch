import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 10)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Brock B. O'Neil ───────────────────────────────────────────────────
  const oneil = await prisma.user.upsert({
    where: { email: 'brock.oneil@utah.edu' },
    update: {},
    create: {
      name: "Dr. Brock B. O'Neil",
      email: 'brock.oneil@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Urology (Urologic Oncology)',
      university: 'University of Utah',
      bio: 'My research program is dedicated to improving the value of care in urologic oncology. I integrate health services research, comparative effectiveness methods, and large-scale data analytics to examine how healthcare delivery, payment models, and patient-centered decision-making shape outcomes. Through federal funding, high-impact publications, and national collaborations, my research has informed clinical practice and health policy, advanced methods in cancer care delivery science, and created new opportunities for patients, providers, and health systems to achieve better care. I am Co-Director of the Data Exploration and Learning for Precision Health Intelligence (DELPHI) Center.',
      expertiseTags: [
        'urologic oncology',
        'prostate cancer',
        'bladder cancer',
        'testicular cancer',
        'kidney cancer',
        'health services research',
        'comparative effectiveness',
        'low-value cancer care',
        'rural cancer outcomes',
        'health care delivery',
      ],
      collaborationNeeds: [
        'health policy',
        'data analytics',
        'comparative effectiveness research',
        'biostatistics',
        'patient-reported outcomes',
        'health economics',
      ],
      contactInfo: 'brock.oneil@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Low-Value Cancer Screening and Rural-Urban Disparities in Urologic Oncology',
        description:
          'Investigating the effect of health service area on primary care physician provision of low-value cancer screening and how urban relatives ameliorate survival disparities for genitourinary cancer in rural patients. Uses large-scale data analytics and comparative effectiveness methods to improve value of urologic cancer care.',
        tags: ['low-value care', 'cancer screening', 'rural health', 'urologic oncology', 'health disparities'],
        neededExpertise: ['health policy', 'biostatistics', 'comparative effectiveness research'],
        status: 'active',
        userId: oneil.id,
      },
      {
        title: 'Functional Outcomes and Patient-Reported Outcomes After Prostate Cancer Treatment',
        description:
          'Published landmark study in JAMA (2024) on functional outcomes after localized prostate cancer treatment. Examines the reverberating psychological and cardiovascular impacts of genitourinary cancer diagnosis on first-degree relatives and spouses, informing patient-centered care delivery models.',
        tags: ['prostate cancer', 'patient-reported outcomes', 'functional outcomes', 'cancer care delivery', 'health policy'],
        neededExpertise: ['patient-reported outcomes', 'health economics', 'data analytics'],
        status: 'active',
        userId: oneil.id,
      },
    ],
  });

  // ── 2. Bogdana Schmidt ───────────────────────────────────────────────────
  const schmidt = await prisma.user.upsert({
    where: { email: 'bogdana.schmidt@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Bogdana Schmidt',
      email: 'bogdana.schmidt@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Urology (Urologic Oncology)',
      university: 'University of Utah',
      bio: 'I am a urologic oncologist with a robust and busy practice and my research interests primarily stem from my desire to address patient concerns and issues. We have a proportion of rural patients with testicular cancer, who have specific needs, and this inspired me to establish a Testis Cancer Research Interest group, where we have started to work on projects addressing disparities along the urban-rural continuum, temporal trends in diagnosis, and differences in treatment including the use of robotics in surgical management of testis cancer. Furthermore, I am engaged in research in bladder cancer, evaluating currently available treatments for non-muscle invasive bladder cancer as well as engaging in early phase and late phase clinical trials in this space.',
      expertiseTags: [
        'urologic oncology',
        'bladder cancer',
        'testicular cancer',
        'non-muscle invasive bladder cancer',
        'cancer biomarkers',
        'robotic surgery',
        'rural cancer disparities',
        'cancer clinical trials',
        'antibody-drug conjugates',
        'urethral cancer',
      ],
      collaborationNeeds: [
        'cancer biomarkers',
        'clinical trials',
        'rural health research',
        'health disparities',
        'cancer biology',
        'biostatistics',
      ],
      contactInfo: 'bogdana.schmidt@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Testis Cancer Disparities Along the Urban-Rural Continuum',
        description:
          'Investigating disparities in testicular cancer along the urban-rural continuum, including temporal trends in diagnosis and differences in treatment including the use of robotics in surgical management. Established the Testis Cancer Research Interest group to address these disparities through multi-institutional research.',
        tags: ['testicular cancer', 'rural health', 'cancer disparities', 'urologic oncology', 'robotic surgery'],
        neededExpertise: ['rural health research', 'health disparities', 'biostatistics'],
        status: 'active',
        userId: schmidt.id,
      },
      {
        title: 'Novel Treatments for Non-Muscle Invasive Bladder Cancer: Clinical Trials',
        description:
          'Evaluating currently available and novel treatments for non-muscle invasive bladder cancer (NMIBC), including nadofaragene firadenovec and antibody-drug conjugates. Engaged in early and late phase clinical trials evaluating new treatment strategies for this common urologic malignancy.',
        tags: ['bladder cancer', 'non-muscle invasive bladder cancer', 'clinical trials', 'antibody-drug conjugates', 'cancer biomarkers'],
        neededExpertise: ['clinical trials', 'cancer biology', 'cancer biomarkers'],
        status: 'active',
        userId: schmidt.id,
      },
    ],
  });

  // ── 3. Qi Chen ────────────────────────────────────────────────────────────
  const chen = await prisma.user.upsert({
    where: { email: 'qi.chen@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Qi Chen',
      email: 'qi.chen@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Urology',
      university: 'University of Utah',
      bio: 'Dr. Chen\'s work has updated our idea about the hereditary information carried by sperm, demonstrating that paternally acquired traits from environmental stressors can be "encoded" in the form of sperm RNAs and RNA modifications, which transmit paternal phenotypes to the offspring beyond DNA sequence. His lab pioneered the identification of tRNA-derived and rRNA-derived small RNAs (tsRNAs and rsRNAs), along with their specific RNA modifications, in sperm. This pioneering work introduced the concept of the "sperm RNA code," offering new insights into inheritance mechanisms with translational potential. His development of PANDORA-seq revealed a vast, previously hidden universe of small RNAs, redefining the small RNA landscape and opening new frontiers in reproduction and gene regulation.',
      expertiseTags: [
        'epigenetic inheritance',
        'sperm RNA',
        'RNA modifications',
        'intergenerational transmission',
        'tsRNAs',
        'rsRNAs',
        'PANDORA-seq',
        'male infertility',
        'metabolic disorders',
        'early embryo development',
      ],
      collaborationNeeds: [
        'bioinformatics',
        'RNA biology',
        'epigenetics',
        'reproductive medicine',
        'metabolic disease research',
        'single-cell sequencing',
      ],
      contactInfo: 'qi.chen@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Sperm RNA Code: Epigenetic Inheritance of Paternally Acquired Traits',
        description:
          'Pioneering the identification of tRNA-derived and rRNA-derived small RNAs (tsRNAs and rsRNAs) in sperm and their role as epigenetic information carriers that transmit paternal traits and metabolic disorders to offspring. Dnmt2 mediates intergenerational transmission of paternally acquired metabolic disorders through sperm small non-coding RNAs (Nature Cell Biology).',
        tags: ['epigenetic inheritance', 'sperm RNA', 'tsRNAs', 'intergenerational transmission', 'RNA modifications'],
        neededExpertise: ['RNA biology', 'bioinformatics', 'epigenetics'],
        status: 'active',
        userId: chen.id,
      },
      {
        title: 'PANDORA-seq: Decoding the Full Small RNA Landscape in Reproduction',
        description:
          'Development and application of PANDORA-seq to expand the repertoire of regulatory small RNAs by overcoming RNA modifications. Aims to decode the "sperm RNA code" with advanced tools to develop personalized solutions to prevent obesity and diabetes, addressing chronic diseases transmitted across generations.',
        tags: ['PANDORA-seq', 'small RNA', 'RNA sequencing', 'infertility biomarkers', 'metabolic disease'],
        neededExpertise: ['single-cell sequencing', 'metabolic disease research', 'reproductive medicine'],
        status: 'active',
        userId: chen.id,
      },
    ],
  });

  // ── 4. Jessica Liu McMullin ──────────────────────────────────────────────
  const mcmullin = await prisma.user.upsert({
    where: { email: 'jessica.mcmullin@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Jessica Liu McMullin',
      email: 'jessica.mcmullin@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Endocrine Surgery',
      university: 'University of Utah',
      bio: 'My research is broadly focused on improving the care for patients with endocrine surgery diseases. In particular, an area of focus for me is in incidental adrenal lesions and improving the guideline concordant care we provide to patients with incidentalomas. My work entails performing decision analysis and cost effectiveness analysis to determine the utility of improved screening for adrenal lesions, and then implementing quality and process improvement protocols to increase the rate of appropriate care for patients with incidental adrenal lesions. Another area of focus is in the influence of environmental toxins on the development of thyroid nodules and cancer.',
      expertiseTags: [
        'endocrine surgery',
        'thyroid cancer',
        'adrenal disease',
        'parathyroid surgery',
        'incidentalomas',
        'Graves\' disease',
        'cost-effectiveness analysis',
        'decision analysis',
        'quality improvement',
        'environmental toxins',
      ],
      collaborationNeeds: [
        'health economics',
        'environmental health',
        'decision analysis',
        'implementation science',
        'quality improvement',
        'epidemiology',
      ],
      contactInfo: 'jessica.mcmullin@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Cost-Effectiveness of Adrenal Incidentaloma Screening and Management',
        description:
          'Performing decision analysis and cost effectiveness analysis to determine the utility of improved screening for adrenal lesions, and implementing quality and process improvement protocols to increase guideline-concordant care for incidentalomas. ACS Institutional Research Grant-funded study on environmental toxins and thyroid cancer.',
        tags: ['adrenal disease', 'incidentaloma', 'cost-effectiveness', 'endocrine surgery', 'quality improvement'],
        neededExpertise: ['health economics', 'decision analysis', 'implementation science'],
        status: 'active',
        userId: mcmullin.id,
      },
      {
        title: 'Environmental Toxins and Thyroid Nodule/Cancer Development',
        description:
          'Investigating the influence of environmental toxins on the development of thyroid nodules and cancer. ACS-funded principal investigator study examining the association between environmental exposures and thyroid cancer incidence, including incidental thyroid cancer in patients with Graves\' disease.',
        tags: ['thyroid cancer', 'environmental health', 'endocrine surgery', 'cancer epidemiology', 'thyroid nodules'],
        neededExpertise: ['environmental health', 'epidemiology', 'quality improvement'],
        status: 'active',
        userId: mcmullin.id,
      },
    ],
  });

  // ── 5. Lyen C. Huang ─────────────────────────────────────────────────────
  const huang = await prisma.user.upsert({
    where: { email: 'lyen.huang@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Lyen C. Huang',
      email: 'lyen.huang@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Colorectal Surgery',
      university: 'University of Utah',
      bio: 'My research focuses on perioperative opioid stewardship with the goal of reducing the iatrogenic harms of prescription opioids after surgery. Every year in the US, 42 million surgery patients are prescribed opioids for post-discharge pain management, and 60-92% will have leftover opioids. My research group established the first health system-wide prescription opioid disposal intervention. We also developed and tested patient-centered prescribing protocols which reduce or eliminate opioid prescribing for most patients. In 2024, I was awarded a National Institute on Drug Abuse (NIDA) K23 on "Behavior Change Components to Enhance Opioid Disposal After Surgery."',
      expertiseTags: [
        'opioid stewardship',
        'colorectal surgery',
        'perioperative care',
        'opioid prescribing',
        'cancer survivorship',
        'rural cancer care',
        'health system interventions',
        'patient-centered prescribing',
        'colorectal cancer screening',
        'global surgery',
      ],
      collaborationNeeds: [
        'behavioral science',
        'health policy',
        'implementation science',
        'health economics',
        'global health',
        'clinical trials',
      ],
      contactInfo: 'lyen.huang@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'NIDA K23: Behavior Change Components for Opioid Disposal After Surgery',
        description:
          'NIDA K23-funded study developing and evaluating behavior change components to enhance opioid disposal after surgery. Builds on prior work establishing a health system-wide opioid disposal intervention and developing patient-centered prescribing protocols that reduce opioid prescribing for surgical patients.',
        tags: ['opioid stewardship', 'behavioral science', 'surgical prescribing', 'substance use disorder', 'health system'],
        neededExpertise: ['behavioral science', 'implementation science', 'clinical trials'],
        status: 'active',
        userId: huang.id,
      },
      {
        title: 'Colorectal Cancer Care Access in Rural and Global Settings',
        description:
          'Improving access and quality of colorectal cancer screening and surgery in rural/frontier communities and in Ghana (Dartmouth-Hitchcock visiting professor collaboration). CTSI KL2 Scholar project examining naloxone co-prescriptions for surgery patients and assessing colorectal care capacity at an urban tertiary hospital in Ghana.',
        tags: ['colorectal cancer', 'rural health', 'global surgery', 'cancer screening', 'health access'],
        neededExpertise: ['global health', 'health policy', 'health economics'],
        status: 'active',
        userId: huang.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 10):');
  console.log("  - Dr. Brock B. O'Neil       (brock.oneil@utah.edu)");
  console.log('  - Dr. Bogdana Schmidt        (bogdana.schmidt@utah.edu)');
  console.log('  - Dr. Qi Chen               (qi.chen@utah.edu)');
  console.log('  - Dr. Jessica Liu McMullin  (jessica.mcmullin@utah.edu)');
  console.log('  - Dr. Lyen C. Huang         (lyen.huang@utah.edu)');
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
