import CoordService, { Direction } from "./CoordService";

const elements = Array.from({ length: 25 }, (v, k) => k);
const rowSize = 5
const coordService = new CoordService<number>({
  gridSize: 25,
  rowSize,
  elements,
});

describe("when we search for", () => {
  test("searches for center", () => {
    expect(coordService.search([0, 0])).toBe(12);
  });

  test("searches for upper left", () => {
    expect(coordService.search([-2, 2])).toBe(0);
  });

  test("searches for lower left", () => {
    expect(coordService.search([-2, -2])).toBe(20);
  });

  test("searches for upper right", () => {
    expect(coordService.search([2, 2])).toBe(4);
  });

  test("searches for lower right", () => {
    expect(coordService.search([2, -2])).toBe(24);
  });
});

describe("when we calculate coordinates", () => {
  test("calculates coordinates for 0", () => {
    expect(CoordService.calculateCoords(0, rowSize)).toEqual([-2, 2]);
  });

  test("calculates coordinates for 20", () => {
    expect(CoordService.calculateCoords(20, rowSize)).toEqual([-2, -2]);
  });

  test("calculates coordinates for 4", () => {
    expect(CoordService.calculateCoords(4, rowSize)).toEqual([2, 2]);
  });

  test("calculates coordinates for 24", () => {
    expect(CoordService.calculateCoords(24, rowSize)).toEqual([2, -2]);
  });
});

describe("when we move", () => {
  test("when we move from the bottom to the top", () => {
    expect(CoordService.move([-2, -2], Direction.UP, 3)).toEqual([-2, 1]);
  });

  test("when we move from the top to the bottom", () => {
    expect(CoordService.move([2, 2], Direction.DOWN, 4)).toEqual([2, -2]);
  });

  test("when we move from the left to the right", () => {
    expect(CoordService.move([-2, 1], Direction.RIGHT, 4)).toEqual([2, 1]);
  });

  test("when we move from the right to the left", () => {
    expect(CoordService.move([2, -1], Direction.LEFT, 4)).toEqual([-2, -1]);
  });
  test("when we go to far, we stop", () => {
    expect(() => CoordService.move([2, 2], Direction.RIGHT, 1)).toThrowError(
      "Sorry! Rover cannot travel past this point. Try a different direction!"
    );
  })
});
