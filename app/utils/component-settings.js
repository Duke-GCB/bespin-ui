/**
 * Map of CWL specified types to the Ember UI components that can provide their data
 * @type {[*]}
 */
const ComponentSettings = [
  {
    // Generic file group
    cwlType: { type: 'array', items: { type: 'array', items: 'File' } }, // Named in job-questionnaire.user_fields_json
    name: 'file-group-list',  // questionnaire component to render
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
    cwlType: { type: 'array', items: 'NamedFASTQFilePairType'}, // Named in job-questionnaire.user_fields_json
    name: 'fastq-file-pair-list',  // questionnaire component to render
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
    cwlType: 'string', // Named in job-questionnaire.user_fields_json
    name: 'string-field',  // questionnaire component to render
    formats: [], // No file formats for a string
  },
  {
    // Enum field
    cwlType: 'ExomeseqStudyType', // Named in job-questionnaire.user_fields_json
    name: 'exomeseq-studytype-choice', // questionnaire component to render
    formats: [], // No file formats for an enum field
  },
  {
    // int field
    cwlType: 'int', // integer value
    name: 'int-field',  // questionnaire component to render
    formats: [], // No file formats for a string
  },
  {
    // File field
    cwlType: 'File',     // Named in job-questionnaire.user_fields_json
    name: 'file-field',  // questionnaire component to render
    formats: [], // No file formats for a string
  }
];

export default ComponentSettings;
