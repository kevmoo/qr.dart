## 2024-05-24 - Hoisting matrix switch conditionals and flattening traversals
**Learning:** In hot 2D matrix operations like `_applyMask`, relying on complex geometric traversals (like zig-zag loops) and evaluating invariant conditionals (`switch(mpIndex)`) per pixel adds massive overhead.
**Action:** Unswitch loops by hoisting the conditional outside the loop, and use flattened linear traversals where the specific traversal order isn't strictly necessary.
