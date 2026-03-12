## 2024-03-24 - Inline apply mask loop
**Learning:** In Dart, moving a simple `switch` to determine mask logic outside of a tight 2D nested loop in `_applyMask` provides a ~35% performance gain by avoiding the per-pixel closure overhead of `_getMaskFunction`.
**Action:** When performing matrix masking operations, hoist invariant conditions like pattern indices outside of the tight loops to unswitch them, preferring direct logic over indirect function calls.
