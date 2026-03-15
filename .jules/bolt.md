## 2024-06-18 - Switch inlining and calculation improvements
**Learning:** In Dart 3, implicit fall-through is disabled by default. Replacing anonymous enum closures with an inline switch statement on integers significantly reduces execution overhead for hot loop operations like QR image masking.
**Action:** Use primitive integer switches inside loops to inline behavior rather than passing/calling functions.

## 2024-06-18 - Array index math optimization
**Learning:** In masking or pixel placement routines, precalculating operations or moving conditional logic (such as hoisting loop-invariants) improves execution speeds measurably in Dart.
**Action:** Use switch hoisting (loop unswitching) to remove per-iteration switch overhead during matrix masking iterations.
