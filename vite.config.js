import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin definition to copy the overview screenshot on Vite startup/build
const copyOverviewImagePlugin = () => {
  return {
    name: 'copy-overview-image',
    buildStart() {
      const srcImage = 'C:\\Users\\alain\\.gemini\\antigravity\\brain\\84110ffd-e8c4-4dea-bfa7-162a9d9674ee\\media__1781085102344.png';
      const destDir = path.resolve(__dirname, 'images');
      const destImage = path.resolve(destDir, 'overview.png');

      if (fs.existsSync(srcImage) && !fs.existsSync(destImage)) {
        try {
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          fs.copyFileSync(srcImage, destImage);
          console.log('\n[Vite] Cohesive copy: Overview screenshot successfully copied to images/overview.png\n');
        } catch (err) {
          console.error('\n[Vite] Failed to copy overview image:', err, '\n');
        }
      }
    }
  };
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    copyOverviewImagePlugin()
  ],
  server: {
    port: 3000,
    open: true
  }
});
