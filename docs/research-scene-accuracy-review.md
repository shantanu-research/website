# Research scene plausibility review

Scope: the animated concept diagrams in `src/components/ResearchScene.astro` and their copy in `src/lib/research-scenes.ts`. These are intentionally schematic. The goal here is to avoid an animation that implies a wrong physical mechanism, not to turn it into simulation output.

## Overall finding

The selected mechanisms are appropriate for the project pages. The captions already make the important distinction that the scenes are conceptual. Four small presentation corrections would make the physics materially clearer; the other reviewed scenes can stay as they are.

## VIOT — gridded-ion optics and CEX

**Assessment: physically plausible, with one labeling/geometry correction.** A gridded ion thruster accelerates beam ions through ion optics, and charge-exchange ions formed between or downstream of the optics can strike and erode the grids. NASA's small-spacecraft propulsion report states this explicitly, and the JPL electric-propulsion text treats the grid gap plus accelerator-grid thickness as the relevant path for NSTAR barrel erosion. [NASA Small Spacecraft Technology State of the Art](https://www.nasa.gov/smallsat-institute/sst-soa/in-space_propulsion/) · [JPL, *Fundamentals of Electric Propulsion*](https://descanso.jpl.nasa.gov/SciTechBook/series4/Electric_Propulsion_2nd_edition.pdf)

The scene correctly shows fast ions travelling outward, a slow CEX ion curving back to the accelerator-grid wall, and sputtered material leaving that impact. The animated CEX path ending on the lower accelerator-grid segment is a reasonable conceptual representation.

**Correction needed:** label the two grid planes separately as `SCREEN GRID` and `ACCELERATOR GRID`, or label the return-impact target `ACCELERATOR-GRID WALL`. The current single `GRID` label leaves the key erosion mechanism ambiguous. Move `SURFACE IMPACT` to the end of the orange return path (near x=318, y=250), since it currently sits below the scene and visually competes with the sputtered-particle source.

**Do not change:** CEX ions need not be shown moving at beam-ion speed. Their being born slow and then directed by the optics field is the right visual story.

## N2O pulsed catalyst thruster

**Assessment: physically plausible.** Catalytic nitrous-oxide monopropellant thrusters are real experimental systems, including pulsed tests. N2O decomposition is exothermic, producing mainly nitrogen and oxygen; a catalyst reduces the activation temperature, and hot decomposition gas expands through a nozzle. [JATM experimental pulsed-thruster paper](https://jatm.com.br/jatm/article/view/382) · [Acta Astronautica catalyst-bed study](https://doi.org/10.1016/j.actaastro.2020.12.016)

The valve → catalyst bed → chamber/nozzle order, delayed thrust trace, and residual-bed-heat idea are all reasonable. Published N2O work explicitly treats startup, steady firing, shutdown, preheating, and catalyst behavior as important transient concerns. [N2O thruster-operation model](https://doi.org/10.1016/j.ast.2007.08.003)

**Correction needed:** rename the graphic's upstream-to-downstream labels to distinguish the catalyst bed from the chamber, for example `N2O FEED` → `CATALYST BED / CHAMBER` → `NOZZLE EXPANSION`. As drawn, `THROAT` is correctly placed at the smallest area, but the catalyst bed has no visual label and can read as part of an empty feed line. Optionally add a tiny `heat retained` label beside the bed; do not imply that the displayed trace is a measured thrust curve.

## NASA hump — RANS closure and separated flow

**Assessment: plausible, with one orientation cue needed.** The NASA wall-mounted hump benchmark accelerates the incoming boundary layer over the forward hump and separates on the aft side under an adverse pressure gradient; the separation bubble then reattaches downstream. NASA documents it as a validation case for smooth-body separation and recovery. [NASA Turbulence Modeling Resource](https://tmbwg.github.io/turbmodels/nasahump_val.html) · [NASA LES study](https://ntrs.nasa.gov/api/citations/20170000736/downloads/20170000736.pdf)

The scene's hump, forward streamlines, and downstream recirculation placement match that broad sequence.

**Correction needed:** put a directional arrowhead on the orange recirculation loop, pointing upstream along the near-wall leg, and label the zone `RECIRCULATION BUBBLE`. Without an arrow, the orange curve can be read as a second forward streamline. Keep the bubble downstream of the crest, rather than centered on the crest; this is already nearly true in the current drawing.

## QSim Studio — Bloch sphere

**Assessment: concept is right; the animated trajectory needs to match the stated rotation.** For an isolated pure qubit, the Bloch vector lies on the unit sphere; `|0⟩` and `|1⟩` are the north and south poles. Single-qubit gates can be represented as rotations of that vector, while a computational-basis measurement returns 0 or 1 probabilistically according to the state overlaps. [IBM Quantum: Bloch sphere](https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information/density-matrices/bloch-sphere) · [IBM Quantum: measurement](https://quantum.cloud.ibm.com/docs/en/guides/measure-qubits)

The north/south labels and unit-vector idea are sound.

**Correction needed:** animate the vector tip along the same displayed great-circle/equatorial guide, or replace the guide with the circular arc actually traced by the rotating SVG group. At present the vector rotates in the 2D screen plane while the orange particle travels the projected equator, so the two moving elements imply different state paths. Name one operation such as `R_y(θ)` (meridian) or `R_z(φ)` (equator) to make the intended rotation unambiguous. If the page continues from rotation to measurement, show `P(0)` and `P(1)` as probabilities, not as a deterministic state flip.

## Nozzle throat insert

**Assessment: physically plausible.** A convergent-divergent nozzle reaches its minimum area at the throat. Under choked conditions the throat Mach number is one; downstream expansion can increase velocity while static pressure and temperature fall. NASA's nozzle explanation supports this geometry and flow direction. [NASA Glenn: Nozzle design](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/nozzle-design/) · [NASA Glenn: Rocket thrust](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/rocket-thrust/)

It is also defensible to focus thermal concern at the throat: NASA material on rocket-throat liners describes especially high throat heat flux and thermally driven cyclic strain. [NASA NTRS throat-liner report](https://ntrs.nasa.gov/api/citations/19750021165/downloads/19750021165.pdf)

**Correction needed:** change `The hottest point` to `Highest heat-flux region` or soften it to `A high heat-flux region`. The throat is commonly the thermal-design hotspot, but a bare claim about the maximum material temperature is stronger than this schematic can support; wall temperature depends on cooling, material, and operating condition. Keep the existing disclaimer that the colors are not computed temperatures.

## Suggested implementation priority

1. Make the Bloch-vector motion and named gate agree.
2. Label the VIOT accelerator-grid impact and align its impact text.
3. Add the aft-hump recirculation direction arrow.
4. Clarify catalyst-bed/chamber labeling and replace the nozzle temperature superlative.
