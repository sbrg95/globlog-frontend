export const formatDate = (date) => {
  const month = new Date(date).toLocaleString('default', { month: 'long' });
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return `${month} ${day}, ${year}`;
};

export const toUpperCaseFirstChar = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1, string.length)}`;
};

export const getCkeditorConfig = (apiUrl) => {
  return {
    simpleUpload: {
      uploadUrl: `${apiUrl}/api/image`,
    },
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'codeBlock',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
      ],
    },
    language: 'en',
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    licenseKey: '',
  };
};
