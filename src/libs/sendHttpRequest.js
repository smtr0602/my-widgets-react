import axios from 'axios';

const sendHttpRequest = async (options) => {
  const { data } = await axios(options);
  return data;
};

export default sendHttpRequest;
