import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 8)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Michael A. Zimmerman ──────────────────────────────────────────────
  const zimmerman = await prisma.user.upsert({
    where: { email: 'michael.zimmerman@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Michael A. Zimmerman',
      email: 'michael.zimmerman@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Transplant Surgery',
      university: 'University of Utah',
      bio: 'Orthotopic liver transplantation (OLT) is the definitive treatment for patients suffering from end-stage liver disease. Unfortunately, a severe organ shortage has led to a robust initiative exploring the utilization of marginal organs to meet the increasing demand. Hepatic ischemia and reperfusion injury (IRI) in the setting of OLT directly induces severe mitochondrial injury and hepatocellular death, leading to organ dysfunction and potential failure. I believe that employing resuscitation strategies will mitigate IRI and positively impact mitochondrial injury by enhancing the body\'s normal adaptive responses, ultimately improving organ function in liver transplantation and expanding the usability of marginal organs.',
      expertiseTags: [
        'liver transplantation',
        'kidney transplantation',
        'pancreas transplantation',
        'ischemia-reperfusion injury',
        'mitochondrial biology',
        'organ preservation',
        'marginal organs',
        'transplant surgery',
        'hepatocellular biology',
        'critical care',
      ],
      collaborationNeeds: [
        'mitochondrial biology',
        'organ preservation technology',
        'hepatology',
        'nephrology',
        'translational research',
        'bioengineering',
      ],
      contactInfo: 'michael.zimmerman@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Mitochondrial Bioenergetics in Liver Ischemia-Reperfusion Injury',
        description:
          'Investigating mitochondrial bioenergetics and protective strategies to preserve and/or restore mitochondrial viability during hepatic ischemia-reperfusion injury in the setting of liver transplantation. Goal is to expand the usability of marginal organs and improve transplant outcomes.',
        tags: ['liver transplantation', 'ischemia-reperfusion injury', 'mitochondrial biology', 'organ preservation', 'transplant surgery'],
        neededExpertise: ['mitochondrial biology', 'hepatology', 'translational research'],
        status: 'active',
        userId: zimmerman.id,
      },
      {
        title: 'Marginal Organ Utilization Strategies in Liver and Kidney Transplantation',
        description:
          'Developing and evaluating resuscitation strategies to improve the utilization of marginal livers and kidneys, including normothermic regional perfusion and machine perfusion techniques. Aims to reduce the ~3,000 marginal livers discarded annually in the United States.',
        tags: ['marginal organs', 'organ preservation', 'kidney transplantation', 'liver transplantation', 'normothermic perfusion'],
        neededExpertise: ['organ preservation technology', 'nephrology', 'bioengineering'],
        status: 'active',
        userId: zimmerman.id,
      },
    ],
  });

  // ── 2. Motaz Selim ───────────────────────────────────────────────────────
  const selim = await prisma.user.upsert({
    where: { email: 'motaz.selim@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Motaz Selim',
      email: 'motaz.selim@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Transplant Surgery',
      university: 'University of Utah',
      bio: 'My academic and clinical mission centers on advancing outcomes in abdominal organ transplantation and refining surgical education for future transplant surgeons. My research interests include optimizing donor utilization and organ preservation as well as improving transplant recipient outcomes through optimizing perioperative management and critical care strategies to enhance graft function and patient survival. I lead initiatives that integrate clinical innovation with education, directing the Abdominal Transplant Surgery Fellowship and overseeing core clinical content for medical students.',
      expertiseTags: [
        'abdominal organ transplantation',
        'kidney transplantation',
        'liver transplantation',
        'organ preservation',
        'machine perfusion',
        'normothermic regional perfusion',
        'ischemia-reperfusion injury',
        'donation after circulatory death',
        'transplant surgery education',
        'perioperative management',
      ],
      collaborationNeeds: [
        'organ preservation technology',
        'critical care medicine',
        'transplant immunology',
        'medical education',
        'biostatistics',
        'machine perfusion technology',
      ],
      contactInfo: 'motaz.selim@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Normothermic Regional Perfusion for Kidney Transplantation from DCD Donors',
        description:
          'Evaluating early outcomes of abdominal normothermic regional perfusion (NRP) kidney transplants compared to brain dead donor kidneys despite higher Kidney Donor Risk Index. Studies optimization of Donation after Circulatory Death (DCD) and normothermic regional perfusion protocols.',
        tags: ['kidney transplantation', 'normothermic regional perfusion', 'DCD donors', 'organ preservation', 'transplant outcomes'],
        neededExpertise: ['machine perfusion technology', 'organ preservation technology', 'biostatistics'],
        status: 'active',
        userId: selim.id,
      },
      {
        title: 'Ischemia-Reperfusion Injury and Mitochondrial Dysfunction in Transplantation',
        description:
          'Investigating ischemia-reperfusion injury and mitochondrial dysfunction in liver and kidney transplantation to improve graft function and recipient outcomes. Includes optimization of donor-recipient matching for marginal organs and perioperative critical care strategies.',
        tags: ['ischemia-reperfusion injury', 'mitochondrial dysfunction', 'liver transplantation', 'kidney transplantation', 'critical care'],
        neededExpertise: ['transplant immunology', 'critical care medicine', 'translational research'],
        status: 'active',
        userId: selim.id,
      },
    ],
  });

  // ── 3. Marshall S. Baker ─────────────────────────────────────────────────
  const baker = await prisma.user.upsert({
    where: { email: 'marshall.baker@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Marshall S. Baker',
      email: 'marshall.baker@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Hepatopancreaticobiliary Surgery',
      university: 'University of Utah',
      bio: 'My research has been primarily focused on the application of advanced data analytics to large national registries to study the ways that practice variation affects clinical outcomes for patients with pancreaticobiliary and liver cancer. The sizes of these data sources act to mitigate the effects of bias and facilitate definition of best practice. Results have demonstrated that patients with pancreaticobiliary malignancy are best treated with systemic therapy prior to surgery, identified significant clinical benefit to minimally invasive approaches to resection, and identified correctable socioeconomic disparities in access to quality care. More recently, I have developed an interest in using patient derived xenografts (mouse models of an individual tumor) to personalize therapeutic regimens in pancreatic and liver cancer.',
      expertiseTags: [
        'pancreatic cancer',
        'liver cancer',
        'hepatopancreaticobiliary surgery',
        'esophageal cancer',
        'comparative effectiveness research',
        'patient derived xenografts',
        'minimally invasive surgery',
        'cancer care disparities',
        'surgical simulation',
        'national registry analysis',
      ],
      collaborationNeeds: [
        'data science',
        'cancer genomics',
        'health disparities research',
        'preclinical oncology',
        'biostatistics',
        'medical education',
      ],
      contactInfo: 'marshall.baker@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Practice Variation and Outcomes in Pancreaticobiliary and Liver Cancer',
        description:
          'Applying advanced data analytics to large national registries to study how practice variation affects outcomes in pancreatic cancer, liver cancer, and esophageal cancer. Has demonstrated that neoadjuvant systemic therapy and minimally invasive approaches improve survival and identified socioeconomic disparities in access to quality care.',
        tags: ['pancreatic cancer', 'liver cancer', 'comparative effectiveness', 'cancer disparities', 'national registry'],
        neededExpertise: ['data science', 'biostatistics', 'health disparities research'],
        status: 'active',
        userId: baker.id,
      },
      {
        title: 'Patient-Derived Xenografts as Avatars for Personalizing Cancer Therapy',
        description:
          'Using tissue-derived xenografts (mouse models of individual tumors) to personalize therapeutic regimens used in pancreatic and intrahepatic cholangiocarcinoma. Huntsman Cancer Center pilot grant-funded project exploring precision oncology approaches for GI malignancies.',
        tags: ['patient derived xenografts', 'pancreatic cancer', 'cholangiocarcinoma', 'precision oncology', 'translational research'],
        neededExpertise: ['preclinical oncology', 'cancer genomics', 'translational research'],
        status: 'active',
        userId: baker.id,
      },
    ],
  });

  // ── 4. Erin P. Ward ──────────────────────────────────────────────────────
  const ward = await prisma.user.upsert({
    where: { email: 'erin.ward@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Erin P. Ward',
      email: 'erin.ward@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Surgical Oncology',
      university: 'University of Utah',
      bio: 'My research has two main themes. I am working on using modern next-generation sequencing and circulating tumor DNA to better categorize, prognosticate and treat patients with appendiceal tumors. My other projects focus on both defining the impact of psychosocial health on surgical and cancer-specific outcomes for patients with gastrointestinal cancer as well as developing and testing novel interventions to address the known psychosocial distress associated with gastrointestinal cancer surgery. I am collaborating with the Wellness Center to integrate and measure how mindfulness and journaling may impact recovery from complex cancer surgeries, and am PI on multiple clinical trials focused on cancer treatment and symptom optimization.',
      expertiseTags: [
        'appendiceal tumors',
        'cytoreductive surgery',
        'HIPEC',
        'peritoneal surface malignancies',
        'circulating tumor DNA',
        'next-generation sequencing',
        'gastric cancer',
        'neuroendocrine tumors',
        'psychosocial oncology',
        'mindfulness in cancer care',
      ],
      collaborationNeeds: [
        'genomics',
        'circulating tumor DNA analysis',
        'psycho-oncology',
        'health psychology',
        'clinical trials',
        'bioinformatics',
      ],
      contactInfo: 'erin.ward@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Next-Generation Sequencing and ctDNA for Appendiceal Tumor Characterization',
        description:
          'Using modern next-generation sequencing and circulating tumor DNA (ctDNA) to better categorize, prognosticate, and treat patients with appendiceal tumors. GI Disease Center-funded study exploring whether NGS explains significant variation in outcomes for patients with pseudomyxoma peritonei from appendiceal mucinous neoplasms.',
        tags: ['appendiceal tumors', 'circulating tumor DNA', 'next-generation sequencing', 'peritoneal malignancies', 'cancer genomics'],
        neededExpertise: ['genomics', 'circulating tumor DNA analysis', 'bioinformatics'],
        status: 'active',
        userId: ward.id,
      },
      {
        title: 'Psychosocial Health and Mindfulness Interventions in Gastrointestinal Cancer Surgery',
        description:
          'Defining the impact of psychosocial health on surgical and cancer-specific outcomes for patients with GI cancer, and developing mindfulness and journaling interventions to address psychosocial distress. Ascender Grant-funded study on mental health conditions and cost of care for gastric cancer patients.',
        tags: ['psychosocial oncology', 'mindfulness', 'gastrointestinal cancer', 'patient outcomes', 'cancer care'],
        neededExpertise: ['psycho-oncology', 'health psychology', 'clinical trials'],
        status: 'active',
        userId: ward.id,
      },
    ],
  });

  // ── 5. Matthew VanBrocklin ───────────────────────────────────────────────
  const vanbrocklin = await prisma.user.upsert({
    where: { email: 'matthew.vanbrocklin@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Matthew VanBrocklin',
      email: 'matthew.vanbrocklin@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Huntsman Cancer Institute',
      university: 'University of Utah',
      bio: 'The primary focus of my research lab lies in developing immunotherapies for advancing more effective cancer treatment agents and strategies. To this end, we have developed novel oncolytic viruses that preferentially replicate in cancer and human papillomavirus (HPV) infected cells, culminating in host directed immune engagement, activation and eradication of lesions. In collaboration with a startup biotechnology joint venture, THERALYTICS, we are working toward an IND application to enable clinical evaluation in a number of diseases. I am a co-founder and Chief Scientific Officer of THERALYTICS INC and Director of the Immuno-Oncology Network at Huntsman Cancer Institute.',
      expertiseTags: [
        'oncolytic viruses',
        'immunotherapy',
        'melanoma',
        'HPV-related cancers',
        'tumor immunology',
        'cancer immunotherapy',
        'cutaneous squamous cell carcinoma',
        'immuno-oncology',
        'tumor microenvironment',
        'translational oncology',
      ],
      collaborationNeeds: [
        'clinical oncology',
        'virology',
        'tumor immunology',
        'clinical trials',
        'IND application',
        'biotech translation',
      ],
      contactInfo: 'matthew.vanbrocklin@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Oncolytic Human Rhinoviruses for Melanoma and HPV-Related Cancers',
        description:
          'Developing novel oncolytic viruses (Human Rhinoviruses) that preferentially replicate in cancer and HPV-infected cells, culminating in host-directed immune engagement, activation, and eradication. Working with THERALYTICS toward an IND application to enable clinical evaluation in melanoma and cutaneous squamous cell carcinoma.',
        tags: ['oncolytic viruses', 'melanoma', 'HPV cancers', 'immunotherapy', 'clinical translation'],
        neededExpertise: ['virology', 'clinical oncology', 'IND application'],
        status: 'active',
        userId: vanbrocklin.id,
      },
      {
        title: 'Overcoming Immunosuppressive Tumor Microenvironment in cSCC',
        description:
          'HCI-CRR funded project using oncolytic viruses to overcome immunosuppressive tumor microenvironment in cutaneous squamous cell carcinoma (cSCC). Parallel HCI-TSI award-funded project training macrophages to kill melanoma cells, targeting innate immune mechanisms in solid tumors.',
        tags: ['tumor microenvironment', 'cutaneous squamous cell carcinoma', 'melanoma', 'macrophages', 'immuno-oncology'],
        neededExpertise: ['tumor immunology', 'clinical trials', 'biotech translation'],
        status: 'active',
        userId: vanbrocklin.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 8):');
  console.log('  - Dr. Michael A. Zimmerman  (michael.zimmerman@utah.edu)');
  console.log('  - Dr. Motaz Selim           (motaz.selim@utah.edu)');
  console.log('  - Dr. Marshall S. Baker     (marshall.baker@utah.edu)');
  console.log('  - Dr. Erin P. Ward          (erin.ward@utah.edu)');
  console.log('  - Dr. Matthew VanBrocklin   (matthew.vanbrocklin@utah.edu)');
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
