import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  constructor(props) {
    super(props);

    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  _createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    return board
  }

  /** Internal method to copy a board and then flip the approiate cells **/

  _flipCellsAround(b, y, x) {
    let {ncols, nrows} = this.props;
    // Make a copy of the board so that state is not changed outside of setState
    let board = b.map(r => [...r]);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: Flip all of the cells around the cell at y, x

    return board;
  }


  /** handle changing a cell: update board & determine if winner */
  flipCellsAndCheckForWin(y, x) {
    let board = this._flipCellsAround(this.state.board, y, x);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    // let hasWon = ... your code here.

    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
