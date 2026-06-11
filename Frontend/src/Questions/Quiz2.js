export const quiz2 = [
  {
    id: 1,
    question: "Find the domain of the function h(x) = 1 / (x² + 2x - 15).",
    options: [
      "{x: x = 3 and x = -5}",
      "{x: x ≠ 3 and x = -5}",
      "{x: x ≠ 3 and x ≠ -5}",
      "{x: x = 3 and x ≠ 5}"
    ],
    answer: "{x: x ≠ 3 and x ≠ -5}",
    explanation: "The denominator factors to (x+5)(x-3). The function is undefined when the denominator is zero, so x cannot be 3 or -5."
  },
  {
    id: 2,
    question: "Compute the range of g(x) = x² - x - 2 for the domain w = {-1, 0, 3}.",
    options: ["{-2, 0, 4}", "{2, -1, 6}", "{1, 0, -4}", "{-2, 3, 6}"],
    answer: "{-2, 0, 4}",
    explanation: "Plugging in the domain values: g(-1)=0, g(0)=-2, and g(3)=4."
  },
  {
    id: 3,
    question: "Find the domain of f(x) = 1 / √(x² - 9).",
    options: ["x > 3", "x < -3", "|x| > 3", "|x| ≥ 3"],
    answer: "|x| > 3",
    explanation: "For the square root in the denominator, x² - 9 must be strictly greater than zero."
  },
  {
    id: 4,
    question: "Evaluate the limit: lim (x→3) [ (x² - 9) / (x - 3) ].",
    options: ["0", "3", "6", "Undefined"],
    answer: "6",
    explanation: "Factor (x²-9) into (x-3)(x+3). Cancel (x-3) and substitute x=3 into (x+3)."
  },
  {
    id: 5,
    question: "Evaluate the limit: lim (x→0) [ sin(5x) / x ].",
    options: ["1", "0", "5", "1/5"],
    answer: "5",
    explanation: "Using the standard limit lim (x→0) sin(ax)/x = a."
  },
  {
    id: 6,
    question: "Differentiate y = (2x² + 3) / (x + 1) with respect to x.",
    options: [
      "(2x² + 4x - 3) / (x + 1)²",
      "(2x² - 4x + 3) / (x + 1)²",
      "(4x) / (x + 1)²",
      "4x - 2"
    ],
    answer: "(2x² + 4x - 3) / (x + 1)²",
    explanation: "Apply the quotient rule: (v du/dx - u dv/dx) / v²."
  },
  {
    id: 7,
    question: "Find the derivative of y = sin(x² + 3x).",
    options: [
      "cos(x² + 3x)",
      "-(2x + 3)cos(x² + 3x)",
      "(2x + 3)cos(x² + 3x)",
      "(2x + 3)sin(x² + 3x)"
    ],
    answer: "(2x + 3)cos(x² + 3x)",
    explanation: "Apply the chain rule: derivative of sin(u) is cos(u) * du/dx."
  },
  {
    id: 8,
    question: "Find the derivative of y = sin x cos x.",
    options: ["cos²x - sin²x", "sin²x - cos²x", "cos²x + sin²x", "cos x - sin x"],
    answer: "cos²x - sin²x",
    explanation: "Apply the product rule: (sin x)(-sin x) + (cos x)(cos x), which equals cos²x - sin²x (or cos 2x)."
  },
  {
    id: 9,
    question: "Differentiate y = e^x ln x.",
    options: [
      "e^x / x",
      "e^x ln x + e^x / x",
      "e^x + 1/x",
      "e^x(ln x - 1/x)"
    ],
    answer: "e^x ln x + e^x / x",
    explanation: "Apply the product rule: (e^x)(ln x) + (e^x)(1/x)."
  },
  {
    id: 10,
    question: "Evaluate the integral: ∫ (4x³ - 3x² + 2x + 5) dx.",
    options: [
      "x⁴ - x³ + x² + 5x + C",
      "12x² - 6x + 2 + C",
      "4x⁴ - 3x³ + 2x² + 5x + C",
      "x⁴ - x³ + x² + C"
    ],
    answer: "x⁴ - x³ + x² + 5x + C",
    explanation: "Apply the power rule for integration term by term: ∫ xⁿ dx = xⁿ⁺¹/(n+1)."
  },
  {
    id: 11,
    question: "Evaluate ∫ sin(3x) dx.",
    options: [
      "3 cos(3x) + C",
      "-3 cos(3x) + C",
      "(1/3) cos(3x) + C",
      "-(1/3) cos(3x) + C"
    ],
    answer: "-(1/3) cos(3x) + C",
    explanation: "The integral of sin(ax) is -(1/a)cos(ax)."
  },
  {
    id: 12,
    question: "What is the derivative of a constant?",
    options: ["1", "The constant itself", "0", "Undefined"],
    answer: "0",
    explanation: "The rate of change of a constant value is always zero."
  },
  {
    id: 13,
    question: "Evaluate lim (x→∞) [ (2x + 3) / (5x - 1) ].",
    options: ["0", "2/5", "3/-1", "∞"],
    answer: "2/5",
    explanation: "For limits at infinity of rational functions, divide by the highest power of x."
  },
  {
    id: 14,
    question: "If f(x) = 3x + 2, find the inverse function f⁻¹(x).",
    options: ["(x - 2)/3", "3x - 2", "1/(3x + 2)", "(x + 2)/3"],
    answer: "(x - 2)/3",
    explanation: "Swap x and y, then solve for y: x = 3y + 2 => y = (x - 2)/3."
  },
  {
    id: 15,
    question: "Find the coordinates of the turning point for y = x² - 4x + 5.",
    options: ["(2, 1)", "(-2, 17)", "(4, 5)", "(0, 5)"],
    answer: "(2, 1)",
    explanation: "Set dy/dx = 2x - 4 = 0, so x=2. Plugging x=2 into y gives y=1."
  },
  {
    id: 16,
    question: "Evaluate ∫ e^(2x) dx.",
    options: ["e^(2x) + C", "2e^(2x) + C", "0.5e^(2x) + C", "e^x + C"],
    answer: "0.5e^(2x) + C",
    explanation: "The integral of e^(ax) is (1/a)e^(ax)."
  },
  {
    id: 17,
    question: "What is the derivative of tan x?",
    options: ["cot x", "sec x", "sec²x", "sin²x"],
    answer: "sec²x",
    explanation: "Standard trigonometric derivative: d/dx(tan x) = sec²x."
  },
  {
    id: 18,
    question: "Find the slope of the tangent to y = x³ at x = 2.",
    options: ["6", "8", "12", "4"],
    answer: "12",
    explanation: "dy/dx = 3x². At x=2, 3(2)² = 12."
  },
  {
    id: 19,
    question: "A function is continuous at x = a if:",
    options: [
      "f(a) exists",
      "lim (x→a) f(x) exists",
      "lim (x→a) f(x) = f(a)",
      "f'(a) exists"
    ],
    answer: "lim (x→a) f(x) = f(a)",
    explanation: "Continuity requires the limit to exist and equal the function value at that point."
  },
  {
    id: 20,
    question: "Evaluate ∫ (1/x) dx.",
    options: ["1", "ln|x| + C", "x⁻¹ + C", "-1/x² + C"],
    answer: "ln|x| + C",
    explanation: "The power rule fails for x⁻¹, and its integral is defined as the natural log."
  },
  {
    id: 21,
    question: "Evaluate lim (x→1) [ (x³ - 1) / (x - 1) ].",
    options: ["1", "2", "3", "0"],
    answer: "3",
    explanation: "Factor x³-1 into (x-1)(x²+x+1). Cancel (x-1) and evaluate 1²+1+1 = 3."
  },
  {
    id: 22,
    question: "Find dy/dx if x² + y² = 25.",
    options: ["-x/y", "x/y", "2x + 2y", "0"],
    answer: "-x/y",
    explanation: "Use implicit differentiation: 2x + 2y(dy/dx) = 0, so dy/dx = -2x/2y = -x/y."
  },
  {
    id: 23,
    question: "Integrate ∫ x sin x dx using integration by parts.",
    options: [
      "x cos x + sin x + C",
      "-x cos x + sin x + C",
      "x sin x - cos x + C",
      "-x sin x + cos x + C"
    ],
    answer: "-x cos x + sin x + C",
    explanation: "Use ∫u dv = uv - ∫v du. Let u=x, dv=sin x dx."
  },
  {
    id: 24,
    question: "Find the second derivative of y = x⁵.",
    options: ["5x⁴", "20x³", "60x²", "120x"],
    answer: "20x³",
    explanation: "First derivative is 5x⁴, second derivative is 20x³."
  },
  {
    id: 25,
    question: "The point where the second derivative is zero and changes sign is called:",
    options: ["Turning point", "Maximum", "Minimum", "Inflection point"],
    answer: "Inflection point",
    explanation: "Inflection points indicate a change in the concavity of a curve."
  },
  {
    id: 26,
    question: "Evaluate ∫₀² (3x²) dx.",
    options: ["4", "8", "12", "6"],
    answer: "8",
    explanation: "Integral is x³. Evaluating from 0 to 2: 2³ - 0³ = 8."
  },
  {
    id: 27,
    question: "Differentiate y = ln(cos x).",
    options: ["tan x", "-tan x", "1/cos x", "sin x"],
    answer: "-tan x",
    explanation: "dy/dx = (1/cos x) * (-sin x) = -tan x."
  },
  {
    id: 28,
    question: "Which of the following is an indeterminate form?",
    options: ["0/1", "1/0", "0/0", "∞/1"],
    answer: "0/0",
    explanation: "0/0 and ∞/∞ are primary indeterminate forms requiring L'Hopital's or factoring."
  },
  {
    id: 29,
    question: "Find the derivative of y = √(x).",
    options: ["1 / (2√x)", "2√x", "x^(1/2)", "1/x"],
    answer: "1 / (2√x)",
    explanation: "d/dx (x^1/2) = 1/2 x^(-1/2) = 1 / (2√x)."
  },
  {
    id: 30,
    question: "Find ∫ (2x + 1)⁵ dx.",
    options: [
      "((2x + 1)⁶ / 6) + C",
      "((2x + 1)⁶ / 12) + C",
      "5(2x + 1)⁴ + C",
      "(2x + 1)⁶ + C"
    ],
    answer: "((2x + 1)⁶ / 12) + C",
    explanation: "Use substitution u = 2x+1, so du = 2dx."
  },
  {
    id: 31,
    question: "Evaluate lim (x→0) [ (1 - cos x) / x ].",
    options: ["1", "0", "0.5", "Undefined"],
    answer: "0",
    explanation: "This is a standard trigonometric limit result."
  },
  {
    id: 32,
    question: "If f(x) is an even function, then f(-x) equals:",
    options: ["-f(x)", "f(x)", "1/f(x)", "0"],
    answer: "f(x)",
    explanation: "Even functions are symmetrical about the y-axis (e.g., x²)."
  },
  {
    id: 33,
    question: "Find the derivative of y = a^x.",
    options: ["a^x", "x a^(x-1)", "a^x ln a", "a^x / ln a"],
    answer: "a^x ln a",
    explanation: "General exponential derivative formula."
  },
  {
    id: 34,
    question: "Evaluate ∫ (x + 2) dx from x=1 to x=3.",
    options: ["8", "6", "10", "4"],
    answer: "8",
    explanation: "Integral is 0.5x² + 2x. Evaluating: (4.5+6) - (0.5+2) = 10.5 - 2.5 = 8."
  },
  {
    id: 35,
    question: "The derivative of sec x is:",
    options: ["sec²x", "sec x tan x", "tan²x", "csc x"],
    answer: "sec x tan x",
    explanation: "Standard derivative of the secant function."
  },
  {
    id: 36,
    question: "Find the gradient of y = 2x² - 5x at the point (1, -3).",
    options: ["-1", "4", "2", "-3"],
    answer: "-1",
    explanation: "dy/dx = 4x - 5. At x=1, 4(1) - 5 = -1."
  },
  {
    id: 37,
    question: "Evaluate ∫ tan x dx.",
    options: ["sec²x + C", "ln|sec x| + C", "ln|sin x| + C", "-sec²x + C"],
    answer: "ln|sec x| + C",
    explanation: "∫ tan x dx = ∫ (sin x / cos x) dx = -ln|cos x| + C = ln|sec x| + C."
  },
  {
    id: 38,
    question: "If y = x^x, find dy/dx using logarithmic differentiation.",
    options: ["x^x", "x^x (1 + ln x)", "x^x ln x", "x * x^(x-1)"],
    answer: "x^x (1 + ln x)",
    explanation: "ln y = x ln x. Diff: (1/y)dy/dx = ln x + 1."
  },
  {
    id: 39,
    question: "Integrate ∫ x e^x dx.",
    options: ["x e^x - e^x + C", "x e^x + e^x + C", "e^x + C", "0.5x² e^x + C"],
    answer: "x e^x - e^x + C",
    explanation: "Using integration by parts: u=x, dv=e^x dx."
  },
  {
    id: 40,
    question: "What is the domain of f(x) = ln(x - 2)?",
    options: ["x > 0", "x > 2", "x ≥ 2", "All real numbers"],
    answer: "x > 2",
    explanation: "The argument of a logarithm must be strictly positive."
  },
  {
    id: 41,
    question: "Evaluate lim (x→2) (x³ - 8) / (x² - 4).",
    options: ["2", "3", "4", "0"],
    answer: "3",
    explanation: "Factor: (x-2)(x²+2x+4) / (x-2)(x+2). Substitute x=2: (4+4+4)/(2+2) = 12/4 = 3."
  },
  {
    id: 42,
    question: "Find the derivative of y = 1/x³.",
    options: ["-3/x⁴", "3x²", "1/3x²", "-3/x²"],
    answer: "-3/x⁴",
    explanation: "y = x⁻³. dy/dx = -3x⁻⁴ = -3/x⁴."
  },
  {
    id: 43,
    question: "Find the area under y = x from x=0 to x=4.",
    options: ["4", "8", "16", "2"],
    answer: "8",
    explanation: "∫₀⁴ x dx = [0.5x²] from 0 to 4 = 0.5(16) = 8."
  },
  {
    id: 44,
    question: "What is the derivative of csc x?",
    options: ["-csc x cot x", "csc²x", "cot²x", "-csc²x"],
    answer: "-csc x cot x",
    explanation: "Standard derivative of the cosecant function."
  },
  {
    id: 45,
    question: "Evaluate ∫ (1 / √(1 - x²)) dx.",
    options: ["sin⁻¹x + C", "cos⁻¹x + C", "tan⁻¹x + C", "ln|1-x²| + C"],
    answer: "sin⁻¹x + C",
    explanation: "Standard integral resulting in the arcsine function."
  },
  {
    id: 46,
    question: "Find dy/dx for y = 2^x.",
    options: ["x 2^(x-1)", "2^x", "2^x ln 2", "2^x / ln 2"],
    answer: "2^x ln 2",
    explanation: "Derivative of exponential base 'a'."
  },
  {
    id: 47,
    question: "The integral of a derivative ∫ f'(x) dx is:",
    options: ["f(x) + C", "f'(x) + C", "f''(x) + C", "0"],
    answer: "f(x) + C",
    explanation: "Fundamental theorem of calculus (indefinite integral)."
  },
  {
    id: 48,
    question: "Evaluate lim (x→0) [ (e^x - 1) / x ].",
    options: ["0", "e", "1", "∞"],
    answer: "1",
    explanation: "Standard exponential limit."
  },
  {
    id: 49,
    question: "Find the horizontal asymptote of y = (3x² + 1) / (x² - 4).",
    options: ["y = 0", "y = 3", "y = -4", "No asymptote"],
    answer: "y = 3",
    explanation: "Divide leading coefficients since the degrees of numerator and denominator are equal."
  },
  {
    id: 50,
    question: "What is the integral of zero?",
    options: ["0", "1", "x", "Constant (C)"],
    answer: "Constant (C)",
    explanation: "The derivative of any constant is zero, so the integral of zero is a constant."
  }
];