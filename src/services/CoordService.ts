import { ReactElement } from "react";

export type Coords = [number, number];

export type CoordParams<T> = {
  gridSize: number;
  rowSize: number;
  elements?: T[];
};

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

/**
 * Here, we define a stub which will allow a user to interact with a series of coordinates which
 * center on a central square.
 *
 * Start in center square (0,0).
 * Moving one vertical space (0, 1).
 * Moving right one = (1,0),
 * moving left one space = (-1, 0)
 * Moving down one space = (0, -1)
 *
 * For demo purposes, everything is copied here. Long term, this would be extracted into a backend service.
 * Backend service would run in Kubernetes as a containerized application.
 */

export default class CoordService<T> {
  gridSize: number;
  rowSize: number;
  elements: T[];
  Xgrid: Record<string, number> = {
    "-2": 0,
    "-1": 1,
    "0": 2,
    "1": 3,
    "2": 4,
  };
  Ygrid: Record<string, number[]> = {
    "2": [0, 1, 2, 3, 4],
    "1": [5, 6, 7, 8, 9],
    "0": [10, 11, 12, 13, 14],
    "-1": [15, 16, 17, 18, 19],
    "-2": [20, 21, 22, 23, 24],
  };

  constructor({ gridSize, rowSize, elements = [] }: CoordParams<T>) {
    this.gridSize = gridSize;
    this.rowSize = rowSize;
    this.elements = elements;
  }

  search(coords: Coords): T {
    // get coordinates of rover
    const [col, row] = coords;

    // TODO find a mathematical way to do this. Cuz this hurts my soul
    // Its gotta be a matrix transform? God this is killing me.
    // k = i + (j * W) where position is [i, j] and W = width of grid

    // convert coordinates to normalized set of indicies to map into 1D
    const x = this.Xgrid[col];
    const possIndices = this.Ygrid[row];
    // use the normalized coordinates to return the element in question
    const index = possIndices[x];
    return this.elements[index];
  }

  static calculateCoords(index: number, rowSize: number): Coords {
    const y = Math.floor(index / rowSize);
    const x = index % rowSize;
    // TODO I am soooooo sorry
    let col: number = -999,
      row: number = -999;
    switch (x) {
      case 0:
        col = -2;
        break;
      case 1:
        col = -1;
        break;
      case 2:
        col = 0;
        break;
      case 3:
        col = 1;
        break;
      case 4:
        col = 2;
        break;
    }
    switch (y) {
      case 0:
        row = 2;
        break;
      case 1:
        row = 1;
        break;
      case 2:
        row = 0;
        break;
      case 3:
        row = -1;
        break;
      case 4:
        row = -2;
        break;
    }

    return [col, row];
  }

  /**
   * We cannot travel past -2 < x < 2 in any direction!
   * @param newPosition the position we're looking to move into
   * @returns true if within bounds
   */
  static checkBounds(newPosition: Coords) {
    return (
      newPosition[0] >= -2 &&
      newPosition[0] <= 2 &&
      newPosition[1] >= -2 &&
      newPosition[1] <= 2
    );
  }

  static move(current: Coords, direction: Direction, spaces: number): Coords {
    const [col, row] = current;
    let newCol = -999,
      newRow = -999;
    let newCoords: Coords;
    switch (direction) {
      case Direction.UP:
        newRow = row + spaces;
        newCoords = [col, newRow];
        break;
      case Direction.DOWN:
        newRow = row - spaces;
        newCoords = [col, newRow];
        break;
      case Direction.LEFT:
        newCol = col - spaces;
        newCoords = [newCol, row];
        break;
      case Direction.RIGHT:
        newCol = col + spaces;
        newCoords = [newCol, row];
        break;
      default:
        throw new Error("unimplemented");
    }
    if (CoordService.checkBounds(newCoords)) {
      return newCoords;
    } else {
      throw new Error(
        "Sorry! Rover cannot travel past this point. Try a different direction!"
      );
    }
  }

  static compareCoords(coord1: Coords, coord2: Coords) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
  }
}
