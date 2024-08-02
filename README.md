## README.md

```markdown
# ImageLoader Preact Component

A sophisticated, responsive, and accessible image loading component for Preact applications.

## Features

- Progressive image loading with blur-up effect
- WebP support with fallbacks
- Responsive image loading with srcSet and sizes attributes
- Intersection Observer for lazy loading with polyfill support
- Retry mechanism for failed image loads
- Accessible design with proper ARIA attributes
- Responsive CSS with mobile optimization
- Print-friendly styles

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/image-loader-preact-app.git
   ```

2. Install dependencies:
   ```
   cd image-loader-preact-app
   npm install
   ```

## Usage

Import the ImageLoader component in your Preact application:

```jsx
import ImageLoader from './components/ImageLoader';

const App = () => (
  <div>
    <h1>Image Loader Demo</h1>
    <ImageLoader
      src="image-large.jpg"
      lowResSrc="image-low-res.jpg"
      webpSrc="image.webp"
      jpg="image.jpg"
      png="image.png"
      alt="Demo Image"
      srcSet="image-small.jpg 300w, image-medium.jpg 600w, image-large.jpg 1200w"
      sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, 1200px"
      blurUpAmount={20}
    />
  </div>
);
```

## Development

To start the development server:

```
npm start
```

To build for production:

```
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
```

This documentation provides a comprehensive overview of the ImageLoader component, including its decision-making process, API, CSS structure, and usage instructions. The README file gives users a quick start guide and overview of the project's features.
