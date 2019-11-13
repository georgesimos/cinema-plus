const setAuthHeaders = headersObject => {
  let headers = { ...headersObject };
  if (localStorage.jwtToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${localStorage.jwtToken}`
    };
  }
  return headers;
};
export default setAuthHeaders;
