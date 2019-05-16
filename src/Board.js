import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';
import uuid from 'uuid/v4';


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
    this.state = {
      boxes: this._createBoard(),
      hasWon: false
    }
    this._createBoard = this._createBoard.bind(this);
    this._flipCellsAround = this._flipCellsAround.bind(this);
    this.flipCellsAndCheckForWin = this.flipCellsAndCheckForWin.bind(this);
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  static defaultProps = {
    nrows: 5,
    ncols: 5
  }

  _createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    const { nrows, ncols } = this.props;
    for (let y = 0; y < nrows; y++) {
      let row = Array.from({ length: ncols }, () => {
        let on = Math.random() < .50 ? true : false;
        return { isLit: on }
      });
      board.push(row)
    }

    return board
  }



  /** Internal method to copy a board and then flip the approiate cells **/

  _flipCellsAround(b, y, x) {
    let { ncols, nrows } = this.props;
    console.log({ b, y, x })
    // Make a copy of the board so that state is not changed outside of setState
    let board = b.map(r => [...r]);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x].isLit = !board[y][x].isLit;
      }
    }

    flipCell(y + 1, x)
    flipCell(y - 1, x)
    flipCell(y, x)
    flipCell(y, x + 1)
    flipCell(y, x - 1)

    // TODO: Flip all of the cells around the cell at y, x

    return board;
  }


  /** handle changing a cell: update board & determine if winner */
  flipCellsAndCheckForWin(y, x) {
    // console.log(this.state)
    let boxes = this._flipCellsAround(this.state.boxes, y, x);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = this.state.boxes.every(row => {
      return row.every((box) => box.isLit === false)
    })

    this.setState({ boxes, hasWon });
  }


  /** Render game board or winning message. */

  render() {
    // let table = this.state.boxes.map(b => (
    //   <Cell isLit={b.isLit} flipCellsAroundMe={this._flipCellsAround}/>
    // ))
    const { ncols, nrows } = this.props;
    const { boxes } = this.state;
    let boxesArr = [];
    for (let y = 0; y < nrows; y++) {
      let arr = []
      for (let x = 0; x < ncols; x++) {
        let currBox = boxes[y][x];
        arr.push(<Cell x={x} y={y} key={uuid()} flipCellsAroundMe={this.flipCellsAndCheckForWin} isLit={currBox.isLit} />)
      }
      boxesArr.push(arr)
    }


    // if the game is won, just show a winning msg & render nothing else

    // TODO
    // make table board
    return this.state.hasWon ? <div>"You have won" </div>: (
      <table className="Board">
        <tbody>
          {boxesArr.map(row => {
            return (
              <tr key={uuid()}>
                {row}
              </tr>
            )
          })}
        </tbody>
      </table>)
  }
  // TODO
}


export default Board;
