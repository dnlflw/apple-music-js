## 2024-05-24 - Accessibility Retrofit for Legacy Components
**Learning:** Legacy components like `react-rangeslider` often swallow accessibility props.
**Action:** Use `findDOMNode` in `componentDidMount` to manually inject attributes like `aria-label` when the library doesn't support them, ensuring we don't break layout with wrapper divs.
