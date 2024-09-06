import { ServiceBroker } from "moleculer";
import NATS from "nats";
import OrderService from "./services/order.service.js"; // Importe o serviço

// Configuração do servidor NATS
const natsURL = "nats://localhost:4222"; // URL do servidor NATS

// Criação do broker Moleculer
const broker = new ServiceBroker({
  nodeID: "node-1",
  transporter: {
    type: "NATS",
    options: {
      url: natsURL
    }
  },
  // Adicione outras configurações do broker conforme necessário
});

// Adiciona o serviço de pedidos
broker.createService(OrderService);

// Inicia o broker
broker.start()
  .then(() => {
    console.log("Broker iniciado");
  })
  .catch(err => {
    console.error("Erro ao iniciar o broker:", err);
  });
