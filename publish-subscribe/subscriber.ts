import {createClient} from "redis";

const client = createClient();
const subscriber = client.duplicate();

(async () => {
  await subscriber.connect();
  const topic = process.argv.slice(2)[0] || "message";
  console.log(`Subscribing to "${topic}" topic`);

  await subscriber.subscribe(topic, (message) => {
    console.log(message);
  });
})();
