export function httpPost<T>(url: string, body: unknown): Promise<T> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(body);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow' as RequestRedirect,
  };

  return fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result));
}

export function httpGet<T>(url: string): Promise<T> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow' as RequestRedirect,
  };

  return fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result));
}
