import sendHttpRequest from '../libs/sendHttpRequest';

const widgets = [
  {
    name: 'quote',
    options: {
      method: 'POST',
      url: import.meta.env.VITE_QUOTE_API_URL,
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com',
      },
      timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
    },
  },
];

/**
 * fetch individual widget data
 */
const fetchSingleWidgetData = async (name, axiosOptions) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await sendHttpRequest(axiosOptions);
      resolve({ name, data });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

/**
 * fetch all data
 */
const fetchAllWidgetsData = async () => {
  const result = await Promise.allSettled(
    widgets.map((widget) => fetchSingleWidgetData(widget.name, widget.options))
  );
  return result;
};

export default fetchAllWidgetsData;
