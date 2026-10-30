import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing researcher profiles (batch 4)...');

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // ── 1. Thomas K. Varghese Jr. ────────────────────────────────────────────
  const varghese = await prisma.user.upsert({
    where: { email: 'thomas.varghese@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Thomas K. Varghese Jr.',
      email: 'thomas.varghese@utah.edu',
      password: defaultPassword,
      department: 'Surgery / General Thoracic Surgery',
      university: 'University of Utah',
      bio: "Dr. Varghese's research bridges the world of Education Research, Health Services Research, Clinical Trials and Cancer Care Delivery specifically in the area of optimizing performance at the patient, surgeon, and system levels. He is the Director of HCI-IMPACT Center and helped create the American College of Surgeons (ACS) Strong for Surgery program. He is a PI on a National Cancer Institute R01-funded clinical trial on the role of Precision Exercise Prescription (PEP) for elective lung cancer surgical resection. Dr. Varghese serves in several leadership positions including the American College of Surgeons, Society of Thoracic Surgeons, and NCCN, and is the Editor-in-Chief of the Journal of the American College of Surgeons (JACS).",
      expertiseTags: [
        'thoracic surgical oncology',
        'minimally invasive thoracic surgery',
        'lung cancer surgery',
        'health services research',
        'education research',
        'clinical trials',
        'surgical quality improvement',
        'cancer care delivery',
        'patient optimization',
        'health systems performance',
      ],
      collaborationNeeds: [
        'exercise science',
        'patient prehabilitation',
        'health systems research',
        'data science',
        'oncology',
        'behavioral science',
      ],
      contactInfo: 'thomas.varghese@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Precision Exercise Prescription (PEP) for Lung Cancer Surgical Resection',
        description:
          'NCI R01-funded randomized clinical trial investigating the role of Precision Exercise Prescription (PEP) for elective lung cancer surgical resection. Evaluating the effect of tailored exercise interventions on lung function and function in patients undergoing lung cancer surgery.',
        tags: ['lung cancer', 'exercise prescription', 'surgical oncology', 'clinical trial', 'NCI'],
        neededExpertise: ['exercise science', 'patient prehabilitation', 'behavioral science'],
        status: 'active',
        userId: varghese.id,
      },
      {
        title: 'HCI-IMPACT: Optimizing Surgeon and Health System Performance',
        description:
          'Directing the HCI Innovative Medical Practices Advancing Care Transformation (HCI-IMPACT) Center, focused on optimizing performance at the patient, surgeon, and system levels. Includes hospital cost analysis of surgical complications, value-driven outcomes research, and quality improvement initiatives.',
        tags: ['health services research', 'surgical quality', 'cancer care delivery', 'health systems', 'education research'],
        neededExpertise: ['health systems research', 'data science', 'oncology'],
        status: 'active',
        userId: varghese.id,
      },
    ],
  });

  // ── 2. Irma D. Fleming ───────────────────────────────────────────────────
  const fleming = await prisma.user.upsert({
    where: { email: 'irma.fleming@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Irma D. Fleming',
      email: 'irma.fleming@utah.edu',
      password: defaultPassword,
      department: 'General Surgery / Burn',
      university: 'University of Utah',
      bio: 'My research advances burn and wound care through clinical innovation, multicenter collaboration, and translational science. I lead DOD- and ABA-funded trials in frostbite management and burn resuscitation that shape national practice standards, while partnering with industry and academic teams to pioneer novel diagnostics and therapies, from rapid molecular infection testing to nanobubble disinfection. Current projects span burn-related PTSD, reproductive health, and global surgery. By collaborating with engineering, psychiatry, urology, and global surgery, I drive competitive funding, student-led device development, and cross-disciplinary innovation. This work reflects a clear vision: improving burn outcomes through evidence-based practices, transformative technologies, and inclusive scholarship that bridges institutions and borders.',
      expertiseTags: [
        'burn surgery',
        'wound care',
        'frostbite management',
        'burn resuscitation',
        'burn-related PTSD',
        'global burn care',
        'nanobubble technology',
        'molecular infection diagnostics',
        'complex wound reconstruction',
        'critical care',
      ],
      collaborationNeeds: [
        'psychiatry',
        'reproductive health',
        'global surgery',
        'engineering',
        'materials science',
        'device development',
      ],
      contactInfo: 'irma.fleming@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'DOD/ABA-Funded Trials in Frostbite Management and Burn Resuscitation',
        description:
          'Leading DOD- and ABA-funded multicenter trials investigating frostbite management protocols and burn resuscitation strategies that shape national practice standards. Partners with industry and academic teams to pioneer novel diagnostics from rapid molecular infection testing to nanobubble disinfection.',
        tags: ['frostbite', 'burn resuscitation', 'clinical trial', 'DOD', 'nanobubble', 'wound care'],
        neededExpertise: ['engineering', 'materials science', 'device development'],
        status: 'active',
        userId: fleming.id,
      },
      {
        title: 'Burn-Related PTSD, Reproductive Health, and Global Burn Care',
        description:
          'Investigating the intersection of burn injuries with mental health (PTSD), reproductive health outcomes, and global surgery disparities. Cross-disciplinary collaboration with psychiatry, urology, and global surgery to develop evidence-based interventions and inclusive scholarship across institutions and borders.',
        tags: ['burn surgery', 'PTSD', 'reproductive health', 'global surgery', 'mental health'],
        neededExpertise: ['psychiatry', 'reproductive health', 'global surgery'],
        status: 'active',
        userId: fleming.id,
      },
    ],
  });

  // ── 3. Giavonni M. Lewis ─────────────────────────────────────────────────
  const lewis = await prisma.user.upsert({
    where: { email: 'giavonni.lewis@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Giavonni M. Lewis',
      email: 'giavonni.lewis@utah.edu',
      password: defaultPassword,
      department: 'Surgery / Burn Center',
      university: 'University of Utah',
      bio: "As a nationally and internationally recognized acute burn care surgeon and surgical critical care specialist, my research represents the vanguard of transformative care in the realm of burn and wound management. By harnessing cutting-edge techniques and integrating cellular biology with clinical applications, this work is not merely about healing wounds but revolutionizing the framework of burn care. The endeavors span from optimizing complex wound management, decoding cellular dynamics in burn injuries, to pioneering burn disaster response protocols. Furthermore, the revelations from these studies frequently highlight knowledge lacunae, catalyzing enhanced educational paradigms at both national and international levels. The ultimate objective transcends traditional treatment — it's about sculpting the future of surgical care, elevating patient outcomes, and fostering a global community of educated and informed practitioners.",
      expertiseTags: [
        'burn surgery',
        'burn care',
        'critical care',
        'frostbite treatment',
        'laser treatment',
        'complex wound management',
        'MAIT cells',
        'regenerative tissue research',
        'burn disaster response',
        'teleburn',
        'toxic epidermal necrolysis',
      ],
      collaborationNeeds: [
        'cellular biology',
        'immunology',
        'regenerative medicine',
        'disaster response research',
        'global health',
        'wound biology',
      ],
      contactInfo: 'giavonni.lewis@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'MAIT Cells in Burn-Injured Wounds and Regenerative Tissue Research',
        description:
          'Elucidating the role of Mucosal-Associated Invariant T (MAIT) cells within burn-injured wounds and advancing regenerative tissue research. Integrates cellular biology with clinical applications to develop novel therapeutic approaches for wound healing beyond standard treatment paradigms.',
        tags: ['MAIT cells', 'burn wounds', 'immunology', 'regenerative medicine', 'wound healing'],
        neededExpertise: ['immunology', 'cellular biology', 'regenerative medicine'],
        status: 'active',
        userId: lewis.id,
      },
      {
        title: 'FROST Trial: Nanobubbles for Disinfection of Nosocomial Pathogens in Burn Wounds',
        description:
          'FROstbite multicenter ObSERvational Trial (FROST) and parallel investigation of nanobubble technology for disinfection of nosocomial pathogens in acute and chronic burn wounds. Principal Investigator for U.S. Department of Defense-funded study.',
        tags: ['frostbite', 'nanobubbles', 'burn wounds', 'disinfection', 'DOD', 'clinical trial'],
        neededExpertise: ['wound biology', 'disaster response research', 'global health'],
        status: 'active',
        userId: lewis.id,
      },
    ],
  });

  // ── 4. Ellen H. Morrow ───────────────────────────────────────────────────
  const morrow = await prisma.user.upsert({
    where: { email: 'ellen.morrow@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Ellen H. Morrow',
      email: 'ellen.morrow@utah.edu',
      password: defaultPassword,
      department: 'General Surgery',
      university: 'University of Utah',
      bio: 'I am a Foregut and Bariatric Surgeon and Associate Professor of Surgery at University of Utah Health and staff surgeon at the SLC VA hospital. My research and clinical interests include quality of life after bariatric surgery and cost-effectiveness. I have implemented the collection of Patient-reported Outcomes (PRO) and studied PROs after Bariatric Surgery. I am also a recognized expert in the field of professional well-being among healthcare workers, having served as Co-Director and then Medical Director of the Resiliency Center at the University of Utah from 2017–2023. I am a Co-Investigator on the HRSA grant "Promoting Resilience among Healthcare Workers in Diverse Practice Settings in the Intermountain West."',
      expertiseTags: [
        'bariatric surgery',
        'foregut surgery',
        'reflux',
        'paraesophageal hernias',
        'achalasia',
        'patient-reported outcomes',
        'quality of life',
        'healthcare worker wellbeing',
        'mindfulness',
        'surgeon burnout',
      ],
      collaborationNeeds: [
        'psychology',
        'mental health',
        'behavioral science',
        'health economics',
        'patient outcomes research',
        'mindfulness research',
      ],
      contactInfo: 'ellen.morrow@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Mindfulness Intervention for Prevention of Weight Regain After Bariatric Surgery',
        description:
          'Investigating mindfulness-based interventions as a strategy to prevent weight regain and improve psychological health outcomes following bariatric surgery. Combines patient-reported outcomes (PRO) collection with behavioral science methods.',
        tags: ['bariatric surgery', 'mindfulness', 'weight regain', 'patient-reported outcomes', 'psychological health'],
        neededExpertise: ['psychology', 'mindfulness research', 'behavioral science'],
        status: 'active',
        userId: morrow.id,
      },
      {
        title: 'Surgeon Wellbeing and Burnout Prevention in Diverse Practice Settings',
        description:
          'HRSA-funded study promoting resilience among healthcare workers in diverse practice settings in the Intermountain West. Draws on expertise from leading the University of Utah Resiliency Center to develop and evaluate professional wellbeing interventions for surgeons and health professionals.',
        tags: ['surgeon burnout', 'healthcare wellbeing', 'resilience', 'professional development', 'health systems'],
        neededExpertise: ['mental health', 'health economics', 'patient outcomes research'],
        status: 'active',
        userId: morrow.id,
      },
    ],
  });

  // ── 5. Ting Sun ──────────────────────────────────────────────────────────
  const sun = await prisma.user.upsert({
    where: { email: 'ting.sun@utah.edu' },
    update: {},
    create: {
      name: 'Dr. Ting Sun',
      email: 'ting.sun@utah.edu',
      password: defaultPassword,
      department: 'Surgery (Education Science)',
      university: 'University of Utah',
      bio: "My research focuses on advancing educational measurement and assessment in medical and surgical education. Specifically, I investigate the psychometric properties and validity evidence supporting the use and interpretation of assessment scores across the medical educational continuum. My work also explores the integration of artificial intelligence and machine learning to enhance surgical training, assessment, and broader educational applications. Through this scholarship, I bridge educational measurement, data science, and surgical education to promote evidence-informed approaches for evaluating competence and modeling learning trajectories in surgical education.",
      expertiseTags: [
        'surgical education',
        'medical education',
        'educational measurement',
        'psychometrics',
        'artificial intelligence in education',
        'machine learning',
        'competency assessment',
        'learning trajectories',
        'online learning',
        'data science',
      ],
      collaborationNeeds: [
        'machine learning',
        'AI for education',
        'surgical training research',
        'natural language processing',
        'simulation research',
        'curriculum design',
      ],
      contactInfo: 'ting.sun@utah.edu',
    },
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'AI and Machine Learning to Enhance Surgical Training and Assessment',
        description:
          'NSF-funded (2025–2028) Data Intensive Education Research and AI project exploring the integration of artificial intelligence and machine learning to enhance surgical training, assessment, and competency evaluation. Models learning trajectories in surgical education using advanced data science methods.',
        tags: ['artificial intelligence', 'machine learning', 'surgical education', 'competency assessment', 'NSF'],
        neededExpertise: ['machine learning', 'AI for education', 'natural language processing'],
        status: 'active',
        userId: sun.id,
      },
      {
        title: 'Validity Evidence for Entrustable Professional Activities in Surgery',
        description:
          'GEA National Grant-funded multisite study exploring validity evidence for Entrustable Professional Activities (EPAs) in surgery. Investigates psychometric properties and reliability of assessment instruments used to evaluate surgical trainees across the educational continuum.',
        tags: ['surgical education', 'psychometrics', 'entrustable professional activities', 'assessment', 'competency'],
        neededExpertise: ['surgical training research', 'simulation research', 'curriculum design'],
        status: 'active',
        userId: sun.id,
      },
    ],
  });

  console.log('Successfully imported 5 researcher profiles (batch 4):');
  console.log('  - Dr. Thomas K. Varghese Jr. (thomas.varghese@utah.edu)');
  console.log('  - Dr. Irma D. Fleming         (irma.fleming@utah.edu)');
  console.log('  - Dr. Giavonni M. Lewis        (giavonni.lewis@utah.edu)');
  console.log('  - Dr. Ellen H. Morrow          (ellen.morrow@utah.edu)');
  console.log('  - Dr. Ting Sun                 (ting.sun@utah.edu)');
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
