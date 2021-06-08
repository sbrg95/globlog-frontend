import path from 'path';

export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:3000';
};

export const getApiRoute = (route) => {
  const apiUrl = getApiUrl();
  return path.resolve(apiUrl, route);
};

export const formatDate = (date) => {
  const month = new Date(date).toLocaleString('default', { month: 'long' });
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return `${month} ${day}, ${year}`;
};

export const toUpperCaseFirstChar = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1, string.length)}`;
};

export const getCkeditorConfig = () => {
  return {
    simpleUpload: {
      uploadUrl: getApiRoute(`/api/image`),
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
