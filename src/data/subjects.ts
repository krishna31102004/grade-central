export interface Topic {
  id: string;
  title: string;
  summary: string;
  filename: string;
}

export interface PastPaper {
  year: number;
  session: 'FM' | 'MJ' | 'ND';
  paperNumber: number;
  variant: string;
  paperFilename: string;
  markSchemeFilename: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  colorDark: string;
  icon: string;
  asTopics: Topic[];
  aLevelTopics: Topic[];
  pastPapers: PastPaper[];
}

export const subjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    code: '9709',
    color: 'subjects-mathematics',
    colorDark: 'subjects-mathematics-dark',
    icon: '📐',
    asTopics: [
      { id: 'quadratics', title: 'Quadratics', summary: 'Download notes covering quadratic equations and functions.', filename: 'quadratics.pdf' },
      { id: 'functions', title: 'Functions', summary: 'Download notes on function properties and transformations.', filename: 'functions.pdf' },
      { id: 'coordinate-geometry', title: 'Coordinate Geometry', summary: 'Download notes on coordinate geometry fundamentals.', filename: 'coordinate-geometry.pdf' },
      { id: 'circular-measure', title: 'Circular Measure', summary: 'Download notes on radians and arc length calculations.', filename: 'circular-measure.pdf' },
      { id: 'trigonometry', title: 'Trigonometry', summary: 'Download notes on trigonometric functions and identities.', filename: 'trigonometry.pdf' },
      { id: 'series', title: 'Series', summary: 'Download notes on arithmetic and geometric progressions.', filename: 'series.pdf' },
      { id: 'differentiation', title: 'Differentiation', summary: 'Download notes on basic differentiation techniques.', filename: 'differentiation.pdf' },
      { id: 'integration', title: 'Integration', summary: 'Download notes on basic integration methods.', filename: 'integration.pdf' },
      { id: 'representation-of-data', title: 'Representation of Data', summary: 'Download notes on statistical data representation.', filename: 'representation-of-data.pdf' },
      { id: 'permutations-and-combinations', title: 'Permutations and Combinations', summary: 'Download notes on combinatorics fundamentals.', filename: 'permutations-and-combinations.pdf' },
      { id: 'probability', title: 'Probability', summary: 'Download notes on probability theory and applications.', filename: 'probability.pdf' },
      { id: 'discrete-random-variables', title: 'Discrete Random Variables', summary: 'Download notes on discrete probability distributions.', filename: 'discrete-random-variables.pdf' },
      { id: 'the-normal-distribution', title: 'The Normal Distribution', summary: 'Download notes on normal distribution and applications.', filename: 'the-normal-distribution.pdf' },
    ],
    aLevelTopics: [
      { id: 'algebra', title: 'Algebra', summary: 'Download notes on advanced algebraic techniques.', filename: 'algebra.pdf' },
      { id: 'logarithmic-and-exponential-functions', title: 'Logarithmic and Exponential Functions', summary: 'Download notes on exponential and logarithmic functions.', filename: 'logarithmic-and-exponential-functions.pdf' },
      { id: 'trigonometry-p2', title: 'Trigonometry (Paper 2)', summary: 'Download advanced trigonometry notes.', filename: 'trigonometry-p2.pdf' },
      { id: 'differentiation-p2', title: 'Differentiation (Paper 2)', summary: 'Download advanced differentiation notes.', filename: 'differentiation-p2.pdf' },
      { id: 'integration-p2', title: 'Integration (Paper 2)', summary: 'Download advanced integration notes.', filename: 'integration-p2.pdf' },
      { id: 'numerical-solution-of-equations', title: 'Numerical Solution of Equations', summary: 'Download notes on numerical methods.', filename: 'numerical-solution-of-equations.pdf' },
      { id: 'vectors', title: 'Vectors', summary: 'Download notes on vector algebra and geometry.', filename: 'vectors.pdf' },
      { id: 'differential-equations', title: 'Differential Equations', summary: 'Download notes on solving differential equations.', filename: 'differential-equations.pdf' },
      { id: 'complex-numbers', title: 'Complex Numbers', summary: 'Download notes on complex number theory.', filename: 'complex-numbers.pdf' },
      { id: 'forces-and-equilibrium', title: 'Forces and Equilibrium', summary: 'Download notes on mechanics fundamentals.', filename: 'forces-and-equilibrium.pdf' },
      { id: 'kinematics-of-motion-in-a-straight-line', title: 'Kinematics of Motion in a Straight Line', summary: 'Download notes on linear motion.', filename: 'kinematics-of-motion-in-a-straight-line.pdf' },
      { id: 'momentum', title: 'Momentum', summary: 'Download notes on momentum and collisions.', filename: 'momentum.pdf' },
      { id: 'newtons-laws-of-motion', title: "Newton's Laws of Motion", summary: 'Download notes on Newton\'s laws and applications.', filename: 'newtons-laws-of-motion.pdf' },
      { id: 'energy-work-and-power', title: 'Energy, Work and Power', summary: 'Download notes on energy concepts in mechanics.', filename: 'energy-work-and-power.pdf' },
      { id: 'poisson-distribution', title: 'The Poisson Distribution', summary: 'Download notes on Poisson distribution.', filename: 'poisson-distribution.pdf' },
      { id: 'linear-combinations-of-random-variables', title: 'Linear Combinations of Random Variables', summary: 'Download notes on combining random variables.', filename: 'linear-combinations-of-random-variables.pdf' },
      { id: 'continuous-random-variables', title: 'Continuous Random Variables', summary: 'Download notes on continuous probability distributions.', filename: 'continuous-random-variables.pdf' },
      { id: 'sampling-and-estimation', title: 'Sampling and Estimation', summary: 'Download notes on statistical sampling methods.', filename: 'sampling-and-estimation.pdf' },
      { id: 'hypothesis-tests', title: 'Hypothesis Tests', summary: 'Download notes on statistical hypothesis testing.', filename: 'hypothesis-tests.pdf' },
    ],
    pastPapers: generatePastPapers('9709', [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53, 61, 62, 63]),
  },
  {
    id: 'further-mathematics',
    name: 'Further Mathematics',
    code: '9231',
    color: 'subjects-further-math',
    colorDark: 'subjects-further-math-dark',
    icon: '🧮',
    asTopics: [
      { id: 'roots-of-polynomial-equations', title: 'Roots of Polynomial Equations', summary: 'Download notes on polynomial roots and equations.', filename: 'roots-of-polynomial-equations.pdf' },
      { id: 'rational-functions-and-graphs', title: 'Rational Functions and Graphs', summary: 'Download notes on rational functions.', filename: 'rational-functions-and-graphs.pdf' },
      { id: 'summation-of-series', title: 'Summation of Series', summary: 'Download notes on series summation techniques.', filename: 'summation-of-series.pdf' },
      { id: 'matrices', title: 'Matrices', summary: 'Download notes on matrix operations and applications.', filename: 'matrices.pdf' },
      { id: 'polar-coordinates', title: 'Polar Coordinates', summary: 'Download notes on polar coordinate systems.', filename: 'polar-coordinates.pdf' },
      { id: 'vectors-fp', title: 'Vectors', summary: 'Download notes on vector analysis.', filename: 'vectors-fp.pdf' },
      { id: 'proof-by-induction', title: 'Proof by Induction', summary: 'Download notes on mathematical induction.', filename: 'proof-by-induction.pdf' },
    ],
    aLevelTopics: [
      { id: 'hyperbolic-functions', title: 'Hyperbolic Functions', summary: 'Download notes on hyperbolic trigonometric functions.', filename: 'hyperbolic-functions.pdf' },
      { id: 'matrices-fp2', title: 'Matrices (Advanced)', summary: 'Download advanced matrix theory notes.', filename: 'matrices-fp2.pdf' },
      { id: 'differentiation-fp2', title: 'Differentiation (Advanced)', summary: 'Download advanced differentiation techniques.', filename: 'differentiation-fp2.pdf' },
      { id: 'integration-fp2', title: 'Integration (Advanced)', summary: 'Download advanced integration methods.', filename: 'integration-fp2.pdf' },
      { id: 'complex-numbers-fp2', title: 'Complex Numbers (Advanced)', summary: 'Download advanced complex number theory.', filename: 'complex-numbers-fp2.pdf' },
      { id: 'differential-equations-fp2', title: 'Differential Equations (Advanced)', summary: 'Download advanced differential equations.', filename: 'differential-equations-fp2.pdf' },
      { id: 'motion-of-a-projectile', title: 'Motion of a Projectile', summary: 'Download notes on projectile motion.', filename: 'motion-of-a-projectile.pdf' },
      { id: 'equilibrium-of-a-rigid-body', title: 'Equilibrium of a Rigid Body', summary: 'Download notes on rigid body equilibrium.', filename: 'equilibrium-of-a-rigid-body.pdf' },
      { id: 'circular-motion', title: 'Circular Motion', summary: 'Download notes on circular motion dynamics.', filename: 'circular-motion.pdf' },
      { id: 'hookes-law', title: "Hooke's Law", summary: 'Download notes on elastic forces and springs.', filename: 'hookes-law.pdf' },
      { id: 'linear-motion-under-a-variable-force', title: 'Linear Motion Under a Variable Force', summary: 'Download notes on variable force motion.', filename: 'linear-motion-under-a-variable-force.pdf' },
      { id: 'momentum-fm', title: 'Momentum (Further)', summary: 'Download advanced momentum concepts.', filename: 'momentum-fm.pdf' },
      { id: 'continuous-random-variables-fps', title: 'Continuous Random Variables', summary: 'Download advanced probability theory.', filename: 'continuous-random-variables-fps.pdf' },
      { id: 'inference-using-normal-and-t-distributions', title: 'Inference using Normal and t-distributions', summary: 'Download statistical inference notes.', filename: 'inference-using-normal-and-t-distributions.pdf' },
      { id: 'chi-squared-tests', title: 'Chi-squared Tests', summary: 'Download chi-squared test methodology.', filename: 'chi-squared-tests.pdf' },
      { id: 'non-parametric-tests', title: 'Non-parametric Tests', summary: 'Download non-parametric statistics notes.', filename: 'non-parametric-tests.pdf' },
      { id: 'probability-generating-functions', title: 'Probability Generating Functions', summary: 'Download probability generating functions theory.', filename: 'probability-generating-functions.pdf' },
    ],
    pastPapers: generatePastPapers('9231', [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43]),
  },
  {
    id: 'physics',
    name: 'Physics',
    code: '9702',
    color: 'subjects-physics',
    colorDark: 'subjects-physics-dark',
    icon: '⚛️',
    asTopics: [
      { id: 'physical-quantities-and-units', title: 'Physical Quantities and Units', summary: 'Download notes on measurement and units.', filename: 'physical-quantities-and-units.pdf' },
      { id: 'kinematics', title: 'Kinematics', summary: 'Download notes on motion and kinematics.', filename: 'kinematics.pdf' },
      { id: 'dynamics', title: 'Dynamics', summary: 'Download notes on forces and Newton\'s laws.', filename: 'dynamics.pdf' },
      { id: 'forces-density-and-pressure', title: 'Forces, Density and Pressure', summary: 'Download notes on force applications.', filename: 'forces-density-and-pressure.pdf' },
      { id: 'work-energy-and-power', title: 'Work, Energy and Power', summary: 'Download notes on energy concepts.', filename: 'work-energy-and-power.pdf' },
      { id: 'deformation-of-solids', title: 'Deformation of Solids', summary: 'Download notes on material properties.', filename: 'deformation-of-solids.pdf' },
      { id: 'waves', title: 'Waves', summary: 'Download notes on wave properties and behavior.', filename: 'waves.pdf' },
      { id: 'superposition', title: 'Superposition', summary: 'Download notes on wave interference.', filename: 'superposition.pdf' },
    ],
    aLevelTopics: [
      { id: 'electricity', title: 'Electricity', summary: 'Download notes on electric circuits and fields.', filename: 'electricity.pdf' },
      { id: 'dc-circuits', title: 'DC Circuits', summary: 'Download notes on direct current circuits.', filename: 'dc-circuits.pdf' },
      { id: 'particle-physics', title: 'Particle Physics', summary: 'Download notes on fundamental particles.', filename: 'particle-physics.pdf' },
      { id: 'radioactivity', title: 'Radioactivity', summary: 'Download notes on nuclear physics.', filename: 'radioactivity.pdf' },
      { id: 'atomic-physics', title: 'Atomic Physics', summary: 'Download notes on atomic structure.', filename: 'atomic-physics.pdf' },
      { id: 'medical-physics', title: 'Medical Physics', summary: 'Download notes on physics in medicine.', filename: 'medical-physics.pdf' },
      { id: 'astronomy-and-cosmology', title: 'Astronomy and Cosmology', summary: 'Download notes on space and the universe.', filename: 'astronomy-and-cosmology.pdf' },
    ],
    pastPapers: generatePastPapers('9702', [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53]),
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: '9701',
    color: 'subjects-chemistry',
    colorDark: 'subjects-chemistry-dark',
    icon: '🧪',
    asTopics: [
      { id: 'atomic-structure', title: 'Atomic Structure', summary: 'Download notes on atoms and electronic structure.', filename: 'atomic-structure.pdf' },
      { id: 'chemical-bonding', title: 'Chemical Bonding', summary: 'Download notes on ionic, covalent, and metallic bonding.', filename: 'chemical-bonding.pdf' },
      { id: 'states-of-matter', title: 'States of Matter', summary: 'Download notes on gases, liquids, and solids.', filename: 'states-of-matter.pdf' },
      { id: 'chemical-energetics', title: 'Chemical Energetics', summary: 'Download notes on enthalpy and energy changes.', filename: 'chemical-energetics.pdf' },
      { id: 'electrochemistry', title: 'Electrochemistry', summary: 'Download notes on redox reactions and cells.', filename: 'electrochemistry.pdf' },
      { id: 'equilibria', title: 'Equilibria', summary: 'Download notes on chemical equilibrium.', filename: 'equilibria.pdf' },
      { id: 'reaction-kinetics', title: 'Reaction Kinetics', summary: 'Download notes on reaction rates.', filename: 'reaction-kinetics.pdf' },
      { id: 'the-periodic-table', title: 'The Periodic Table', summary: 'Download notes on periodic trends.', filename: 'the-periodic-table.pdf' },
      { id: 'group-2', title: 'Group 2', summary: 'Download notes on alkaline earth metals.', filename: 'group-2.pdf' },
      { id: 'group-17', title: 'Group 17', summary: 'Download notes on halogens.', filename: 'group-17.pdf' },
      { id: 'introduction-to-organic-chemistry', title: 'Introduction to Organic Chemistry', summary: 'Download notes on organic chemistry basics.', filename: 'introduction-to-organic-chemistry.pdf' },
      { id: 'alkanes', title: 'Alkanes', summary: 'Download notes on saturated hydrocarbons.', filename: 'alkanes.pdf' },
      { id: 'alkenes', title: 'Alkenes', summary: 'Download notes on unsaturated hydrocarbons.', filename: 'alkenes.pdf' },
    ],
    aLevelTopics: [
      { id: 'lattice-energy', title: 'Lattice Energy', summary: 'Download notes on ionic lattice energies.', filename: 'lattice-energy.pdf' },
      { id: 'entropy', title: 'Entropy', summary: 'Download notes on entropy and spontaneity.', filename: 'entropy.pdf' },
      { id: 'period-3', title: 'Period 3', summary: 'Download notes on third period elements.', filename: 'period-3.pdf' },
      { id: 'transition-elements', title: 'Transition Elements', summary: 'Download notes on d-block elements.', filename: 'transition-elements.pdf' },
      { id: 'benzene-and-its-compounds', title: 'Benzene and its Compounds', summary: 'Download notes on aromatic chemistry.', filename: 'benzene-and-its-compounds.pdf' },
      { id: 'carbonyl-compounds', title: 'Carbonyl Compounds', summary: 'Download notes on aldehydes and ketones.', filename: 'carbonyl-compounds.pdf' },
      { id: 'carboxylic-acids-and-derivatives', title: 'Carboxylic Acids and Derivatives', summary: 'Download notes on carboxylic acids.', filename: 'carboxylic-acids-and-derivatives.pdf' },
      { id: 'organic-nitrogen-compounds', title: 'Organic Nitrogen Compounds', summary: 'Download notes on amines and amides.', filename: 'organic-nitrogen-compounds.pdf' },
      { id: 'polymers', title: 'Polymers', summary: 'Download notes on polymerization.', filename: 'polymers.pdf' },
      { id: 'analytical-techniques', title: 'Analytical Techniques', summary: 'Download notes on spectroscopy and analysis.', filename: 'analytical-techniques.pdf' },
      { id: 'organic-synthesis', title: 'Organic Synthesis', summary: 'Download notes on synthetic pathways.', filename: 'organic-synthesis.pdf' },
    ],
    pastPapers: generatePastPapers('9701', [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53]),
  },
  {
    id: 'biology',
    name: 'Biology',
    code: '9700',
    color: 'subjects-biology',
    colorDark: 'subjects-biology-dark',
    icon: '🧬',
    asTopics: [
      { id: 'cell-structure', title: 'Cell Structure', summary: 'Download notes on prokaryotic and eukaryotic cells.', filename: 'cell-structure.pdf' },
      { id: 'biological-molecules', title: 'Biological Molecules', summary: 'Download notes on carbohydrates, proteins, lipids, and nucleic acids.', filename: 'biological-molecules.pdf' },
      { id: 'enzymes', title: 'Enzymes', summary: 'Download notes on enzyme structure and function.', filename: 'enzymes.pdf' },
      { id: 'cell-membranes-and-transport', title: 'Cell Membranes and Transport', summary: 'Download notes on membrane structure and transport mechanisms.', filename: 'cell-membranes-and-transport.pdf' },
      { id: 'the-mitotic-cell-cycle', title: 'The Mitotic Cell Cycle', summary: 'Download notes on cell division and the cell cycle.', filename: 'the-mitotic-cell-cycle.pdf' },
      { id: 'nucleic-acids-and-protein-synthesis', title: 'Nucleic Acids and Protein Synthesis', summary: 'Download notes on DNA, RNA, and protein synthesis.', filename: 'nucleic-acids-and-protein-synthesis.pdf' },
      { id: 'transport-in-plants', title: 'Transport in Plants', summary: 'Download notes on xylem and phloem transport.', filename: 'transport-in-plants.pdf' },
      { id: 'transport-in-mammals', title: 'Transport in Mammals', summary: 'Download notes on circulatory and lymphatic systems.', filename: 'transport-in-mammals.pdf' },
      { id: 'gas-exchange', title: 'Gas Exchange', summary: 'Download notes on respiratory systems.', filename: 'gas-exchange.pdf' },
      { id: 'infectious-diseases', title: 'Infectious Diseases', summary: 'Download notes on pathogens and disease transmission.', filename: 'infectious-diseases.pdf' },
      { id: 'immunity', title: 'Immunity', summary: 'Download notes on immune system responses.', filename: 'immunity.pdf' },
    ],
    aLevelTopics: [
      { id: 'energy-and-respiration', title: 'Energy and Respiration', summary: 'Download notes on cellular respiration and ATP.', filename: 'energy-and-respiration.pdf' },
      { id: 'photosynthesis', title: 'Photosynthesis', summary: 'Download notes on light-dependent and light-independent reactions.', filename: 'photosynthesis.pdf' },
      { id: 'homeostasis', title: 'Homeostasis', summary: 'Download notes on maintaining internal balance.', filename: 'homeostasis.pdf' },
      { id: 'control-and-coordination', title: 'Control and Coordination', summary: 'Download notes on nervous and hormonal control.', filename: 'control-and-coordination.pdf' },
      { id: 'inheritance', title: 'Inheritance', summary: 'Download notes on genetics and heredity.', filename: 'inheritance.pdf' },
      { id: 'selection-and-evolution', title: 'Selection and Evolution', summary: 'Download notes on natural selection and evolution.', filename: 'selection-and-evolution.pdf' },
      { id: 'classification-biodiversity-and-conservation', title: 'Classification, Biodiversity and Conservation', summary: 'Download notes on taxonomy and conservation.', filename: 'classification-biodiversity-and-conservation.pdf' },
      { id: 'genetic-technology', title: 'Genetic Technology', summary: 'Download notes on biotechnology and genetic engineering.', filename: 'genetic-technology.pdf' },
    ],
    pastPapers: generatePastPapers('9700', [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53]),
  },
  {
    id: 'economics',
    name: 'Economics',
    code: '9708',
    color: 'subjects-economics',
    colorDark: 'subjects-economics-dark',
    icon: '📊',
    asTopics: [
      { id: 'basic-economic-ideas-and-resource-allocation', title: 'Basic Economic Ideas and Resource Allocation', summary: 'Download notes on fundamental economic concepts.', filename: 'basic-economic-ideas-and-resource-allocation.pdf' },
      { id: 'the-price-system-and-the-microeconomy', title: 'The Price System and the Microeconomy', summary: 'Download notes on supply, demand, and market mechanisms.', filename: 'the-price-system-and-the-microeconomy.pdf' },
      { id: 'government-microeconomic-intervention', title: 'Government Microeconomic Intervention', summary: 'Download notes on market failures and government intervention.', filename: 'government-microeconomic-intervention.pdf' },
      { id: 'the-macroeconomy', title: 'The Macroeconomy', summary: 'Download notes on national income and economic indicators.', filename: 'the-macroeconomy.pdf' },
      { id: 'government-macroeconomic-intervention', title: 'Government Macroeconomic Intervention', summary: 'Download notes on fiscal and monetary policies.', filename: 'government-macroeconomic-intervention.pdf' },
    ],
    aLevelTopics: [
      { id: 'economics-as-a-social-science', title: 'Economics as a Social Science', summary: 'Download notes on economic methodology.', filename: 'economics-as-a-social-science.pdf' },
      { id: 'the-price-system-and-the-theory-of-the-firm', title: 'The Price System and the Theory of the Firm', summary: 'Download notes on firm behavior and market structures.', filename: 'the-price-system-and-the-theory-of-the-firm.pdf' },
      { id: 'government-microeconomic-intervention-advanced', title: 'Government Microeconomic Intervention (Advanced)', summary: 'Download advanced notes on government intervention.', filename: 'government-microeconomic-intervention-advanced.pdf' },
      { id: 'the-macroeconomy-advanced', title: 'The Macroeconomy (Advanced)', summary: 'Download advanced macroeconomic theory notes.', filename: 'the-macroeconomy-advanced.pdf' },
      { id: 'government-macroeconomic-intervention-advanced', title: 'Government Macroeconomic Intervention (Advanced)', summary: 'Download advanced policy analysis notes.', filename: 'government-macroeconomic-intervention-advanced.pdf' },
      { id: 'international-economic-issues', title: 'International Economic Issues', summary: 'Download notes on international trade and finance.', filename: 'international-economic-issues.pdf' },
      { id: 'development-economics', title: 'Development Economics', summary: 'Download notes on economic development.', filename: 'development-economics.pdf' },
    ],
    pastPapers: generatePastPapers('9708', [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43]),
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    code: '9618',
    color: 'subjects-computer-science',
    colorDark: 'subjects-computer-science-dark',
    icon: '💻',
    asTopics: [
      { id: 'information-representation', title: 'Information Representation', summary: 'Download notes on data representation and number systems.', filename: 'information-representation.pdf' },
      { id: 'communication', title: 'Communication', summary: 'Download notes on networking and protocols.', filename: 'communication.pdf' },
      { id: 'hardware', title: 'Hardware', summary: 'Download notes on computer hardware components.', filename: 'hardware.pdf' },
      { id: 'processor-fundamentals', title: 'Processor Fundamentals', summary: 'Download notes on CPU operation and architecture.', filename: 'processor-fundamentals.pdf' },
      { id: 'system-software', title: 'System Software', summary: 'Download notes on operating systems and utilities.', filename: 'system-software.pdf' },
      { id: 'security-privacy-and-data-integrity', title: 'Security, Privacy and Data Integrity', summary: 'Download notes on computer security concepts.', filename: 'security-privacy-and-data-integrity.pdf' },
      { id: 'ethics-and-ownership', title: 'Ethics and Ownership', summary: 'Download notes on ethical issues in computing.', filename: 'ethics-and-ownership.pdf' },
      { id: 'databases', title: 'Databases', summary: 'Download notes on database design and management.', filename: 'databases.pdf' },
      { id: 'algorithm-design-and-problem-solving', title: 'Algorithm Design and Problem-solving', summary: 'Download notes on algorithms and programming.', filename: 'algorithm-design-and-problem-solving.pdf' },
      { id: 'data-types-and-structures', title: 'Data Types and Structures', summary: 'Download notes on programming data structures.', filename: 'data-types-and-structures.pdf' },
      { id: 'programming', title: 'Programming', summary: 'Download notes on programming concepts and languages.', filename: 'programming.pdf' },
      { id: 'software-development', title: 'Software Development', summary: 'Download notes on software engineering.', filename: 'software-development.pdf' },
    ],
    aLevelTopics: [
      { id: 'computational-thinking-and-problem-solving', title: 'Computational Thinking and Problem-solving', summary: 'Download advanced problem-solving notes.', filename: 'computational-thinking-and-problem-solving.pdf' },
      { id: 'advanced-programming', title: 'Advanced Programming', summary: 'Download advanced programming techniques.', filename: 'advanced-programming.pdf' },
      { id: 'advanced-databases', title: 'Advanced Databases', summary: 'Download advanced database concepts.', filename: 'advanced-databases.pdf' },
      { id: 'big-data', title: 'Big Data', summary: 'Download notes on big data processing.', filename: 'big-data.pdf' },
      { id: 'artificial-intelligence', title: 'Artificial Intelligence', summary: 'Download notes on AI concepts and applications.', filename: 'artificial-intelligence.pdf' },
    ],
    pastPapers: generatePastPapers('9618', [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43]),
  },
  {
    id: 'sociology',
    name: 'Sociology',
    code: '9699',
    color: 'subjects-sociology',
    colorDark: 'subjects-sociology-dark',
    icon: '👥',
    asTopics: [
      { id: 'socialisation-culture-and-identity', title: 'Socialisation, Culture and Identity', summary: 'Download notes on social processes and identity formation.', filename: 'socialisation-culture-and-identity.pdf' },
      { id: 'research-methods', title: 'Research Methods', summary: 'Download notes on sociological research techniques.', filename: 'research-methods.pdf' },
      { id: 'education', title: 'Education', summary: 'Download notes on educational systems and theory.', filename: 'education.pdf' },
      { id: 'families-and-households', title: 'Families and Households', summary: 'Download notes on family structures and changes.', filename: 'families-and-households.pdf' },
    ],
    aLevelTopics: [
      { id: 'theory-and-methods', title: 'Theory and Methods', summary: 'Download advanced sociological theory notes.', filename: 'theory-and-methods.pdf' },
      { id: 'crime-deviance-and-social-order', title: 'Crime, Deviance and Social Order', summary: 'Download notes on criminal behavior and social control.', filename: 'crime-deviance-and-social-order.pdf' },
      { id: 'media', title: 'Media', summary: 'Download notes on media influence and society.', filename: 'media.pdf' },
      { id: 'global-development', title: 'Global Development', summary: 'Download notes on development theories and processes.', filename: 'global-development.pdf' },
      { id: 'stratification-and-differentiation', title: 'Stratification and Differentiation', summary: 'Download notes on social inequality.', filename: 'stratification-and-differentiation.pdf' },
      { id: 'power-and-politics', title: 'Power and Politics', summary: 'Download notes on political sociology.', filename: 'power-and-politics.pdf' },
      { id: 'religion', title: 'Religion', summary: 'Download notes on religion and society.', filename: 'religion.pdf' },
    ],
    pastPapers: generatePastPapers('9699', [11, 12, 13, 21, 22, 23, 31, 32, 33]),
  },
  {
    id: 'psychology',
    name: 'Psychology',
    code: '9990',
    color: 'subjects-psychology',
    colorDark: 'subjects-psychology-dark',
    icon: '🧠',
    asTopics: [
      { id: 'research-methods-psychology', title: 'Research Methods', summary: 'Download notes on psychological research methods.', filename: 'research-methods-psychology.pdf' },
      { id: 'biological-approach', title: 'Biological Approach', summary: 'Download notes on biological basis of behavior.', filename: 'biological-approach.pdf' },
      { id: 'learning-approach', title: 'Learning Approach', summary: 'Download notes on conditioning and learning theory.', filename: 'learning-approach.pdf' },
      { id: 'cognitive-approach', title: 'Cognitive Approach', summary: 'Download notes on cognitive psychology.', filename: 'cognitive-approach.pdf' },
      { id: 'social-approach', title: 'Social Approach', summary: 'Download notes on social psychology.', filename: 'social-approach.pdf' },
    ],
    aLevelTopics: [
      { id: 'approaches-and-research-methods-in-psychology', title: 'Approaches and Research Methods in Psychology', summary: 'Download advanced research methodology notes.', filename: 'approaches-and-research-methods-in-psychology.pdf' },
      { id: 'psychology-and-abnormality', title: 'Psychology and Abnormality', summary: 'Download notes on mental health and disorders.', filename: 'psychology-and-abnormality.pdf' },
      { id: 'psychology-and-consumer-behavior', title: 'Psychology and Consumer Behavior', summary: 'Download notes on consumer psychology.', filename: 'psychology-and-consumer-behavior.pdf' },
      { id: 'psychology-and-health', title: 'Psychology and Health', summary: 'Download notes on health psychology.', filename: 'psychology-and-health.pdf' },
      { id: 'psychology-and-organisations', title: 'Psychology and Organisations', summary: 'Download notes on organizational psychology.', filename: 'psychology-and-organisations.pdf' },
    ],
    pastPapers: generatePastPapers('9990', [11, 12, 13, 21, 22, 23, 31, 32, 33]),
  },
  {
    id: 'accounting',
    name: 'Accounting',
    code: '9706',
    color: 'subjects-accounting',
    colorDark: 'subjects-accounting-dark',
    icon: '📋',
    asTopics: [
      { id: 'recording-financial-transactions', title: 'Recording Financial Transactions', summary: 'Download notes on basic bookkeeping and recording.', filename: 'recording-financial-transactions.pdf' },
      { id: 'adjustments-to-accounting-records', title: 'Adjustments to Accounting Records', summary: 'Download notes on adjusting entries and corrections.', filename: 'adjustments-to-accounting-records.pdf' },
      { id: 'preparation-of-financial-statements', title: 'Preparation of Financial Statements', summary: 'Download notes on income statements and balance sheets.', filename: 'preparation-of-financial-statements.pdf' },
      { id: 'books-of-prime-entry', title: 'Books of Prime Entry', summary: 'Download notes on subsidiary books and journals.', filename: 'books-of-prime-entry.pdf' },
      { id: 'control-systems', title: 'Control Systems', summary: 'Download notes on internal control and verification.', filename: 'control-systems.pdf' },
    ],
    aLevelTopics: [
      { id: 'accounting-principles-and-policies', title: 'Accounting Principles and Policies', summary: 'Download advanced accounting concepts.', filename: 'accounting-principles-and-policies.pdf' },
      { id: 'company-accounts-and-analysis', title: 'Company Accounts and Analysis', summary: 'Download notes on corporate accounting.', filename: 'company-accounts-and-analysis.pdf' },
      { id: 'introduction-to-management-accounting', title: 'Introduction to Management Accounting', summary: 'Download notes on cost and management accounting.', filename: 'introduction-to-management-accounting.pdf' },
      { id: 'budgeting', title: 'Budgeting', summary: 'Download notes on budgeting and variance analysis.', filename: 'budgeting.pdf' },
      { id: 'marginal-and-absorption-costing', title: 'Marginal and Absorption Costing', summary: 'Download notes on costing methods.', filename: 'marginal-and-absorption-costing.pdf' },
    ],
    pastPapers: generatePastPapers('9706', [11, 12, 13, 21, 22, 23, 31, 32, 33]),
  },
  {
    id: 'business-studies',
    name: 'Business Studies',
    code: '9609',
    color: 'subjects-business',
    colorDark: 'subjects-business-dark',
    icon: '💼',
    asTopics: [
      { id: 'enterprise', title: 'Enterprise', summary: 'Download notes on entrepreneurship and business planning.', filename: 'enterprise.pdf' },
      { id: 'business-structure-and-organisation', title: 'Business Structure and Organisation', summary: 'Download notes on organizational structures.', filename: 'business-structure-and-organisation.pdf' },
      { id: 'size-of-business', title: 'Size of Business', summary: 'Download notes on business growth and measurement.', filename: 'size-of-business.pdf' },
      { id: 'business-objectives', title: 'Business Objectives', summary: 'Download notes on goal setting and mission.', filename: 'business-objectives.pdf' },
      { id: 'stakeholders', title: 'Stakeholders', summary: 'Download notes on stakeholder theory and management.', filename: 'stakeholders.pdf' },
      { id: 'external-environment', title: 'External Environment', summary: 'Download notes on business environment factors.', filename: 'external-environment.pdf' },
      { id: 'marketing', title: 'Marketing', summary: 'Download notes on marketing concepts and strategies.', filename: 'marketing.pdf' },
      { id: 'operations-management', title: 'Operations Management', summary: 'Download notes on production and operations.', filename: 'operations-management.pdf' },
      { id: 'financial-information-and-decisions', title: 'Financial Information and Decisions', summary: 'Download notes on business finance basics.', filename: 'financial-information-and-decisions.pdf' },
      { id: 'human-resource-management', title: 'Human Resource Management', summary: 'Download notes on people management.', filename: 'human-resource-management.pdf' },
    ],
    aLevelTopics: [
      { id: 'strategic-management', title: 'Strategic Management', summary: 'Download advanced strategic planning notes.', filename: 'strategic-management.pdf' },
      { id: 'external-strategic-influences', title: 'External Strategic Influences', summary: 'Download notes on external strategic factors.', filename: 'external-strategic-influences.pdf' },
      { id: 'internal-strategic-influences', title: 'Internal Strategic Influences', summary: 'Download notes on internal strategic factors.', filename: 'internal-strategic-influences.pdf' },
      { id: 'strategic-choice', title: 'Strategic Choice', summary: 'Download notes on strategic decision making.', filename: 'strategic-choice.pdf' },
      { id: 'strategy-implementation', title: 'Strategy Implementation', summary: 'Download notes on executing business strategies.', filename: 'strategy-implementation.pdf' },
    ],
    pastPapers: generatePastPapers('9609', [11, 12, 13, 21, 22, 23, 31, 32, 33]),
  },
];

function generatePastPapers(code: string, variants: number[]): PastPaper[] {
  const papers: PastPaper[] = [];
  const sessions: ('FM' | 'MJ' | 'ND')[] = ['FM', 'MJ', 'ND'];
  
  for (let year = 2016; year <= 2025; year++) {
    for (const session of sessions) {
      for (const variant of variants) {
        const paperNumber = Math.floor(variant / 10);
        const variantStr = variant.toString();
        
        papers.push({
          year,
          session,
          paperNumber,
          variant: variantStr,
          paperFilename: `${code}_${variantStr}_${session}${year}-paper.pdf`,
          markSchemeFilename: `${code}_${variantStr}_${session}${year}-ms.pdf`,
        });
      }
    }
  }
  
  return papers;
}