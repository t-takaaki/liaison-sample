// https://liaison.dev/docs/v1/introduction/data-storage?language=ts
import {Component, expose, validators} from '@liaison/component';
import {Storable, primaryIdentifier, attribute} from '@liaison/storable';
import {MemoryStore} from '@liaison/memory-store';
import {ComponentHTTPServer} from '@liaison/component-http-server';

const {notEmpty, maxLength} = validators;

@expose({
  find: {call: true},
  prototype: {
    load: {call: true},
    save: {call: true}
  }
})
export class Message extends Storable(Component) {
  @expose({get: true, set: true})
  @primaryIdentifier()
  id!: string;

  @expose({get: true, set: true})
  @attribute('string', {validators: [notEmpty(), maxLength(300)]})
  text = '';

  @expose({get: true})
  @attribute('Date')
  createdAt = new Date();
}

const store = new MemoryStore();

store.registerStorable(Message);

const server = new ComponentHTTPServer(Message, {port: 3210});

server.start();

/*
// https://liaison.dev/docs/v1/introduction/hello-world?language=ts
import {Component, attribute, method, expose} from '@liaison/component';
import {ComponentHTTPServer} from '@liaison/component-http-server';

export class Greeter extends Component {
  @expose({set: true}) @attribute('string') name = 'World';

  @expose({call: true}) @method() async hello() {
    return `Hello, ${this.name}!`;
  }
}

const server = new ComponentHTTPServer(Greeter, {port: 3210});

server.start();
*/
