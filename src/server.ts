import App from "./app";
import { configs } from "./config";

const app = new App();

app.listen({
  port: Number(configs?.PORT) || 80,
});
