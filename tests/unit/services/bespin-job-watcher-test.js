import { moduleFor, test } from 'ember-qunit';

moduleFor('service:bespin-job-watcher', 'Unit | Service | bespin job watcher', {
  needs: ['service:websockets']
});

// Replace this with your real tests.
test('startWatching wll send add command', function (assert) {
  var onOpenCalled = false;
  var afterOpenFunc = null;
  var sendPayload = null;

  function socketFor() {
    onOpenCalled = true;
    return {
      on(msg, func) {
        if (msg === 'open') {
          afterOpenFunc = func;
        }
      },
      off() {
      },
      send(payload) {
        sendPayload = JSON.parse(payload);
      }
    };
  }

  let service = this.subject({
    'websockets': {
      'socketFor': socketFor
    }
  });
  assert.ok(service);
  //first time we should open
  service.startWatching('abcdef', '123');
  assert.equal(true, onOpenCalled);
  afterOpenFunc();
  assert.equal("add", sendPayload.command);
  assert.equal("abcdef", sendPayload.token);
  assert.equal("123", sendPayload.job);

  //second time it should send without calling open or using a callback
  onOpenCalled = false;
  service.startWatching('bcedf', '124');
  assert.equal(false, onOpenCalled);
  assert.equal("add", sendPayload.command);
  assert.equal("bcedf", sendPayload.token);
  assert.equal("124", sendPayload.job);
});

test('stopWatching will send remove command', function (assert) {
  var sendPayload = null;
  let service = this.subject({
    'websockets': {
      'socketFor': socketFor
    }
  });

  function socketFor() {
    return {
      on() {
      },
      off() {
      },
      send(payload) {
        sendPayload = JSON.parse(payload);
      }
    };
  }

  assert.ok(service);
  service.startWatching('abcdef', '123');
  service.stopWatching('abcdef', '123');
  assert.equal("remove", sendPayload.command);
  assert.equal("abcdef", sendPayload.token);
  assert.equal("123", sendPayload.job);
});


test('onMessage will reload job for normal update', function (assert) {
  var fakeJob = {
    reload() {
      fakeJob.reloaded = true;
    }
  };
  let service = this.subject({
    'store': {
      findRecord() {
        return {
          'then': function (func) {
            func(fakeJob);
          }
        };
      }
    }
  });
  var payload = {
    'data': JSON.stringify({
      'status': 'ok',
      'data': {
        "job": "1",
        "state": "R",
        "step": "V"
      }
    })
  };
  service.onMessage(payload);
  assert.equal(true, fakeJob.reloaded);
});


test('onMessage with websocket error will be handled', function (assert) {
  let service = this.subject();
  assert.ok(service);
  var payload = {
    'data': JSON.stringify({
      'status': 'error',
      'data': {
        'message': 'bad'
      }
    })
  };
  service.onMessage(payload);
});
