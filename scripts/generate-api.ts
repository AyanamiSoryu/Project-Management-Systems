import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

dotenv.config();

const swaggerUrl = process.env.SWAGGER_DOCS_URL;

if (!swaggerUrl) {
  console.error('SWAGGER_DOCS_URL is not defined in .env');
  process.exit(1);
}

execSync(`openapi --input ${swaggerUrl} --output ./src/shared/networking/generated --client axios`, { stdio: 'inherit' });
