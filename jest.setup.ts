import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

Object.defineProperty(window, 'MediaStream', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    addTrack: jest.fn(),
    getTracks: jest.fn().mockImplementation(() => []),
  })),
});

Object.defineProperty(window, 'MediaStreamTrack', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({})),
});
