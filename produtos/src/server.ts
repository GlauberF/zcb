import * as http from 'http';
import routes from "./infra/routes";
import "./infra/provider/kafka/consumers/index";

const server = http.createServer(routes);

const PORT = 5030;
server.listen(PORT, () => console.log(`MS Server Payment methods is running on port ${PORT}`));

export = server;
