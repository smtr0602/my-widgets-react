import axios from 'axios';

/**
 * fetch individual widget data
 */
export const fetchSingleWidgetData = async (axiosOptions) => {
  const { data } = await axios(axiosOptions);
  return data;
};
