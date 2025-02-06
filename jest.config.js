export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // ✅ 让 Jest 运行在浏览器环境
  transform: {
    '^.+\\.(ts|js)$': 'babel-jest', // ✅ 让 Babel 处理测试代码
  },
  moduleFileExtensions: ['ts', 'js'],
  globals: {
    'ts-jest': {
      useESM: true, // ✅ 让 Jest 识别 ESM 代码
    },
  },
};
