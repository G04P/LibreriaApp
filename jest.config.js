// jest.config.js
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Configuración de alias
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Ignorar archivos de estilo
        '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',       
        setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

    }

  };
  