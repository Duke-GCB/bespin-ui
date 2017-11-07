/**
 * Map of CWL specified types to the Ember UI components that can provide their data
 * @type {[*]}
 */
const ComponentSettings = [
  {
    // Generic file group
    cwlType: { type: 'array', items: { type: 'array', items: 'File' } }, // From CWL
    name: 'file-group-list',  // Component to render
    formats: [
      {
        title: 'File',
        format: 'http://edamontology.org/format_1915', // Generic format
        groupName: 'File Group'
      }
    ]
  },
  {
    // Bespin CWL file pair
    cwlType: { type: 'array', items: 'NamedFASTQFilePairType'}, // Defined in CWL
    name: 'fastq-file-pair-list',  // Component to render
    formats: [
      {
        title: 'FASTQ Pair',
        format: null, // The specific files should be http://edamontology.org/format_1930, but this is a structure
        fileNameRegexStr: '.*(fq$)|(fq.gz$)|(fastq$)|(fastq.gz$)',
        groupName: 'Sample'
      }
    ]
  },
  {
    // String field
    cwlType: 'string', // Defined in CWL
    name: 'string-field',  // Component to render
    formats: [], // No formats for a string
  }
];

export default ComponentSettings;
