import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

function consumerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getConsumers() {
  return http.get(apiEndpoint);
}

export function getConsumer(consumerId) {
  return http.get(consumerUrl(consumerId));
}

export function saveConsumer(consumer) {
  if (consumer.id) {
    return http.put(consumerUrl(consumer.id), consumer);
  }

  return http.post(apiEndpoint, consumer);
}

export function deleteConsumer(consumerId) {
  return http.delete(consumerUrl(consumerId));
}
