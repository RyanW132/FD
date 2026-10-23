# Local slopes, quadratic minima and first/second-order approximations

**SUPPLEMENTAL prerequisite bridge — author draft, awaiting independent review.** This explains the mathematical operations needed for hedge minimisation and bond sensitivity; it does not claim the slides already teach elementary calculus. All examples, exercises and answers are supplemental. Prerequisite: [numeric foundations](concept-numeric-foundations.md#numeric-outcomes). No statistics or exponential-function knowledge is needed for the core calculations below.

<a id="derivatives-outcomes"></a>
## Motivation and outcomes

A financial **derivative contract** and a mathematical **derivative** are different meanings of the same word. Here a derivative measures how an output changes when one input changes slightly. You should be able to:

1. Calculate an average slope, derive a quadratic's local slope, and state the input/output units.
2. Find and justify the minimum of an upward-opening quadratic, rather than assuming every zero slope is a minimum.
3. Compute first- and second-order changes around a stated starting point, distinguishing an approximation from an exact result.
4. Interpret bond duration/convexity as normalized sensitivities with a stated yield convention, without assuming every asset has positive convexity.

Readiness check: expand (x + δ)² as x² + 2xδ + δ². If unfamiliar, multiply (x + δ)(x + δ) term by term; this one identity drives much of the bridge.

<a id="derivatives-slope"></a>
## 1. Functions and average slopes

A **function** gives an output for each allowed input. The notation f(x) means “the output of function f at input x,” not f multiplied by x. A graph places input x horizontally and output f(x) vertically. For a change δ in the input (δ is a small Greek delta, a change amount), the output change is Δf = f(x + δ) − f(x). For δ ≠ 0, the **average slope** over that interval is Δf/δ: vertical change divided by horizontal change.

For the straight line f(x) = 3x + 2, increasing x from 1 to 1.1 changes f from 5 to 5.3. Average slope = 0.3/0.1 = 3. Every interval gives slope 3. The constant 2 shifts the height but not the slope. If f is measured in GBP and x in units, the slope is GBP/unit, not GBP.

For f(x) = x², expand the numerator:

    [f(x + δ) − f(x)]/δ
      = [(x² + 2xδ + δ²) − x²]/δ
      = 2x + δ, for δ ≠ 0.

At x = 2, an interval δ = 0.1 gives slope 4.1; δ = 0.01 gives 4.01; δ = −0.01 gives 3.99. As δ approaches zero from either side, these slopes approach 4. A **limit** is this approached value; it does not mean dividing by zero. The derivative f′(x), also written df/dx, is the limiting slope when it exists:

    f′(x) = limit as δ → 0 of [f(x + δ) − f(x)]/δ.

Thus for x², f′(x) = 2x. The prime is derivative notation, not a new variable. A curved graph's **tangent** is the straight line through the starting point with that local slope. Some functions have corners: f(x) = |x| (absolute value, distance from zero) has slope −1 to the left of zero and +1 to the right, so no derivative at zero. This bridge assumes smooth functions where its derivatives exist.

<a id="derivatives-rules"></a>
## 2. The small set of rules used here

For fixed numbers a, b, c, the difference quotient for f(x) = ax² + bx + c is a(2x + δ) + b; its limit is 2ax + b. This proves, rather than merely lists, the rules needed for these quadratics:

- A constant c has derivative 0: its difference is zero.
- A line bx has derivative b.
- Multiplying a function by a fixed number multiplies its slope by that number; adding functions adds their slopes, because output differences add.
- Differentiating a slope again measures how fast that slope changes. This **second derivative** is f″(x), also d²f/dx². For ax² + bx + c it is 2a, since the derivative of 2ax + b is 2a.

If the input has units U and output units V, first derivative has V/U and second derivative V/U². “Second derivative” is not the square of the first derivative. If an expression has several inputs but we vary only h while keeping others fixed, notation ∂f/∂h is a **partial derivative**: the same slope operation with the other inputs held constant. It is not permission to let estimated parameters change unnoticed while differentiating.

<a id="derivatives-minimum"></a>
## 3. Why a quadratic can have a minimum

Consider q(h) = a h² − 2b h + c, with a, b and c fixed and a > 0. The variable is h. Setting the slope q′(h) = 2a h − 2b to zero gives h* = b/a; the star means the selected optimal value. A zero derivative is only a **candidate** for an interior optimum. Here there is a stronger proof:

    q(h) = a(h − b/a)² + c − b²/a.

Expand the square to check: a h² − 2b h + b²/a + c − b²/a recovers q. Since a > 0 and the square is nonnegative, q(h) cannot go below c − b²/a. Equality occurs at h = b/a. This proves a global minimum for this unconstrained quadratic. Its second derivative 2a > 0 confirms that the slope increases as we cross the bottom. “Global” here means all real h for this particular formula, not all trading models.

**Worked example (supplemental).** q(h) = 4h² − 8h + 7, with h dimensionless and q in a chosen squared-value unit. Here a = 4, b = 4, c = 7. Slope = 8h − 8; zero slope gives h* = 1. Complete square: q(h) = 4(h − 1)² + 3, so q(1) = 3 is the minimum. Check q(0) = 7 and q(2) = 7. If h is restricted to 0 ≤ h ≤ 0.5, h = 1 is forbidden: slope stays negative on that interval, so the constrained minimum is at h = 0.5, with q = 4. Constraints must be checked separately.

Boundary cases: if a < 0, the same stationary point is a maximum, not a minimum. If a = 0, q is linear (or constant when b = 0); there is no division by a and no unique unconstrained quadratic minimum. A zero derivative alone can also be neither a minimum nor a maximum in other smooth functions. Outside this strictly positive quadratic case, inspect the function/constraints rather than reusing the conclusion blindly.

For the later hedge formula, a represents futures-change variance, b represents spot/futures covariance, c spot-change variance, and q hedged variance. The [statistics bridge](concept-statistical-foundations.md#statistics-hedge-variance) teaches those meanings and derives the formula; they are not required for the algebra above. Positive futures variance provides a > 0. Zero futures variance must be handled separately, not by dividing by zero.

<a id="derivatives-approximations"></a>
## 4. Predict a small move: slope first, curvature second

At a starting input x, first-order prediction uses the tangent:

    f(x + δ) ≈ f(x) + f′(x)δ,
    Δf ≈ f′(x)δ.

The approximation symbol ≈ matters. It uses the slope **at the starting point**, held fixed during the prediction. For a smooth function, a second-order prediction adds curvature:

    f(x + δ) ≈ f(x) + f′(x)δ + (1/2)f″(x)δ².

Why one half? For a quadratic f(x) = ax² + bx + c, direct expansion gives the exact change (2ax + b)δ + aδ². But f″ = 2a, so aδ² = (1/2)f″δ². For more general sufficiently smooth functions this is a local Taylor approximation, not an exact identity; additional higher-order change remains. We do not assert a numerical error bound without further derivative bounds. Shrinking a move supports the local interpretation but does not certify a chosen finite move is “small enough.”

**Worked example (supplemental).** f(x) = x², start x = 2, change δ = 0.1. Starting value = 4, slope = 4, curvature = 2. First-order change = 4 × 0.1 = 0.4, predicted value 4.4. Second-order correction = (1/2) × 2 × 0.1² = 0.01, predicted value 4.41. Exact value = 2.1² = 4.41: here second order is exact because the function is quadratic. For δ = −0.1, first-order change = −0.4 but curvature correction still +0.01; exact value 1.9² = 3.61. Squaring a negative move makes the curvature term's sign depend on curvature, not direction of the move.

<a id="derivatives-bond-interpretation"></a>
## 5. Reading duration and convexity without hiding conventions

Let B(y) denote a bond's price in GBP as a function of annual decimal yield y, with cash flows, dates and yield convention held fixed. Suppose B > 0 and define D = −B′/B and C = B″/B at the current y. D is the negative **normalized first derivative**, C the normalized second derivative (convexity). Dividing the change approximation by the starting B gives

    ΔB/B ≈ −D Δy + (1/2) C(Δy)².

This is simply substitution: B′/B = −D and B″/B = C. ΔB/B is the dimensionless relative price change, not the price itself; multiply by the starting B to get a currency change. With yield measured per year, D has years and C years², cancelling the per-year yield-change units. Conventionally annual rates are entered as decimal numbers; 1 percentage point is Δy = 0.01, not 1. For another compounding convention the appropriate derivative-based D and C must be recomputed; a named duration measure is not automatically interchangeable.

**Worked local sensitivity example (supplemental, supplied derivatives rather than a newly priced bond).** At B = £100, suppose B′ = −400 GBP·year and B″ = 1,800 GBP·year². Thus D = 4 years and C = 18 years². For Δy = +0.01/year, first-order relative change = −4 × 0.01 = −0.04. Second-order correction = (1/2) × 18 × 0.01² = 0.0009. Predicted relative change = −0.0391 = −3.91%; currency change ≈ −£3.91; price ≈ £96.09. If Δy = −0.01/year, predicted change is +0.0409 = +4.09%, price ≈ £104.09. These are local estimates, not independently calculated exact bond prices; the unspecified full pricing function prevents an exact-error claim.

For fixed positive future cash flows discounted at one continuously compounded yield, the lecture's model has B′ < 0 and B″ > 0. Its exponential differentiation is taught with the later bond lesson after the [powers/logs prerequisite](concept-exponents-and-logs.md#powers-outcomes); it is not needed to calculate the supplied sensitivities above. **Curvature is not positive for every asset**: negative cash-flow combinations or option-dependent cash flows can change the result. A first derivative below zero at one point is not a proof of global monotonicity, nor is a second-order approximation a guarantee of better accuracy for every finite shock. Multiple yield-curve movements or changing cash flows are outside this one-variable, fixed-input calculation.

<a id="derivatives-practice"></a>
## Supplemental graded practice

1. **Slope:** For f(x) = x² + 3x + 2 at x = 1, calculate f(1), f′(1), f″(1). Find the average slope from 1 to 1.1 and explain why it differs from the derivative.
2. **Minimum:** Minimise q(h) = 2h² − 6h + 8 over real h, proving it is a minimum with a completed square. What changes if q is multiplied by −1?
3. **Local change:** For question 1, predict f(1.1) to first and second order and compare with the exact value.
4. **Units:** With B = £200, D = 3 years, C = 12 years² and Δy = +0.005/year, find first- and second-order price estimates. Is the exact price known from those inputs?
5. **Teach-back:** Explain the difference between a derivative and a finite change, why “set slope to zero” needs a minimum check, and why positive convexity is model-dependent.

<a id="derivatives-answer-slope"></a>
### Answer 1 — local versus average

f(1) = 1 + 3 + 2 = 6. f′(x) = 2x + 3, so f′(1) = 5. f″ = 2. f(1.1) = 1.21 + 3.3 + 2 = 6.51; average slope = (6.51 − 6)/0.1 = 5.1. The derivative is the limiting slope at the start; the finite interval includes changing slope.

<a id="derivatives-answer-minimum"></a>
### Answer 2 — justified optimum

q′ = 4h − 6 gives h* = 1.5. Completing the square: q = 2(h − 1.5)² + 3.5, so the minimum is 3.5. Second derivative = 4 > 0. Multiplying q by −1 turns it into a downward-opening quadratic with a maximum of −3.5 at h = 1.5; it has no finite unconstrained minimum.

<a id="derivatives-answer-approximation"></a>
### Answer 3 — approximation versus equality

First order: 6 + 5 × 0.1 = 6.5. Second order: 6.5 + (1/2) × 2 × 0.1² = 6.51, equal to the exact quadratic result. First-order error in predicted value is −0.01; second-order exactness here does not generalise to every function.

<a id="derivatives-answer-units"></a>
### Answer 4 — price sensitivity

First-order relative change = −3 × 0.005 = −0.015, so price estimate = 200 × 0.985 = £197. Second-order correction = (1/2) × 12 × 0.005² = 0.00015, hence relative change −0.01485 and price estimate £197.03. The full pricing function is absent, so the exact price/error is unknown. Squared yield units cancel C's years².

<a id="derivatives-answer-teachback"></a>
### Answer 5 — diagnosis and retry

A derivative is a rate of change, not a currency change; multiply by the input move for a first-order prediction. Zero slope finds candidates, while curvature/completing the square/constraints establish which are minima. Bond convexity positivity uses fixed positive cash flows and the specified model; it is not universal. If off by 100, convert percentage points to decimals. If a negative input move produced a negative square, redo δ × δ. If you gave an exact bond price from D and C alone, replace “equals” by “approximately” and identify the missing pricing function.

<a id="derivatives-evidence"></a>
## Evidence motivation

- Lecture 2 physical p16, middle-lower derivative equation: [variance first-order condition](../../sources/annotated/lecture-2/page-016.md#lecture-2-p016-variance-first-order-condition), [original p16](../../sources/assets/lecture-2/page-016.png). The derivative is of the entire variance with respect to h; the supplemental completed-square proof supplies the minimum justification.
- Lecture 3 physical p32, middle differentiation: [price first derivative](../../sources/annotated/lecture-3/page-032.md#lecture-3-p032-price-first-derivative), [original p32](../../sources/assets/lecture-3/page-032.png). The slide's negative sign relies on its positive future cash-flow model, not every asset.
- Lecture 3 physical p38, middle boxed equation: [convexity approximation](../../sources/annotated/lecture-3/page-038.md#lecture-3-p038-convexity-approximation), [original p38](../../sources/assets/lecture-3/page-038.png). The original uses an approximation sign and coefficient 1/2; its C = 7.570 belongs to a separate source example and is not substituted into this bridge's supplemental example.

This is not a general calculus course, a proof of Taylor remainder bounds, or a replacement for the later financial model's assumptions and exponential derivative derivation.
