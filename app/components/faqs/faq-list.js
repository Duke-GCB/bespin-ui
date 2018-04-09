import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['faq-list'],
  faqs: [
    {
      question: 'What is Bespin?',
      answer:
        'Bespin is a web-based platform that makes it easy to run computational genomic workflows (pipelines) in the cloud.' +
        '\n\n' +
        'A service of the [Computational Solutions Shared Resource](https://genome.duke.edu/cores/computing) ' +
        'in [Duke GCB](https://genome.duke.edu), Bespin offers provides best-practice workflows curated by experts. ' +
        'Though the workflows are self-service, results are reviewed by experts.' +
        'Bespin\'s workflows are built using reproducible software environments and run in GCB\'s private, on-premises cloud.' +
        '\n\n' +
        'Bespin is currently available in **beta** to researchers across Duke Medicine.'
    },
    {
      question: 'What kinds of workflows can Bespin run?',
      answer:
        'Bespin has been designed to run any kind of computational genomic workflow where most of the steps can be automated. ' +
        '\n\n' +
        'Initially, we are offering a Whole Exome Sequencing workflow using [GATK](https://software.broadinstitute.org/gatk/), ' +
        'and plan to bring additional workflows online shortly.' +
        '\n\n' +
        'Please see the [workflows](/workflows) section for full details on available offerings.'
    },
    {
      question: 'How much will it cost to use Bespin?',
      answer:
        'Bespin jobs will be billed based on how long they take and how many CPU cores they use.' +
        '\n\n' +
        'During the **beta** phase, there will be no charge to use Bespin. We want to get an idea of what ' +
        'kinds of jobs are working and what we need to improve. We\'ll also get an idea of how long jobs will take and what ' +
        'their computational needs (CPU, memory, etc) are.' +
        '\n\n' +
        'After the beta phase, the rate will be $0.04 per CPU hour. ' +
        'The cost is calculated by multiplying this rate by the number of hours and number of CPUs used.'
    },
    {
      question: 'How long does it take to run a workflow?',
      answer:
        'The time to run a workflow depends mostly on the input data size and resources (CPU, memory) assigned to the workflow. ' +
        '\n\n' +
        'For example, the Whole Exome Sequencing workflow uses 32 CPUs and can process 6 samples (75GB) in 23 hours, at a cost of about $30. ' +
        '20 samples (250GB) can be processed in 72 hours, at a cost of about $90.'
    },
    {
      question: 'How do I use my data in Bespin?',
      answer: 'Bespin can download your data from [Duke Data Service](https://dataservice.duke.edu). ' +
      'GCB\'s core facilities can deliver your data in a Duke Data Service project ready to use in Bespin. ' +
      'You can also upload your data to [Duke Data Service](https://dataservice.duke.edu) using [DukeDSClient](https://github.com/Duke-GCB/DukeDSClient#install-or-upgrade).'
    },
    {
      question: 'Are there limits to the size of a dataset Bespin can process?',
      answer:
        'Yes. Each job in Bespin has a limit of 10TB of input data. Beyond this point, another platform (e.g. an HPC cluster) ' +
        'is likely a better fit for your project.'
    },
    {
      question: 'What if I need to customize a parameter of the workflow or use a different set of reference data?',
      answer:
      'Great, please contact us [gcb-help@duke.edu](mailto://gcb-help@duke.edu). Bespin is designed to be highly ' +
      'configurable, and we\'d be happy to see how we can make it work more investigators.'
    }
  ]
});
