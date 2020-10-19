declare var process: any;
// https://liaison.dev/docs/v1/introduction/data-storage?language=ts
import {ComponentHTTPClient} from '@liaison/component-http-client';
import {Storable} from '@liaison/storable';

import type {Message as MessageType} from './backend';

(async () => {
  const client = new ComponentHTTPClient('http://localhost:3210', {
    mixins: [Storable]
  });

  const Message = (await client.getComponent()) as typeof MessageType;

  const text = process.argv[2];

  if (text) {
    addMessage(text);
  } else {
    showMessages();
  }

  async function addMessage(text: string) {
    const message = new Message({text});
    await message.save();
    console.log(`Message successfully added`);
  }

  async function showMessages() {
    const messages = await Message.find(
      {},
      {text: true, createdAt: true},
      {sort: {createdAt: 'desc'}, limit: 30}
    );

    for (const message of messages) {
      console.log(`[${message.createdAt.toISOString()}] ${message.text}`);
    }
  }
})();

/*
// https://liaison.dev/docs/v1/introduction/hello-world?language=ts

import {ComponentHTTPClient} from '@liaison/component-http-client';

import type {Greeter as GreeterType} from './backend';

(async () => {
  const client = new ComponentHTTPClient('http://localhost:3210');

  // const Greeter = (await client.getComponent()) as typeof GreeterType;

  const BackendGreeter = (await client.getComponent()) as typeof GreeterType;

  class Greeter extends BackendGreeter {
    async hello() {
      return (await super.hello()).toUpperCase();
    }
  }

  const greeter = new Greeter({name: 'Steve'});

  console.log(await greeter.hello());
})();
*/
