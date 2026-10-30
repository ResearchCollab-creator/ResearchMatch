import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.collabRequest.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // Create 8 researchers
  const sarah = await prisma.user.create({
    data: {
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@stateuniversity.edu',
      password: defaultPassword,
      department: 'Computational Biology',
      university: 'State University',
      bio: 'I develop computational methods for understanding gene regulatory networks and protein interactions. My work combines large-scale genomic data with mathematical modeling to uncover biological principles.',
      expertiseTags: ['computational biology', 'genomics', 'bioinformatics', 'network analysis', 'systems biology'],
      collaborationNeeds: ['statistician', 'machine learning', 'clinical data', 'epidemiology'],
      contactInfo: 'sarah.chen@stateuniversity.edu',
    },
  });

  const james = await prisma.user.create({
    data: {
      name: 'Prof. James Rivera',
      email: 'james.rivera@stateuniversity.edu',
      password: defaultPassword,
      department: 'Social Psychology',
      university: 'State University',
      bio: 'I study how social environments shape individual behavior and decision-making. My research focuses on group dynamics, social norms, and behavioral interventions in organizational settings.',
      expertiseTags: ['social psychology', 'behavioral science', 'survey design', 'qualitative research', 'organizational behavior'],
      collaborationNeeds: ['data scientist', 'machine learning', 'natural language processing', 'computational social science'],
      contactInfo: 'james.rivera@stateuniversity.edu',
    },
  });

  const amara = await prisma.user.create({
    data: {
      name: 'Dr. Amara Osei',
      email: 'amara.osei@stateuniversity.edu',
      password: defaultPassword,
      department: 'Environmental Science',
      university: 'State University',
      bio: 'My research examines land use change, deforestation, and climate adaptation strategies in sub-Saharan Africa. I use satellite imagery and field surveys to monitor ecosystem health.',
      expertiseTags: ['environmental science', 'ecology', 'climate change', 'sustainability', 'field research'],
      collaborationNeeds: ['remote sensing', 'GIS', 'machine learning', 'satellite imagery analysis', 'geospatial statistics'],
      contactInfo: 'amara.osei@stateuniversity.edu',
    },
  });

  const marcus = await prisma.user.create({
    data: {
      name: 'Dr. Marcus Webb',
      email: 'marcus.webb@stateuniversity.edu',
      password: defaultPassword,
      department: 'Neuroscience',
      university: 'State University',
      bio: 'I investigate the neural circuits underlying learning and memory consolidation. My lab uses multi-electrode recordings and optogenetics to map functional connectivity in the hippocampus.',
      expertiseTags: ['neuroscience', 'electrophysiology', 'optogenetics', 'cognitive science', 'neural circuits'],
      collaborationNeeds: ['machine learning', 'computer vision', 'signal processing', 'neural decoding', 'data visualization'],
      contactInfo: 'marcus.webb@stateuniversity.edu',
    },
  });

  const lisa = await prisma.user.create({
    data: {
      name: 'Prof. Lisa Park',
      email: 'lisa.park@stateuniversity.edu',
      password: defaultPassword,
      department: 'Public Health',
      university: 'State University',
      bio: 'I study the social determinants of health with a focus on mental health disparities in urban populations. My work combines epidemiological methods with community-based participatory research.',
      expertiseTags: ['public health', 'epidemiology', 'mental health', 'health disparities', 'community research'],
      collaborationNeeds: ['epidemiologist', 'behavioral economist', 'data visualization', 'causal inference', 'health economics'],
      contactInfo: 'lisa.park@stateuniversity.edu',
    },
  });

  const raj = await prisma.user.create({
    data: {
      name: 'Dr. Raj Patel',
      email: 'raj.patel@stateuniversity.edu',
      password: defaultPassword,
      department: 'Computer Science',
      university: 'State University',
      bio: 'I develop machine learning models for scientific discovery, with particular interest in transfer learning and self-supervised methods. I am looking to apply these techniques to real-world biological or medical problems.',
      expertiseTags: ['machine learning', 'deep learning', 'natural language processing', 'transfer learning', 'neural networks'],
      collaborationNeeds: ['domain expert in biology', 'domain expert in medicine', 'clinical data', 'bioinformatics', 'genomics'],
      contactInfo: 'raj.patel@stateuniversity.edu',
    },
  });

  const elena = await prisma.user.create({
    data: {
      name: 'Prof. Elena Vasquez',
      email: 'elena.vasquez@stateuniversity.edu',
      password: defaultPassword,
      department: 'Economics',
      university: 'State University',
      bio: 'My research focuses on behavioral economics and how cognitive biases affect economic decision-making. I use both lab and field experiments to study saving behavior, risk preferences, and policy interventions.',
      expertiseTags: ['economics', 'behavioral economics', 'econometrics', 'experimental economics', 'causal inference'],
      collaborationNeeds: ['social psychologist', 'neuroscientist', 'survey design', 'qualitative research'],
      contactInfo: 'elena.vasquez@stateuniversity.edu',
    },
  });

  const tom = await prisma.user.create({
    data: {
      name: 'Dr. Tom Nguyen',
      email: 'tom.nguyen@stateuniversity.edu',
      password: defaultPassword,
      department: 'Computer Science',
      university: 'State University',
      bio: 'I build computer vision systems for real-time scene understanding and object recognition. My recent work explores applying vision models to medical imaging and neuroscience data analysis.',
      expertiseTags: ['computer vision', 'deep learning', 'image processing', 'convolutional neural networks', 'real-time systems'],
      collaborationNeeds: ['neuroscientist', 'medical imaging', 'radiologist', 'clinical validation', 'fMRI analysis'],
      contactInfo: 'tom.nguyen@stateuniversity.edu',
    },
  });

  console.log('Created 8 researchers');

  // Create projects for each researcher
  // Sarah Chen's projects
  await prisma.project.create({
    data: {
      title: 'Gene Regulatory Network Inference from Single-Cell RNA-seq',
      description: 'We are developing novel algorithms to reconstruct gene regulatory networks from single-cell transcriptomics data. The project aims to identify key transcription factors and their target genes across different cell types.',
      tags: ['genomics', 'bioinformatics', 'single-cell', 'network analysis', 'RNA-seq'],
      neededExpertise: ['statistician', 'machine learning', 'Bayesian methods'],
      status: 'active',
      userId: sarah.id,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Protein Interaction Prediction Using Sequence Embeddings',
      description: 'This project applies transformer-based language models to predict protein-protein interactions from amino acid sequences. We are combining structural biology knowledge with modern NLP techniques.',
      tags: ['computational biology', 'protein structure', 'deep learning', 'NLP', 'bioinformatics'],
      neededExpertise: ['machine learning', 'NLP', 'protein biochemistry'],
      status: 'active',
      userId: sarah.id,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Multi-omics Integration for Cancer Subtype Discovery',
      description: 'We integrate genomic, transcriptomic, and proteomic data to identify novel cancer subtypes with distinct prognoses and treatment responses. The goal is to enable more personalized cancer therapy.',
      tags: ['cancer biology', 'multi-omics', 'genomics', 'clinical data', 'precision medicine'],
      neededExpertise: ['clinical data', 'epidemiology', 'survival analysis'],
      status: 'active',
      userId: sarah.id,
    },
  });

  // James Rivera's projects
  await prisma.project.create({
    data: {
      title: 'Social Norms and Prosocial Behavior in Online Communities',
      description: 'We are analyzing large-scale online forum data to understand how social norms emerge and influence prosocial behavior. The project combines computational text analysis with experimental methods.',
      tags: ['social psychology', 'online communities', 'NLP', 'behavior', 'social norms'],
      neededExpertise: ['natural language processing', 'data scientist', 'network analysis'],
      status: 'active',
      userId: james.id,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Workplace Interventions for Reducing Burnout',
      description: 'A longitudinal study examining the effectiveness of different organizational interventions on reducing employee burnout. We survey thousands of workers across multiple industries.',
      tags: ['organizational behavior', 'mental health', 'workplace', 'survey research', 'longitudinal'],
      neededExpertise: ['data scientist', 'machine learning', 'causal inference'],
      status: 'active',
      userId: james.id,
    },
  });

  // Amara Osei's projects
  await prisma.project.create({
    data: {
      title: 'Monitoring Deforestation in West Africa Using Sentinel-2',
      description: 'We use multi-temporal Sentinel-2 satellite imagery to detect and map deforestation events across West Africa. The project develops automated change detection algorithms tailored to tropical forest environments.',
      tags: ['remote sensing', 'deforestation', 'satellite imagery', 'West Africa', 'environment'],
      neededExpertise: ['remote sensing', 'GIS', 'machine learning', 'satellite imagery analysis'],
      status: 'active',
      userId: amara.id,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Climate Adaptation Strategies for Smallholder Farmers',
      description: 'This mixed-methods project examines how smallholder farmers in Ghana adapt their practices in response to changing rainfall patterns. We combine household surveys with satellite-derived vegetation indices.',
      tags: ['climate adaptation', 'agriculture', 'Ghana', 'field research', 'GIS'],
      neededExpertise: ['geospatial statistics', 'GIS', 'remote sensing'],
      status: 'active',
      userId: amara.id,
    },
  });

  // Marcus Webb's projects
  await prisma.project.create({
    data: {
      title: 'Neural Decoding of Spatial Memory in Hippocampal CA1',
      description: 'We record from hundreds of neurons simultaneously in freely moving rodents navigating complex environments. The project aims to decode spatial memory representations from population activity patterns.',
      tags: ['neuroscience', 'hippocampus', 'spatial memory', 'neural decoding', 'electrophysiology'],
      neededExpertise: ['machine learning', 'signal processing', 'neural decoding'],
      status: 'active',
      userId: marcus.id,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Optogenetic Dissection of Fear Memory Circuits',
      description: 'Using optogenetics and calcium imaging, we are mapping the circuit-level mechanisms of fear memory encoding and extinction. This has implications for treating PTSD and anxiety disorders.',
      tags: ['optogenetics', 'fear memory', 'calcium imaging', 'amygdala', 'PTSD'],
      neededExpertise: ['computer vision', 'image analysis', 'data visualization'],
      status: 'active',
      userId: marcus.id,
    },
  });

  // Lisa Park's projects
  await prisma.project.create({
    data: {
      title: 'Mental Health Disparities in Urban Low-Income Communities',
      description: 'A community-based participatory study examining barriers to mental health care in underserved urban neighborhoods. We are developing a culturally-tailored intervention program.',
      tags: ['mental health', 'health disparities', 'urban health', 'community research', 'intervention'],
      neededExpertise: ['epidemiologist', 'behavioral economist', 'health economics'],
      status: 'active',
      userId: lisa.id,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Social Determinants of Chronic Disease in Aging Populations',
      description: 'We investigate how neighborhood characteristics, social networks, and economic factors influence chronic disease outcomes in adults over 65. The study uses linked administrative and survey data.',
      tags: ['aging', 'chronic disease', 'social determinants', 'epidemiology', 'longitudinal'],
      neededExpertise: ['causal inference', 'data visualization', 'health economics'],
      status: 'active',
      userId: lisa.id,
    },
  });

  // Raj Patel's projects
  await prisma.project.create({
    data: {
      title: 'Self-Supervised Learning for Biomedical Text Mining',
      description: 'We pre-train large language models on biomedical literature and clinical notes to improve downstream tasks like disease classification and drug-drug interaction extraction.',
      tags: ['NLP', 'biomedical text', 'self-supervised learning', 'clinical NLP', 'machine learning'],
      neededExpertise: ['domain expert in biology', 'domain expert in medicine', 'clinical data'],
      status: 'active',
      userId: raj.id,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Transfer Learning for Rare Disease Genomics',
      description: 'This project investigates whether models pre-trained on common disease genomics can be effectively fine-tuned for rare disease prediction with limited labeled data.',
      tags: ['transfer learning', 'genomics', 'rare diseases', 'deep learning', 'bioinformatics'],
      neededExpertise: ['bioinformatics', 'genomics', 'clinical data'],
      status: 'active',
      userId: raj.id,
    },
  });

  // Elena Vasquez's projects
  await prisma.project.create({
    data: {
      title: 'Nudging Retirement Savings: A Field Experiment',
      description: 'We partner with a large employer to test the effectiveness of various choice architecture interventions on increasing employee retirement savings rates. The experiment follows 5000 employees over 2 years.',
      tags: ['behavioral economics', 'retirement savings', 'field experiment', 'nudge', 'choice architecture'],
      neededExpertise: ['social psychologist', 'survey design', 'qualitative research'],
      status: 'active',
      userId: elena.id,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Neural Correlates of Economic Risk Preferences',
      description: 'Combining neuroeconomics with behavioral economics, we examine how brain activity during risky decision tasks predicts real-world financial behavior. We use fMRI and economic experiments.',
      tags: ['neuroeconomics', 'decision making', 'risk preferences', 'fMRI', 'behavioral economics'],
      neededExpertise: ['neuroscientist', 'fMRI analysis', 'experimental design'],
      status: 'active',
      userId: elena.id,
    },
  });

  // Tom Nguyen's projects
  await prisma.project.create({
    data: {
      title: 'Automated Cell Segmentation in Microscopy Images',
      description: 'We develop deep learning models for accurate cell segmentation in high-throughput microscopy datasets. The system aims to accelerate drug screening by automating phenotypic analysis.',
      tags: ['computer vision', 'microscopy', 'cell segmentation', 'deep learning', 'drug screening'],
      neededExpertise: ['neuroscientist', 'cell biologist', 'clinical validation'],
      status: 'active',
      userId: tom.id,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Real-Time Neural Activity Visualization from fMRI',
      description: 'We are building a computer vision pipeline for real-time analysis and visualization of fMRI data during cognitive tasks. The goal is to enable closed-loop neurofeedback experiments.',
      tags: ['fMRI', 'neurofeedback', 'computer vision', 'real-time processing', 'cognitive neuroscience'],
      neededExpertise: ['neuroscientist', 'fMRI analysis', 'cognitive science'],
      status: 'active',
      userId: tom.id,
    },
  });

  console.log('Created projects for all researchers');
  console.log('Seeding complete!');
  console.log('\nTest credentials (all use password: password123):');
  console.log('  sarah.chen@stateuniversity.edu');
  console.log('  james.rivera@stateuniversity.edu');
  console.log('  raj.patel@stateuniversity.edu');
  console.log('  tom.nguyen@stateuniversity.edu');
  console.log('  ... and others');
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
