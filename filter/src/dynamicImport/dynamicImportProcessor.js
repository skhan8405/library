import { lazy } from "react";
import Config from "./config.json";

const components = {};
for (let i = 0; i < Config.config.length; i++) {
    components[Config.config[i].name] = lazy(() =>
        import(`${Config.config[i].path}`).then((module) => ({
            default: module[Config.config[i].name]
        }))
    );
}
export default components;
