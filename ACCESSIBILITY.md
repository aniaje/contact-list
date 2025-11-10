# Accessibility (A11y)

## Overview

This app follows **WCAG 2.1 Level AA** standards.

## Key Features

### Keyboard Navigation

- **Tab**: Navigate between elements
- **Enter/Space**: Activate buttons and select contacts
- **Shift + Tab**: Navigate backwards
- All interactive elements are keyboard accessible

### Screen Reader Support

- Contact cards announce name, job, and selection state
- Live regions announce selection count changes
- Loading and error states are announced
- Decorative icons hidden with `aria-hidden="true"`

### Implementation

**ContactCard**

```tsx
<div
    role="button"
    tabIndex={0}
    aria-pressed={isSelected}
    aria-label="John Doe, React Engineer. Selected. Press to deselect."
    onKeyDown={handleKeyDown}
/>
```

**ActionButton**

```tsx
<button aria-busy={isLoading} disabled={isLoading} />
```

**Live Regions**

```tsx
<span aria-live="polite">Selected contacts: {count}</span>
<div role="alert" aria-live="assertive">Error message</div>
```

## Testing

**Keyboard**: Navigate with Tab, activate with Enter/Space
**Screen Reader**: Test with VoiceOver (Mac), NVDA (Windows)
**Automated**: Run `yarn test` and `yarn lint`

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility](https://react.dev/learn/accessibility)
