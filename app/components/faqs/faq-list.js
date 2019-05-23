import Component from '@ember/component';

const Faqs = [
  {
    question: 'What is Bespin?',
    answer:
      'Bespin is a web-based platform that makes it easy to run computational genomics workflows (pipelines) in the cloud.' +
      '\n\n' +
      'A service of the [Computational Solutions Shared Resource](https://genome.duke.edu/cores/computing) ' +
      'in [Duke GCB](https://genome.duke.edu), Bespin incorporates best-practice workflows curated by experts. ' +
      'Specifically, Bespin\'s workflows are built using containerized software environments, run in GCB\'s private, on-premises cloud, ' +
      'and used by bioinformaticians in the [Genomic Analysis and Bioinformatics](https://genome.duke.edu/cores-and-services/genomic-analysis-and-bioinformatics) ' +
      'core to provide highly reproducible, expert-reviewed computational results.'
  },
  {
    question: 'Can I use Bespin to analyze my data?',
    answer:
      'Bespin is not available to users outside of the GCB core facilities. Bespin is primarily operated by the ' +
      '[Genomic Analysis and Bioinformatics](https://genome.duke.edu/cores-and-services/genomic-analysis-and-bioinformatics) ' +
      'core in an effort to streamline popular workflows and encourage best practices for reproducibility ' +
      'and portability.' +
      '\n\n' +
      'While Bespin is not generally available, Bespin and its workflows are open source, available at ' +
      '[github.com/Duke-GCB/bespin](https://github.com/Duke-GCB/bespin).'
  },
  {
    question: 'What kinds of workflows can Bespin run?',
    answer:
      'Bespin has been designed to run any kind of computational genomic workflow where most of the steps can be automated. ' +
      '\n\n' +
      'Initially, we are targeting a Whole Exome Sequencing workflow using [GATK](https://software.broadinstitute.org/gatk/). ' +
      'We are actively working on additional workflows, and plan to bring them online in the near future.' +
      '\n\n' +
      'Please see the [workflows](/workflows) section for full details on available offerings. ' +
      'If you have suggestions for types of workflows that are reasonably well established, and that you believe would have ' +
      'a broad group of users at Duke, please contact us at [gcb-help@duke.edu](mailto://gcb-help@duke.edu). We always welcome feedback.'
  },
  {
    question: 'How long does it take to run a workflow, and how much will it cost?',
    answer:
      'The computational resources used by Bespin jobs will be billed based on how long they take and how many CPU cores they use. ' +
      'How long a workflow runs depends mostly on the input data size and resources (CPU, memory) assigned to the workflow.' +
      '\n\n' +
      'While a workflow is in the **beta** phase, there will be no charge to run it on Bespin. We want to get an idea of what ' +
      'kinds of jobs are working and what we need to improve. We\'ll also get an idea of how long jobs will take and what ' +
      'their computational needs (CPU, memory, etc) are.' +
      '\n\n' +
      'For workflows that have graduated to production, their computational resource usage will be charged at the approved rate, which for FY18 is $0.04 per CPU hour. ' +
      'For example, the Whole Exome Sequencing workflow uses 32 CPUs and can process 6 samples (75GB) in 23 hours, ' +
      'which would correspond to a computational resource cost of about $30. 20 samples (250GB) will take about 72 hours, ' +
      'corresponding to a computational resource cost of about $90. ' +
      '\n\n' +
      'Note that this includes _only_ the cost for utilizing the computational resources (CPU, memory, storage). ' +
      'Additional costs for consultation and review by the ' +
      '[Genomic Analysis and Bioinformatics](https://genome.duke.edu/cores-and-services/genomic-analysis-and-bioinformatics) ' +
      'core will apply in addition.'
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
      'Yes. Each job in Bespin has a limit of 10TB of input data. Beyond this point, another platform ' +
      '(e.g. an HPC cluster such as [HARDAC](https://genome.duke.edu/cores-and-services/computational-solutions/compute-environments-genomics)) ' +
      'is likely a better fit for your project.'
  },
  {
    question: 'Is Bespin approved for datasets containing Protected Health Information (PHI) or other sensitive data?',
    answer:
      'No. Bespin is designed to handle research data and uses infrastructure that is not approved for PHI.' +
      '\n\n' +
      'An environment such as [PACE](https://pace.ori.duke.edu) is likely a better fit for such investigations.'
  },
  {
    question: 'What if I need to customize a parameter of the workflow or use a different set of reference data?',
    answer:
      'Great, please contact us at [gcb-help@duke.edu](mailto://gcb-help@duke.edu). Bespin is designed to be highly ' +
      'configurable, and we\'d be happy to see how we can make it work for more investigators.'
  }
];

export default Component.extend({
  classNames: ['faq-list'],
  faqs: null,
  init() {
    this._super(...arguments);
    this.set('faqs', Faqs);
  }
});
