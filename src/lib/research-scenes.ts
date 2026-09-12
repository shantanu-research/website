export interface ResearchScene {
  kind: 'ions' | 'pulse' | 'flow' | 'telemetry' | 'lunar' | 'pipeline' | 'quantum' | 'nozzle' | 'network' | 'flight' | 'math';
  title: string;
  caption: string;
  steps: [string, string][];
}

export const researchScenes: Record<string, ResearchScene> = {
  viot: {
    kind: 'ions', title: 'From a plasma to a surface.',
    caption: 'Positive beam ions are extracted through screen and accelerator grids; a charge-exchange ion is accelerated back to the downstream accelerator-grid face. Conceptual illustration; not simulation output.',
    steps: [
      ['Accelerate', 'Electric fields guide xenon ions through the grid aperture and into the beam.'],
      ['Exchange', 'A beam ion can exchange charge with a neutral xenon atom. The resulting slow CEX ion can be pulled back toward the negatively biased accelerator grid.'],
      ['Resolve the impact', 'CEX ions can sputter the accelerator-grid surface; the surface response connects impacts to coating loss and grid erosion.'],
    ],
  },
  methods: {
    kind: 'pipeline', title: 'Follow the physics across scales.',
    caption: 'Conceptual coupling between ion optics, charge exchange with neutral xenon, and material response.',
    steps: [
      ['Transport', 'Particle motion and the electric field evolve together in the plasma solver.'],
      ['Exchange and impact', 'DSMC represents neutral transport and charge exchange; molecular dynamics resolves an ion impact at the surface.'],
      ['Compare', 'Campaign runs bring the models together to compare materials and operating conditions.'],
    ],
  },
  data: {
    kind: 'ions', title: 'The impact behind the numbers.',
    caption: 'A conceptual CEX-ion impact sequence at the accelerator grid. The measured simulation results appear in the charts below.',
    steps: [
      ['Track', 'Follow charge-exchange ions that can be accelerated back toward the downstream accelerator-grid face.'],
      ['Count', 'Compare the atoms lost from the substrate and coating across campaign runs.'],
      ['Interpret', 'Read erosion alongside lifetime and field-emission risk; each tells a different part of the story.'],
    ],
  },
  'n2o-rcs-icaetm': {
    kind: 'pulse', title: 'Every pulse leaves a memory.',
    caption: 'Illustrative N₂O feed, catalytic decomposition, nozzle expansion, and pulse-to-pulse thermal memory; the timing and amplitude are schematic.',
    steps: [
      ['Open the valve', 'A brief propellant feed starts a new pulse through the catalyst bed.'],
      ['Decompose and expand', 'Catalytic decomposition raises chamber pressure; the products expand through the nozzle to generate thrust.'],
      ['Carry the heat', 'The bed retains heat between pulses, linking the next response to the previous one.'],
    ],
  },
  'turbulence-closure-icmai': {
    kind: 'flow', title: 'Where the flow stops behaving.',
    caption: 'Schematic attached boundary layer, separation, recirculation, and downstream reattachment over a hump; not a computed velocity field.',
    steps: [
      ['Approach', 'The incoming boundary layer encounters a changing surface and pressure gradient.'],
      ['Separate and reattach', 'A separated shear layer and downstream recirculation region create a demanding test for a learned turbulence closure.'],
      ['Generalize', 'Compare models on the held-out hump, then inspect which flow invariants shape their predictions.'],
    ],
  },
  'smart-ambulance-gateway': {
    kind: 'telemetry', title: 'Keep the vital signal moving.',
    caption: 'Conceptual device-to-gateway-to-hospital flow, using illustrative telemetry.',
    steps: [
      ['Discover', 'Identify a device from its BLE service profile and parse its readings.'],
      ['Prioritize', 'Normalize observations and keep alerts ahead of less urgent streams.'],
      ['Deliver', 'Buffer data when the connection drops and forward it when the link returns.'],
    ],
  },
  'qsim-studio': {
    kind: 'quantum', title: 'A state, transformed.',
    caption: 'An illustrative pure single-qubit state on a Bloch sphere. The state vector rotates on the sphere surface; this is not a running quantum computation.',
    steps: [
      ['Prepare', 'Start with a statevector and a circuit expressed through the simulator’s gate representation.'],
      ['Apply a gate', 'A single-qubit unitary changes the state; for a pure qubit this can be visualized as a rotation of the Bloch vector on the sphere surface.'],
      ['Measure', 'Read probabilities from amplitudes and compare the result with the expected circuit behavior.'],
    ],
  },
  'mmm-ansys-runner': {
    kind: 'nozzle', title: 'A high heat-flux region. A small margin.',
    caption: 'Schematic converging-diverging nozzle section and throat-region thermal loading; colors do not encode computed temperatures or stresses.',
    steps: [
      ['Constrict', 'Hot gas approaches the throat, where the insert faces concentrated thermal loading.'],
      ['Expand', 'Flow expands downstream while the material carries a nonuniform temperature field.'],
      ['Assess', 'Thermo-structural analysis examines how defects change the insert’s response.'],
    ],
  },
  profnet: {
    kind: 'network', title: 'Connections with context.',
    caption: 'Illustrative relationship map; no real contacts or personal data are shown.',
    steps: [
      ['Capture', 'Bring academic contacts and the context of each relationship together.'],
      ['Connect', 'Follow relationships between people, institutions, and research interests.'],
      ['Remember', 'Keep the history available locally when it is time to follow up.'],
    ],
  },
  'sih-ohrc-toolkit': {
    kind: 'lunar', title: 'Read the surface, one pass at a time.',
    caption: 'An illustrative orbital imaging pass over a lunar surface.',
    steps: [['Observe', 'Begin with the orbital imagery.'], ['Process', 'Extract structure from the image data.'], ['Inspect', 'Explore the processed surface and the features it reveals.']],
  },
  'aerospace-multiphysics-pipeline': {
    kind: 'pipeline', title: 'One model feeds the next.',
    caption: 'Conceptual data transfer through a multiphysics workflow.',
    steps: [['Define', 'Establish geometry and boundary conditions.'], ['Solve', 'Pass results between the coupled analysis stages.'], ['Evaluate', 'Bring the outputs together for engineering interpretation.']],
  },
  'cfd-learning-series': {
    kind: 'flow', title: 'Make the flow visible.',
    caption: 'Illustrative streamlines for exploring fluid behavior.',
    steps: [['Set up', 'Define the domain and its boundary conditions.'], ['Resolve', 'Follow the changing flow through the domain.'], ['Check', 'Compare the numerical result with the physical behavior you expect.']],
  },
  'sky-strike': {
    kind: 'flight', title: 'Follow the trajectory.',
    caption: 'A conceptual flight path, not a calculated trajectory.',
    steps: [['Launch', 'Establish the initial state.'], ['Propagate', 'Follow the vehicle through its flight path.'], ['Evaluate', 'Examine how the trajectory changes over time.']],
  },
  'manim-explainers': {
    kind: 'math', title: 'Let the mathematics move.',
    caption: 'An illustrative curve construction in the spirit of a mathematical explainer.',
    steps: [['Frame', 'Start with the axes and the question.'], ['Construct', 'Build the curve so its relationship becomes visible.'], ['Explain', 'Connect the geometric picture to the underlying idea.']],
  },
};
