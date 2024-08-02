## API Documentation

### ImageLoader Component

The `ImageLoader` component is a sophisticated image loading solution that provides progressive loading, format fallbacks, and responsive image support.

#### Props

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

#### Usage Example

```jsx
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
```
