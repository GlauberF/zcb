import * as http from 'http';
import routes from "./infra/routes";
import './infra/providers/kafka/consumers/index'

const server = http.createServer(routes);

const PORT = 5040;
server.listen(PORT, () => console.log(`MS Server sale is running on port ${PORT}`));

export = server;
