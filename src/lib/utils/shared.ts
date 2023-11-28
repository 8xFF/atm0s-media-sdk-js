import { type StreamKinds } from './types';

/**
 * Generates a random SSRC (Synchronization Source) number.
 *
 * @remarks
 * This function generates a random 32-bit integer that can be used as an SSRC number.
 *
 * @returns A random SSRC number.
 */
export function randomSSRC() {
  return Math.floor(Math.random() * 99999999) + 10000000;
}

/**
 * Generates a random string of the specified size.
 * @param size The size of the string to generate.
 * @returns A random string of the specified size.
 */
export function randomString(size: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < size; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

/**
 * Delays the execution of the function that calls it for a specified number of milliseconds.
 * @param ms - The number of milliseconds to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Retrieves the first track of the specified kind from the given MediaStream.
 * @param stream - The MediaStream from which to retrieve the track.
 * @param kind - The kind of track to retrieve ('audio' or 'video').
 * @returns The track of the specified kind, or undefined if the stream is undefined or null, or if no track of the specified kind is found.
 */
export function getTrack(
  stream: MediaStream | undefined | null,
  kind: StreamKinds,
) {
  if (!stream) {
    return undefined;
  }
  if (kind === 'audio') {
    return stream.getAudioTracks()[0];
  }
  if (kind === 'video') {
    return stream.getVideoTracks()[0];
  }
  return undefined;
}
