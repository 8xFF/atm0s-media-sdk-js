import type { StreamKinds } from './types';

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

// eslint-disable-next-line @typescript-eslint/ban-types
export type Constructor<T = {}> = new (...args: unknown[]) => T;

export function applyMixin(
  target: Constructor,
  mixin: Constructor,
  includeConstructor = false,
): void {
  // Figure out the inheritance chain of the mixin
  const inheritanceChain: Constructor[] = [mixin];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const current = inheritanceChain[0];
    const base = Object.getPrototypeOf(current);
    if (base?.prototype) {
      inheritanceChain.unshift(base);
    } else {
      break;
    }
  }
  for (const ctor of inheritanceChain) {
    for (const prop of Object.getOwnPropertyNames(ctor.prototype)) {
      // Do not override the constructor
      if (includeConstructor || prop !== 'constructor') {
        Object.defineProperty(
          target.prototype,
          prop,
          Object.getOwnPropertyDescriptor(ctor.prototype, prop) ??
            Object.create(null),
        );
      }
    }
  }
}

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
