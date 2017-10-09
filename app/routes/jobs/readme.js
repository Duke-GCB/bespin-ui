import Ember from 'ember';

function filterNameAndKind(items, name, kind) {
  return items.find((item) => item.get('name') == name && item.get('kind') == kind);
}

function getProjectReadmeContents(store, job) {
  const projectId = job.get('outputDir.project.id');
  return store.query('dds-resource', {project_id: projectId}
    ).then((items) => filterNameAndKind(items, 'results', 'dds-folder')
    ).then((resultsFolder) => store.query('dds-resource', {folder_id: resultsFolder.get('id')})
    ).then((items) => filterNameAndKind(items, 'docs', 'dds-folder')
    ).then((docsFolder) => store.query('dds-resource', {folder_id: docsFolder.get('id')})
    ).then((items) => filterNameAndKind(items, 'README.md', 'dds-file')
    ).then((readmeFile) => readmeFile.get('id')
    ).then((readmeFileId) => store.findRecord('dds-file-url', readmeFileId)
    ).then((ddsFileUrl) => Ember.$.get(ddsFileUrl.get('host') + ddsFileUrl.get('url')))
}

export default Ember.Route.extend({
  model(params) {
    const store = this.get('store');
    return store.findRecord('job', params.job_id
    ).then((job) => Ember.RSVP.hash({
      job: job,
      readmeContent: getProjectReadmeContents(store, job)
    }));
  }
});
