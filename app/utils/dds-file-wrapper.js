// Converts a single dds-file (dds-resource) object to a JS object suitable for inclusion in a bespin userJobOrder

export default function ddsFileWrapper(ddsFile, prefix) {
  return {
    'class': 'File',
    'path': `${prefix}_${ddsFile.get('name')}`,
  };
}

