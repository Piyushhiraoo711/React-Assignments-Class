const useFetch = async ({
  method = "GET",
  body = {},
  headers = {},
  url = "/products",
}) => {
  console.log("url",`http://localhost:3000${url}`)
  const res = await fetch(`http://localhost:3000${url}`, {
    method,
    ...(method !== "GET" ? { body } : {}),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  const data = await res.json();

  return data;
};
export default useFetch;
