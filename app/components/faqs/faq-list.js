import Ember from 'ember';

export default Ember.Component.extend({
  faqs: [
    {
      question: 'What is Bespin?',
      answer: 'Bespin is a web-based platform that makes it easy to run computational genomic pipelines (workflows).' +
        '\n\n' +
      'A service of the [Computational Solutions Shared Resource](https://genome.duke.edu/cores/computing) ' +
      'in [Duke GCB](https://genome.duke.edu), Bespin offers provides best-practice workflows curated by experts.' +
      'These workflows are built using reproducible software environments and run in GCB\'s private, on-premises cloud.' +
      '\n\n' +
      'Bespin is currently available in **beta** to researchers across Duke Medicine.'
    },
    {
      question: 'What kinds of pipelines can Bespin run?',
      answer: ''
    },
    {
      question: 'How much will it cost to run a pipeline?',
      answer: ''
    },
    {
      question: 'How do I get my data ready for Bespin?',
      answer: ''
    },
    {
      question: 'What if I need to customize a parameter of the pipeline or use a different set of reference data?',
      answer: ''
    },
    {
      question: 'How large of a dataset can Bespin process?',
      answer: ''
    },
    {
      question: 'How long does it take to run a pipeline?',
      answer: ''
    },
    {
      question: '',
      answer: ''
    }
  ]
});
