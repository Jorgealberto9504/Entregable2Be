import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el nombre del directorio actual
const __dirname = dirname(__filename);

export { __dirname, __filename };