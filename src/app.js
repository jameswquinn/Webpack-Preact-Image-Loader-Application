import { h } from 'preact';
import { render } from 'preact';
import ImageLoader from './components/ImageLoader';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/ImageLoader.css';

const App = () => (
  <ErrorBoundary>
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
  </ErrorBoundary>
);

render(<App />, document.body);
