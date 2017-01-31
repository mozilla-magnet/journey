// Have to tell jest to mock the Geolocation native module
// See: https://github.com/facebook/jest/issues/2208
jest.mock('Geolocation', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  }
})
