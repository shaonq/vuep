import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import indexMock from './index'
/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer([...indexMock])
}
