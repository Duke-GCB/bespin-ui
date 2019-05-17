// Version sorting adapted from python implementation in
// https://github.com/Duke-GCB/bespin-api/blob/112ae41d419f344e3d6b5c0f4d775bf070a30d4c/data/models.py

const PartSortDigits = 10;

function makeSortKey(versionString) {
  const parts = [];
  versionString.split(/\.|\-/).forEach( part => {
    let leftPaddedPart = part.padStart(PartSortDigits, '0');
    parts.push(leftPaddedPart);
  });
  return parts.join('');
}

export default function versionSort(versions) {
  const versionsAndKeys = versions.map(version => {
    return {version: version, key: makeSortKey(version)};
  });
  return versionsAndKeys.sortBy('key').mapBy('version');
}

export { makeSortKey };
