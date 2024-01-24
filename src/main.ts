import { App } from './app';
import { config } from 'dotenv';
config();
function main() {
    const app = new App();
    app.listen();
}
main();