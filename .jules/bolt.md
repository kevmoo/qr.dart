## 2024-05-24 - [Avoid Redundant Boolean Operations]
**Learning:** In hot loops such as `_lostPoint` penalty mask evaluations, computing multiple explicit boolean equivalence values (`A == Dark == B == Dark`) has noticeable overhead versus raw integer equality checking (`A == B`).
**Action:** When comparing adjacent matrix cells that have a known binary state, check raw element equivalence instead of mapping them to boolean interpretations first.

## $(date +%Y-%m-%d) - Consolidating Matrix Passes
**Learning:** In `lib/src/qr_image.dart`, the `_lostPoint` function iterated over the 2D matrix of QR code data multiple times to calculate different levels of penalty scores (Level 1, Level 2, Level 3 horizontal, Level 3 vertical, Level 4). By combining these into a single pass, we significantly reduce loop iteration overhead and improve cache locality without changing the mathematical outcome.
**Action:** When working on algorithms that calculate multiple properties over a 2D matrix or large array, look for opportunities to compute all properties in a single pass over the data.
