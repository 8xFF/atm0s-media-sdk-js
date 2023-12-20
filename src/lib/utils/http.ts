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

export async function selectFromUrls(urls: string | string[]): Promise<string> {
  if (typeof urls === 'string') {
    return urls;
  }

  const waiting_urls: { [url: string]: boolean } = {};

  for (const url of urls) {
    waiting_urls[url] = true;
    try {
      const res = await httpGet<{
        status: boolean;
        data: { ready: boolean };
      }>(url + '/healthcheck?ts=' + new Date().getTime());
      if (res.status === true && res.data && res.data.ready === true) {
        return url;
      }
    } catch (err) {
      delete waiting_urls[url];
      throw new Error('selectFromUrls :: error:' + JSON.stringify(waiting_urls) + ' ' + url + ' ' + err);
    }
  }

  throw new Error('No available media server');
}
