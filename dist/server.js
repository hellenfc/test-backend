"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
require("./routes");
const config_1 = require("./config");
typeorm_1.createConnection({
    type: "sqlite",
    database: "test",
    entities: [
        __dirname + "/entity/*"
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    app_1.default.listen(config_1.config.PORT, () => console.log('Example app listening on port 3000!'));
}).catch(error => console.log(error));
//# sourceMappingURL=server.js.map