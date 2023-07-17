type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export default MockType;
