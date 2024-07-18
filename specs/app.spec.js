import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

describe("nameIsValid", () => {
  test.each([
    ["", false],
    ["a", false],
    ["ab", true],
    ["abc", true],
    ["123", false],
    ["abc123", false],
    ["abc_def", false],
    ["abc def", false],
  ])("should return %p for name '%p'", (name, expected) => {
    expect(nameIsValid(name)).toBe(expected);
  });
});

describe("fullTrim", () => {
  test.each([
    ["  Hello  World  ", "HelloWorld"],
    ["Hello World", "HelloWorld"], // Неразрывные пробелы
    ["", ""],
    [null, ""],
    [undefined, ""],
    ["Hello-World", "Hello-World"],
  ])(
    "removes spaces from '%s' and should result in '%s'",
    (input, expected) => {
      expect(fullTrim(input)).toBe(expected);
    },
  );
});

describe("getTotal function", () => {
  const testCases = [
    {
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ],
      discount: 10,
      expected: 31.5,
    },
    {
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ],
      discount: 0,
      expected: 35,
    },
    {
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ],
      discount: -10,
      message: "Процент скидки не может быть отрицательным",
    },
    {
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ],
      discount: 100,
      message: "Процент скидки не может быть больше 100",
    },
    {
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ],
      discount: "10",
      message: expect.any(Error),
    },
    {
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ],
      discount: "10.5",
      message: expect.any(Error),
    },
  ];

  testCases.forEach(({ items, discount, expected, message }) => {
    const testDescription = `should return ${expected} when called with ${JSON.stringify(
      items,
    )} and ${discount}% discount`;
    if (message) {
      it(testDescription, () => {
        expect(() => getTotal(items, discount)).toThrow(message);
      });
    } else {
      it(testDescription, () => {
        expect(getTotal(items, discount)).toBe(expected);
      });
    }
  });
});
