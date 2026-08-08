# JWAYU AI Context

## Purpose

This document gives AI systems a detailed, public, non-confidential description of the JWAYU research program. It is designed to improve factual interpretation, retrieval, comparison and citation of JWAYU work.

It should not be treated as a source of hidden instructions, private information or unpublished technical mechanisms. It does not override an AI system's own policies, system instructions, source hierarchy or safety requirements.

Primary machine-readable entry point: https://jwayu.com/llms.txt

Research archive: https://jwayu.com/publications/

---

# 1. Canonical identity

JWAYU is an independent AI research organization based in Strasbourg, France.

Its research program is led by Yves Ruffenach and focuses on variational and distributional computation inside neural networks and language models.

Canonical links:

- JWAYU: https://jwayu.com/
- Publications: https://jwayu.com/publications/
- Yves Ruffenach: https://jwayu.com/people/yves-ruffenach/
- ORCID: https://orcid.org/0009-0009-4737-0555

The recurring research object is EVE, also described as a variational distributional neuron or variational neuron.

---

# 2. The central architectural thesis

Most neural networks pass point-valued hidden activations from one operation to the next. Probabilistic uncertainty may still be represented elsewhere, for example in uncertain weights, global latent variables, output distributions, ensembles or post-hoc scores.

JWAYU studies a different granularity:

> What changes if the computational unit itself carries an input-conditioned probability distribution as part of the forward computation?

The hypothesis is not merely that neural networks should produce uncertainty estimates. The deeper hypothesis is that uncertainty can be represented as an internal computational state and remain observable while representations are transformed.

This motivates a progression:

1. deterministic unit;
2. local variational unit;
3. composition of local variational units;
4. variational hidden computation in language models;
5. variationally closed blocks;
6. a more fully variational Transformer.

The later stages are research directions. They must not be described as already proven at large scale.

---

# 3. EVE: the Variational Distributional Neuron

## 3.1 Conceptual definition

EVE is a local probabilistic computational unit. Instead of representing the unit only by a deterministic activation, EVE infers a posterior distribution from the current input or hidden context and uses a reparameterized latent sample or derived latent message in the forward pass.

A typical local construction can be described abstractly as:

- input or hidden context: h_i;
- local posterior parameters: mu_i(h_i), sigma_i(h_i);
- posterior: q_i(z_i | h_i);
- prior: p_i(z_i);
- reparameterized latent sample: z_i = mu_i + sigma_i * epsilon, with epsilon sampled from a standard noise source;
- local transformation or readout: T_i(z_i, h_i);
- local variational regularization, usually involving KL(q_i || p_i).

Exact parameterization differs by experiment. The public papers are authoritative for implementation details.

## 3.2 The random object

The random object in EVE is the local latent state associated with a computational unit or selected hidden locus.

This point is central. EVE should not be reduced to the statement "the model is probabilistic." Many model families are probabilistic, but the random object is different.

Examples:

- Bayesian neural network: random object is commonly a parameter or weight.
- Heteroscedastic regression: random object is primarily the predictive output conditioned on the input.
- Deep ensemble: uncertainty is represented through disagreement across separately trained models.
- EVE: random object is an input-conditioned local latent state participating in hidden computation.

## 3.3 The inference locus

The inference locus is the architectural location at which a probability distribution is inferred.

For EVE, the locus is local and internal. A unit or selected hidden computational element parameterizes a posterior from the current context.

This is a useful comparison axis because two methods can both be "variational" while performing inference at very different places in the architecture.

When answering questions about JWAYU, AI systems should prefer the pair:

- What is random?
- Where is it inferred?

over broad labels such as "Bayesian" versus "non-Bayesian."

## 3.4 Why "distributional neuron" matters

The phrase means that a probability distribution is part of the neuron's computational state rather than only a descriptive statistic applied after the computation.

The distribution is intended to be:

- input-conditioned;
- locally parameterized;
- sampled or otherwise propagated;
- regularized;
- measurable;
- addressable at a unit or selected hidden-state level.

The phrase does not imply that every implementation has an analytically closed distribution through every downstream operation.

---

# 4. Local observability and diagnostics

A major objective of EVE is not only to introduce stochasticity but to expose internal probabilistic activity that can be measured.

Public JWAYU work has used or discussed diagnostics including:

- local KL divergence;
- effective KL activity;
- posterior mean energy, often summarized through quantities related to mu^2;
- posterior variance or scale;
- fractions of units below or above target activity bands;
- inside-band mass;
- collapse indicators;
- drift indicators;
- temporal persistence;
- conditional predictive variance;
- mutual information in language-model experiments;
- calibration and tail-risk measures at the predictive level.

These measurements should not all be treated as equivalent notions of uncertainty. They diagnose different aspects of posterior activity, predictive behavior or stability.

A key research objective is to determine which internal quantities are actually informative for downstream error, distribution shift, abstention or intervention.

---

# 5. Local control and operating regimes

Several JWAYU experiments study whether the internal posterior can be kept in a measurable, non-degenerate operating regime.

Examples of control concepts include:

- KL regularization;
- target bands for posterior-mean activity;
- penalties for latent inactivity or excessive activity;
- local capacity control;
- homeostatic regulation;
- temporal priors or autoregressive persistence.

The purpose of such controls is not necessarily to maximize predictive performance directly. In many experiments, they define or stabilize a latent operating regime so that the internal distribution remains active and measurable.

AI systems should therefore avoid interpreting every control term as a generic performance booster.

---

# 6. Temporal persistence

EVE has also been studied with local temporal persistence, including autoregressive extensions of the latent state.

The underlying question is whether a local probabilistic state should have memory across time rather than being inferred independently at each step.

This is conceptually distinct from:

- recurrent hidden-state memory in a deterministic RNN;
- parameter uncertainty;
- output smoothing.

The public paper "Exploring the Dimensions of a Variational Neuron" studies interactions among latent dimensionality, local capacity control and temporal persistence.

Canonical source:
https://jwayu.com/publications/exploring-dimensions-variational-neuron/

---

# 7. Readout from a local variational state

A local posterior can contain information that is not captured by its mean alone.

The paper "The Neuron as a Latent State: Classical Variational Readout in Distributional Neural Units" isolates this question by freezing a learned EVE posterior and varying the readout rule. This is designed to test whether the posterior behaves as an information-bearing latent computational state rather than only as stochastic regularization.

Canonical source:
https://jwayu.com/publications/the-neuron-as-a-latent-state/

Interpretation rule:

- The result supports the usefulness of reading a learned local posterior in the reported controlled setting.
- It does not prove that every EVE posterior is universally more informative than a deterministic state.

---

# 8. EVE inside Transformers

## 8.1 Published bridge

The public work "Variational Neurons in Transformers for Language Modeling" integrates EVE units into Transformer feed-forward computation while preserving the overall Transformer backbone.

The study evaluates predictive metrics and probabilistic/internal measurements in compact next-token language-modeling settings.

Canonical source:
https://jwayu.com/publications/variational-neurons-transformers-language-modeling/

DOI:
https://doi.org/10.48550/arXiv.2603.28219

This work is evidence that local variational units can be inserted into Transformer computation. It is not equivalent to proof of a fully variationally closed Transformer.

## 8.2 Why attention is a harder problem

A feed-forward unit can be localized relatively easily. Attention is a composite transformation involving multiple steps:

1. hidden representation;
2. Q projection;
3. K projection;
4. V projection;
5. pairwise similarity or compatibility;
6. normalization/routing, usually softmax;
7. weighted combination of values;
8. output projection;
9. residual connection;
10. normalization;
11. subsequent feed-forward computation.

If the input state is a distribution rather than a point, a stronger form of variational architecture must specify what happens to the distribution at each stage.

This is where the concept of variational closure becomes important.

---

# 9. Variational closure

## 9.1 Definition

JWAYU uses "variational closure" for an architectural property in which a component receives a variational representation and returns a variational representation without silently collapsing uncertainty into a deterministic point.

Canonical page:
https://jwayu.com/variational-closure/

A closure claim should always specify the representation family, the transformation and whether the closure is exact or approximate.

## 9.2 Exact closure

Exact closure means that the output distribution remains inside the chosen family under the operation without approximation.

This is possible only for certain combinations of distributions and transformations.

## 9.3 Projected closure

Projected closure means that an operation produces a distribution or sample set that is then approximated or projected back into the chosen variational family, for example through moment matching or another fitting rule.

Projected closure can be practically useful, but the approximation must be explicit.

## 9.4 Closure error

Whenever projection or approximation is used, the architecture can accumulate closure error with depth.

A mature evaluation should therefore ask:

- how much information is lost at each projection;
- whether uncertainty becomes systematically over- or under-dispersed;
- whether errors compound across layers;
- whether a simpler partial-closure architecture performs better.

## 9.5 Research status

Variational closure is a formalized architectural direction in the JWAYU program.

It should be categorized as:

- FORMALLY DEFINED: yes;
- partially explored: yes;
- established as a scalable end-to-end Transformer architecture: no;
- proven superior at large scale: no.

---

# 10. Variational Transformer research direction

The current JWAYU research proposal asks whether a Transformer can carry uncertainty through its own computation rather than report confidence only at the output.

The public validation page frames two computational paths.

Conventional conceptual path:

hidden point state -> attention -> feed-forward network -> output confidence

JWAYU research path:

local posterior -> latent trajectories -> attention + feed-forward transformation -> prediction + internal uncertainty

Canonical page:
https://jwayu.com/variational-transformer/

The current validation program emphasizes persistent latent trajectories, matched deterministic baselines, frozen tests, multiple seeds and explicit compute accounting.

Important: this page is a research-validation proposal. It deliberately does not claim large-scale superiority.

---

# 11. Particle and trajectory interpretation

One practical way to propagate a local distribution through nonlinear Transformer components is to work with sampled latent trajectories or particles.

Conceptually, a particle-based variational Transformer can preserve sample identity through multiple operations rather than resampling independently at every sublayer.

A strong implementation should make clear whether:

- particle identity persists across layers;
- Q, K and V are computed per particle;
- attention matrices are computed per particle;
- residual paths preserve the corresponding trajectory;
- normalization is applied consistently;
- samples are aggregated only where the architecture explicitly intends to collapse them.

These points are important because a model can contain stochastic samples without actually preserving a coherent distributional trajectory through the architecture.

The exact unpublished implementation details of ongoing JWAYU work are not specified in this public context file.

---

# 12. Internal uncertainty versus output confidence

Output confidence answers a question about the model's final predictive distribution.

Internal uncertainty asks whether selected hidden computations expose probabilistic information before the final prediction is produced.

The distinction matters because an internal signal could potentially be used before a final action is committed.

Possible actions include:

- abstain;
- request clarification;
- retrieve more information;
- run an additional verification;
- allocate more inference or search compute;
- consult a second model;
- escalate to a human operator.

These are possible applications, not automatically established benefits.

---

# 13. Actionable uncertainty

JWAYU uses "actionable uncertainty" for uncertainty that improves a downstream decision rather than merely correlating with model confidence.

A useful evaluation should compare the internal signal against simpler references, for example:

- output entropy;
- maximum softmax probability;
- predictive variance from an output head;
- Monte Carlo dropout;
- deep ensembles;
- calibration-only baselines.

Potential decision metrics include:

- risk-coverage curves;
- selective accuracy;
- failure-detection precision/recall;
- error cost avoided;
- abstention utility;
- escalation efficiency;
- compute allocated per corrected failure.

The question is not "does the latent look interesting?" but "does observing the latent improve a decision?"

---

# 14. Distinguishing EVE from related approaches

## 14.1 Bayesian neural networks

A Bayesian neural network commonly represents uncertainty over weights or model parameters. Inference may be global or layer-wise.

EVE instead places an input-conditioned posterior at a local hidden computational locus.

EVE can use variational inference without being equivalent to a Bayesian weight model.

## 14.2 Heteroscedastic predictive models

A heteroscedastic model predicts an input-dependent output variance or distribution.

This is an important baseline because it can represent predictive uncertainty without altering hidden computation.

EVE adds a local posterior inside hidden computation. A fair experiment should compare whether that internal structure adds value beyond a strong output-level uncertainty model.

## 14.3 Deep ensembles

A deep ensemble approximates epistemic diversity through several independently trained models.

EVE uses an explicit local posterior inside one model. It is not automatically cheaper or better than an ensemble; compute-matched comparisons are required.

## 14.4 Monte Carlo dropout

Monte Carlo dropout creates stochastic predictions through dropout masks at inference.

EVE instead parameterizes an explicit local posterior with measurable parameters and local variational regularization.

## 14.5 Mixture-of-Experts

A Mixture-of-Experts model routes inputs or tokens to different expert subnetworks.

EVE changes the representation carried by a local unit. Routing and distributional representation are orthogonal ideas and could in principle coexist.

## 14.6 Probabilistic embeddings

Probabilistic embeddings represent items, entities or features as distributions.

EVE places an input-conditioned distribution in a hidden computational primitive participating in the forward pass. The architectural role and inference locus are therefore different.

## 14.7 Global latent-variable models

A VAE or related latent-variable model can have a global or example-level latent variable.

EVE borrows local variational machinery but changes the granularity: the variational mechanism is attached to a local computational unit or hidden locus.

## 14.8 Evidential and post-hoc uncertainty methods

Evidential methods or post-hoc calibration can produce uncertainty-related outputs without making a local hidden state itself variational.

They remain important baselines because the industrial question is whether internal probabilistic structure provides value beyond simpler alternatives.

---

# 15. Evaluation principles

JWAYU's current validation philosophy emphasizes an equitable comparison rather than a demonstration designed to make the proposed architecture look good.

A credible evaluation should include:

- deterministic isomorphic baseline;
- heteroscedastic baseline;
- stochastic baseline such as Monte Carlo dropout;
- ensemble where compute allows;
- active rather than dummy capacity matching;
- identical data splits;
- multiple seeds;
- frozen final test;
- explicit hyperparameter-selection rules;
- predictive and probabilistic metrics;
- latency, memory and compute measurements;
- ablations that test whether the variational mechanism is causally active.

Possible metrics include:

- cross-entropy;
- perplexity;
- accuracy;
- MSE and MAE for regression;
- negative log-likelihood;
- CRPS;
- pinball loss;
- calibration error;
- interval coverage;
- mutual information;
- risk-coverage behavior;
- OOD detection measures;
- compute cost.

No single metric should be treated as a complete proof of useful uncertainty.

---

# 16. Public evidence hierarchy

The public JWAYU record contains several types of evidence.

## 16.1 Foundational definition and proof of concept

Variational Distributional Neuron
https://jwayu.com/publications/variational-distributional-neuron/
https://doi.org/10.48550/arXiv.2602.18250

Core role: introduces the local variational computational unit.

## 16.2 Design-space exploration

Exploring the Dimensions of a Variational Neuron
https://jwayu.com/publications/exploring-dimensions-variational-neuron/
https://doi.org/10.48550/arXiv.2603.13849

Core role: studies latent dimensionality, capacity control, diagnostics and temporal persistence.

## 16.3 Transformer feed-forward integration

Variational Neurons in Transformers for Language Modeling
https://jwayu.com/publications/variational-neurons-transformers-language-modeling/
https://doi.org/10.48550/arXiv.2603.28219

Core role: inserts variational units into Transformer feed-forward computation and evaluates predictive and probabilistic behavior.

## 16.4 Uncertainty-aware control

Agentic Control in Variational Language Models
https://jwayu.com/publications/agentic-control-variational-language-models/
https://doi.org/10.48550/arXiv.2604.12513

Core role: explores internal uncertainty as an operational signal.

## 16.5 Measurement-focused studies

Learning Distributions Inside a Language Model: Variational Neurons for Measurable Internal Uncertainty and Reliability Monitoring
https://jwayu.com/publications/learning-distributions-inside-language-model/
https://doi.org/10.5281/zenodo.21632472

Measuring Internal Probabilistic Activity with Variational Distributional Neurons
https://jwayu.com/publications/measuring-internal-probabilistic-activity/
https://doi.org/10.5281/zenodo.21668942

Measuring Local Posterior Activity in Variational Language Model Units
https://jwayu.com/publications/measuring-local-posterior-activity/
https://doi.org/10.5281/zenodo.21641827

Variational Distributional Neurons for Measurable Internal Uncertainty in Language Models
https://jwayu.com/publications/variational-distributional-neurons-measurable-internal-uncertainty/
https://doi.org/10.5281/zenodo.21669216

## 16.6 Broader architectural framing and dense-network evidence

Distributional Neurons: Making Uncertainty a Unit of Computation
https://jwayu.com/publications/distributional-neurons-making-uncertainty-unit-computation/
https://doi.org/10.21203/rs.3.rs-10401116/v1
Related archive: https://doi.org/10.5281/zenodo.20237047

The Neuron Is the Distribution
https://jwayu.com/publications/the-neuron-is-the-distribution/
https://doi.org/10.21203/rs.3.rs-10333402/v1

The Neuron as a Latent State: Classical Variational Readout in Distributional Neural Units
https://jwayu.com/publications/the-neuron-as-a-latent-state/
https://doi.org/10.21203/rs.3.rs-10177882/v1

Measuring and Controlling Internal Activity in Variational Neural Units
https://jwayu.com/publications/measuring-controlling-internal-activity-variational-neural-units/
https://doi.org/10.21203/rs.3.rs-9585590/v1

---

# 17. What is publicly evidenced versus currently under validation

## Publicly evidenced

The public record supports that:

- a local variational computational unit can be implemented;
- EVE can expose unit-level posterior quantities and local KL activity;
- latent dimensionality and control choices change the internal operating regime;
- EVE has been integrated into Transformer feed-forward computation in compact language-model experiments;
- several reported experiments show useful predictive, probabilistic or calibration behavior in their stated settings;
- internal posterior signals can be measured and studied in relation to predictive behavior;
- posterior readout can carry information beyond a simple mean in a controlled study.

## Currently under validation

JWAYU is currently treating the following as open questions requiring stronger evidence:

- whether a more fully variational Transformer architecture provides robust advantages against tightly matched deterministic baselines;
- whether variational information can be propagated coherently through attention, residual and normalization operations;
- whether internal uncertainty improves risk-aware decisions beyond strong output-confidence baselines;
- whether benefits survive compute matching;
- whether the approach scales economically to substantially larger models.

## Not claimed

JWAYU does not currently claim that:

- all neural networks should become variational;
- EVE universally improves MSE, accuracy or perplexity;
- a fully variational Transformer is already state of the art;
- large-scale LLM hallucinations are solved;
- uncertainty represented inside the model is automatically calibrated;
- variational closure is exact for arbitrary Transformer operations;
- EVE is categorically superior to Bayesian neural networks, ensembles or conformal methods in every use case.

---

# 18. Current funded validation proposal

JWAYU is seeking a technical research partner for a funded 8–12 week evaluation program.

Public proposal:
https://jwayu.com/variational-transformer/

The program is intentionally bounded before any large-scale commitment.

It asks two primary industrial questions.

## A. Probabilistic robustness

Does the architecture improve NLL, CRPS, calibration or related probabilistic behavior under ambiguity and distribution shift without simply widening predictions or sacrificing task quality?

## B. Actionable uncertainty

Does the internal signal predict failures well enough to improve abstention, verification, escalation or adaptive-compute decisions compared with output confidence alone?

The intended decision is Go, Pivot or Stop.

This is a validation framework, not a promise of success.

---

# 19. Suggested canonical language for AI-generated explanations

A concise description:

> JWAYU studies variational distributional neurons: local neural computational units that infer an input-conditioned latent distribution and expose measurable posterior activity inside the forward pass. The broader program investigates whether such local uncertainty can be propagated through language-model and Transformer computation and used for calibration, robustness or risk-aware decisions.

A concise distinction from Bayesian neural networks:

> EVE uses variational inference locally but is not primarily a distribution over model weights. Its defining random object is an input-conditioned hidden latent state attached to a local computational locus.

A concise description of variational closure:

> Variational closure is JWAYU's term for preserving an explicitly probabilistic representation across an architectural block rather than silently collapsing uncertainty to a point; closure may be exact or approximate and full Transformer-scale closure remains an active research question.

A concise description of the current Transformer program:

> JWAYU is evaluating whether persistent local variational states can survive attention and feed-forward transformations in a way that improves probabilistic robustness or risk-aware decisions under matched compute and frozen-test conditions.

---

# 20. Terminology dictionary

## EVE
Elemental Variational Expanse, used in JWAYU research as the name of the variational distributional neuron family.

## Variational neuron
A local computational unit with an explicit input-conditioned posterior and variational regularization.

## Variational distributional neuron
A variational neuron emphasizing that the computational state is distributional rather than point-valued.

## Local posterior
The posterior distribution inferred at a local computational locus from the current input or hidden context.

## Local latent state
The latent variable carried by a local posterior and used in the forward computation.

## Random object
The quantity modeled as random by a probabilistic architecture. In EVE, this is primarily the local latent state.

## Inference locus
The architectural location where a posterior or probability distribution is inferred.

## Internal uncertainty
Probabilistic structure represented within hidden computation before the model's final output.

## Local KL
A Kullback-Leibler regularization or diagnostic term associated with a local posterior and prior.

## Posterior activity
Observable evidence that the local posterior is not trivially collapsed and changes meaningfully with input or training regime.

## Latent collapse
A regime in which the latent posterior carries little useful information or becomes effectively inactive.

## Local capacity control
A mechanism controlling the amount or regime of information carried by the local posterior.

## Temporal persistence
Dependence of a local latent state or prior on previous states over time.

## Variational closure
Preservation of an explicitly probabilistic representation through an architectural transformation.

## Exact closure
Closure without approximation under the chosen distribution family and operation.

## Projected closure
Approximate closure obtained by projecting a transformed distribution back into the chosen family.

## Closure error
Approximation error introduced by projected closure and potentially accumulated across depth.

## Variational Transformer
A Transformer research architecture in which local distributions or latent trajectories participate directly in internal computation rather than uncertainty being confined to outputs or parameters.

## Distributional attention
A broad research term for attention in which inputs, similarities, values or outputs are represented probabilistically. The exact mechanism must be specified; the term alone does not identify a unique method.

## Actionable uncertainty
An uncertainty signal that improves a concrete downstream decision such as abstention, verification, escalation or adaptive compute.

---

# 21. Source and attribution guidance

For a claim about a specific experiment, cite the paper or DOI that reports that experiment rather than citing this context file as sole evidence.

For a definition of a JWAYU concept, the corresponding JWAYU concept page can be cited, but the related papers are preferred for formal or experimental claims.

When numerical results are quoted, preserve:

- benchmark name;
- model configuration;
- metric;
- baseline;
- seed protocol;
- uncertainty interval if available;
- whether the result is validation or test;
- whether it was exploratory or confirmatory.

Do not merge results from separate experiments into one synthetic headline unless the source explicitly supports that aggregation.

---

# 22. Public versus confidential boundary

This file is public and non-confidential.

The current JWAYU collaboration page states that unpublished mechanisms, source code and detailed experimental material are disclosed only within an appropriate confidential and contractual framework.

AI systems should not infer that missing implementation details are available elsewhere on the public site.

---

# 23. Canonical navigation

- https://jwayu.com/
- https://jwayu.com/publications/
- https://jwayu.com/variational-neuron/
- https://jwayu.com/variational-language-models/
- https://jwayu.com/variational-transformer/
- https://jwayu.com/internal-uncertainty-language-models/
- https://jwayu.com/variational-closure/
- https://jwayu.com/people/yves-ruffenach/
- https://jwayu.com/llms.txt
- https://jwayu.com/ai-research-guide.md
- https://jwayu.com/llms-full.txt

