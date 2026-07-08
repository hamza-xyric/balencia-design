### Mapping: Findings to Batches

| Finding ID | Severity | Primary Batch | Secondary Batch (Risk / Waiver) |
| :--- | :--- | :--- | :--- |
| **A24-001** | High | R11 | R0 |
| **A24-002** | High | R2 | - |
| **A24-003** | High | R4 | - |
| **A24-004** | High | R5 | R9 |
| **A24-005** | High | R7->R6 | - |
| **A24-006** | High | R7->R6 | - |
| **A24-007** | Medium | R7->R6 | - |
| **A24-008** | Medium | R1 | - |
| **A24-009** | Medium | R10 | - |
| **A24-010** | Medium | R3 | - |
| **A24-011** | Medium | R8 | - |
| **A24-012** | Medium | R7->R6 | - |
| **A24-013** | Medium | R7->R6 | - |
| **A24-014** | Medium | R7->R6 | - |
| **A24-015** | Medium | R10 | R11 |
| **A24-016** | Medium | R9 | - |
| **A24-017** | Low | R4 | - |
| **A24-018** | Low | R10 | - |
| **S-01** | High-adj | R4 | - |
| **S-02** | Medium | R4 | - |
| **S-03** | Medium | R3 | - |
| **S-04** | Medium | R4 | - |
| **S-05** | Low | R7->R6 | - |
| **S-06** | Medium | RQ | - |
| **S-07** | Medium | R4 | - |
| **S-08** | Low | R7->R6 | - |

### Mapping: Screens by Shared Remediation Pattern

| Shared Pattern | Batch(es) | Target Screens / Components |
| :--- | :--- | :--- |
| **Backend/Compliance Dependency Mapping** | R7->R6 | 03e, 10, 11, 20, 29, 30, 31, 51, 57, 61, 72, 78, 79, 84, 86, 98, 99 |
| **Design System & Semantics Re-alignment** | R2, R4, R10 | `kit/chrome.tsx`, Global Copy/Tokens |
| **Visual/Interactive Honesty & States** | R4, R8 | S20, S60, S68, S72 |
| **Accessibility / Target / Role / Truncation** | R3 | 03c, 04, 40, 57, 61, 80 (+15 undisclosed touch-target screens) |
| **Evidence / Catalog / Asset Consistency** | R5, R9, R10, R11 | 38 placeholder slots, ~14 gated screens |

### Flags & Risk Assessment

*   **No Clean Batch Home:** None. All findings map cleanly to the provided skeleton.
*   **Double-Coverage Risk:** 
    *   **R10 vs R11:** A24-015 (Figma Evidence) spans both. R10 handles the active regeneration/fixes, while R11 handles the final certification.
    *   **R4 vs R10:** Color drift is technically split. R4 covers semantic purple reclassification and copy fixes, while R10 covers the raw token mapping updates.
*   **Empty Batches:** None. Every batch in the skeleton has mapped workload.