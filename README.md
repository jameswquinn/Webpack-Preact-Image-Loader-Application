# ImageLoader Preact Component

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Reference](#api-reference)
6. [Configuration](#configuration)
7. [Architecture](#architecture)
8. [Performance Considerations](#performance-considerations)
9. [Accessibility](#accessibility)
10. [Browser Support](#browser-support)
11. [Testing](#testing)
12. [Contributing](#contributing)
13. [Troubleshooting](#troubleshooting)
14. [Changelog](#changelog)
15. [License](#license)

## Introduction

The ImageLoader Preact Component is a sophisticated, high-performance solution for loading images in Preact applications. It's designed to provide an optimal user experience by implementing progressive loading, responsive images, and various optimizations for different network conditions and device capabilities.

This component addresses common challenges in image loading, such as:
- Slow initial page load due to large images
- Poor performance on slow networks or low-end devices
- Lack of support for modern image formats across different browsers
- Accessibility issues related to images

By using this component, developers can significantly improve the performance and user experience of their Preact applications, especially in image-heavy scenarios.

## Features

- **Progressive Image Loading**: Implements a blur-up technique for smooth transitions from low to high resolution.
- **Responsive Images**: Supports `srcset` and `sizes` attributes for serving appropriate image sizes.
- **WebP Support**: Automatically uses WebP images with fallbacks for unsupported browsers.
- **Lazy Loading**: Utilizes Intersection Observer API (with polyfill) for efficient lazy loading.
- **Low Bandwidth Optimization**: Serves lower resolution images on slow connections.
- **Error Handling**: Implements a retry mechanism with configurable attempts and delay.
- **Accessibility**: Ensures proper ARIA attributes and alt text for screen readers.
- **Print-Friendly**: Includes optimized styles for printed pages.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/image-loader-preact-app.git
   ```

2. Navigate to the project directory:
   ```
   cd image-loader-preact-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. (Optional) If you're integrating this into an existing project, you can copy the `ImageLoader` component and its associated styles:
   ```
   cp src/components/ImageLoader.js path/to/your/components/
   cp src/styles/ImageLoader.css path/to/your/styles/
   ```

## Usage

Here's a basic example of how to use the ImageLoader component:

```jsx
import { h } from 'preact';
import ImageLoader from './components/ImageLoader';

const App = () => (
  <div>
    <h1>My Image Gallery</h1>
    <ImageLoader
      src="https://example.com/image-large.jpg"
      lowResSrc="https://example.com/image-low-res.jpg"
      webpSrc="https://example.com/image.webp"
      alt="A beautiful landscape"
      srcSet="https://example.com/image-small.jpg 300w, https://example.com/image-medium.jpg 600w, https://example.com/image-large.jpg 1200w"
      sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, 1200px"
    />
  </div>
);
```

Ensure you've imported the necessary CSS:

```jsx
import '../styles/ImageLoader.css';
```

## API Reference

The `ImageLoader` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | Required | The main source URL of the image |
| lowResSrc | string | - | URL of a low-resolution version of the image |
| webpSrc | string | - | URL of the WebP version of the image |
| jpg | string | - | URL of the JPEG version of the image |
| png | string | - | URL of the PNG version of the image |
| alt | string | Required | Alternative text for the image |
| className | string | - | Additional CSS class for the image |
| style | object | - | Inline styles for the image |
| sizes | string | - | Sizes attribute for responsive images |
| srcSet | string | - | SrcSet attribute for responsive images |
| retryLimit | number | 3 | Maximum number of retry attempts |
| retryDelay | number | 2000 | Delay between retry attempts (in ms) |
| blurUpAmount | number | 20 | Initial blur amount for progressive loading |

## Configuration

The component can be configured through its props, as well as by modifying the CSS variables defined in `ImageLoader.css`:

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

You can override these variables in your own CSS to customize the appearance of the component.

## Architecture

The ImageLoader component is built with the following architecture:

1. **Main Component (`ImageLoader.js`)**: Handles the logic for image loading, format selection, and state management.
2. **CSS Styles (`ImageLoader.css`)**: Contains all the styles for the component, including loading states and animations.
3. **Webpack Configuration**: Set up to handle JSX transformation, CSS loading, and bundle optimization.

The component uses several hooks from Preact for state management and side effects:
- `useState`: Manages loading state, error state, and current image source.
- `useEffect`: Handles image loading logic and retry mechanism.
- `useRef`: Creates a reference to the img element for intersection observer.
- `useCallback`: Memoizes functions to optimize performance.

## Performance Considerations

The ImageLoader component is designed with performance in mind:

- **Lazy Loading**: Images are only loaded when they enter the viewport, reducing initial page load time.
- **Progressive Loading**: The blur-up technique provides a perceived performance boost.
- **Responsive Images**: By using `srcset` and `sizes`, it serves appropriately sized images for each device.
- **Format Optimization**: WebP images are used when supported, falling back to JPEG/PNG when necessary.
- **Low Bandwidth Handling**: Smaller images are served on slow connections.

To further optimize performance, consider:
- Serving images from a CDN
- Implementing server-side resizing and format conversion
- Using HTTP/2 for parallel loading of multiple images

## Accessibility

The component adheres to accessibility best practices:

- Proper `alt` text is required for all images.
- ARIA attributes are used to indicate loading and error states.
- The component is keyboard navigable with clear focus styles.

## Browser Support

The ImageLoader component supports all modern browsers. For older browsers:

- A polyfill for IntersectionObserver is automatically loaded if needed.
- WebP images are only used in supporting browsers, with automatic fallback to JPEG/PNG.

## Testing

To run the test suite:

```
npm test
```

The component is tested using Jest and React Testing Library. Key test cases include:
- Correct rendering of loading, error, and success states
- Proper application of blur effect and its removal
- Correct selection of image format based on browser support
- Proper handling of retry logic

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code adheres to the existing style and all tests pass.

## Troubleshooting

Common issues and their solutions:

1. **Images not loading**: Ensure the image URLs are correct and accessible.
2. **Blur effect not working**: Check if the `lowResSrc` prop is provided and the image is loading successfully.
3. **WebP images not being used**: Verify that the browser supports WebP and the `webpSrc` prop is provided.

For more issues, please check the GitHub Issues page or open a new issue.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this component.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
