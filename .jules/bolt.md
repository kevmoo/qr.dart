## 2024-05-24 - [Avoid Redundant Boolean Operations]
**Learning:** In hot loops such as `_lostPoint` penalty mask evaluations, computing multiple explicit boolean equivalence values (`A == Dark == B == Dark`) has noticeable overhead versus raw integer equality checking (`A == B`).
**Action:** When comparing adjacent matrix cells that have a known binary state, check raw element equivalence instead of mapping them to boolean interpretations first.
