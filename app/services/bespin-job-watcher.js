/**
 * Service used to update jobs based on messages from a websocket.
 * Users should call startWatching to
 * Websocket host determined by ENV.APP.JOB_WATCHER_HOST.
 */
import Service, { inject as service } from '@ember/service';
import ENV from 'bespin-ui/config/environment'; // This is how we load config variables from our environment.js file

function buildRequest(command, token, jobId) {
  return JSON.stringify({
    "command": command,
    "token": token,
    "job": jobId
  });
}

function parseResponse(response) {
  return JSON.parse(response);
}

function startWatchingJob(socket, token, jobId) {
  socket.send(buildRequest("add", token, jobId));
}

function stopWatchingJob(socket, token, jobId) {
  socket.send(buildRequest("remove", token, jobId));
}

export default Service.extend({
  store: service(),
  websockets: service(),
  socketRef: null,
  startWatching(token, jobId) {
    var socket = this.get('socketRef');
    if (socket) {
      startWatchingJob(socket, token, jobId);
    } else {
      var url = ENV.APP.JOB_WATCHER_URL;
      socket = this.get('websockets').socketFor(url);
      socket.on('open', function () {
        startWatchingJob(socket, token, jobId);
      }, this);
      socket.on('message', this.onMessage, this);
      socket.on('close', this.onClose, this);
      this.set('socketRef', socket);
    }
  },
  stopWatching(token, jobId) {
    var socket = this.get('socketRef');
    if (socket) {
      stopWatchingJob(socket, token, jobId);
    } else {
      //eslint-disable-next-line no-console
      console.log("Job watcher websocket not connected.");
    }
  },
  onMessage(event) {
    var response = parseResponse(event.data);
    if (response.status === "ok") {
      var store = this.get('store');
      var jobData = response.data;

      store.findRecord('job', jobData.job, {}).then(function (job) {
        job.reload();
      });
    } else {
      //eslint-disable-next-line no-console
      console.log("Job Watcher Error:", response.data.message);
    }
  },
  onClose() {
    const socket = this.get('socketRef');
    if (socket) {
      socket.off('open', this.myOpenHandler);
      socket.off('message', this.myMessageHandler);
      socket.off('close', this.myCloseHandler);
    }
  },
  willDestroy() {
    this.onClose();
  }
});
