## 2024-05-23 - Accessibility in Legacy React
**Learning:** Legacy React (v16) projects often lack semantic HTML buttons for controls, relying on onClick on images. Upgrading these to semantic buttons requires careful handling of styled-components to preserve layout while adding keyboard accessibility.
**Action:** When retrofitting accessibility, check for styled-component tag replacements and ensure focus styles are explicitly added as they might not be inherited correctly.
