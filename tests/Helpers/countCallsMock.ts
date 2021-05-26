type CountCallMock = (() => void) & { count?: number };

export const getCountCallMock = (): CountCallMock => {
  const countCallMock: CountCallMock = () => {
    const count = countCallMock.count ?? 0;
    countCallMock.count = count + 1;
  };
  countCallMock.count = 0;
  return countCallMock;
};
