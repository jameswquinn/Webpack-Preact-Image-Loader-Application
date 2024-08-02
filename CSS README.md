## CSS Documentation

The `ImageLoader` component uses a set of CSS classes to style the image and its various states. Here's a breakdown of the main classes and their purposes:

### CSS Variables

```css
:root {
  --primary-color: #3498db;
  --error-color: #e74c3c;
  --text-color: #333;
  --background-color: #f8f9fa;
  --border-radius: 8px;
  --transition-duration: 0.3s;
}
```

These variables can be customized to change the overall theme of the component.

### Main Classes

- `.image-loader-container`: The main container for the image loader.
- `.image-loader-img`: The image element itself.
- `.image-loader-placeholder`: The placeholder shown while the image is loading.
- `.image-loader-error`: The error message shown when image loading fails.
- `.image-loader-loading-spinner`: The loading spinner animation.

### Responsive Design

The component is responsive and adjusts its layout for smaller screens:

```css
@media (max-width: 600px) {
  .image-loader-container {
    max-width: 100%;
    border-radius: 0;
  }

  .image-loader-placeholder,
  .image-loader-error {
    height: 200px;
    font-size: 1rem;
  }
}
```

### Accessibility

The component includes focus styles for keyboard navigation:

```css
.image-loader-img:focus {
  outline: 3px solid var(--primary-color);
  outline-offset: 2px;
}
```

### Print Styles

Optimized styles for printed pages:

```css
@media print {
  .image-loader-container {
    box-shadow: none;
  }

  .image-loader-img {
    max-width: 100%;
    page-break-inside: avoid;
  }
}
```
