# Modal Form Module

A React module for creating modal forms with ease.

## Local Development & Testing

1. Clone the repository:
```bash
git clone [your-repo-url]
cd modal-form-module
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```
This will start the development server with the preview application.

## Building and Testing Locally

1. Build the module:
```bash
npm run build
```

2. Create a local package:
```bash
npm pack
```
This will create a `.tgz` file (e.g., `modal-form-module-1.0.0.tgz`)

## Using in a Next.js Project

1. Copy the `.tgz` file to your Next.js project root

2. Install the local package:
```bash
npm install ./modal-form-module-1.0.0.tgz
```

3. Import and use in your Next.js components:
```jsx
import { ModalForm } from 'modal-form-module';

export default function YourComponent() {
  return (
    <ModalForm
      // Add your props here
    />
  );
}
```

4. Add Tailwind CSS configuration (if not already set up):
```js
// tailwind.config.js
module.exports = {
  content: [
    // ... your existing content
    './node_modules/modal-form-module/**/*.{js,ts,jsx,tsx}'
  ],
  // ... rest of your config
}
```

## Features

- Easy to integrate with React/Next.js applications
- Customizable styling with Tailwind CSS
- TypeScript support

## Requirements

- React 16.8+ 
- TypeScript (optional)
- Tailwind CSS

## License

MIT