import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { ToastContainer } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { ErrorBoundary } from 'react-error-boundary';
import uuid from 'react-uuid';
import './App.css';
import ButtonPanel, { MoveRoverFn } from './components/ButtonPanel';
import Square from './components/Square';
import CoordService, { Coords, Direction } from './services/CoordService';
import { buildToast } from './helpers/buildToast';

interface IToast {
  key: string
  toast: ReactNode
}

const gridSize = 25
const rowSize = 5

const calculateCoords = (rowSize: number) => (index: number) => CoordService.calculateCoords(index, rowSize)
const moveRoverPartial = (
  position: Coords,
  setPosition: Dispatch<SetStateAction<Coords>>,
  addToast: (t: IToast) => void,
  removeToast: (key: string) => void
): MoveRoverFn =>
  (direction: Direction, spaces: number) =>
    () => {
      try {
        setPosition(CoordService.move(position, direction, spaces))
      } catch (e) {
        // TODO make border red if we tried to cross it
        // do a Toast for now
        addToast(buildToast(uuid(), `${e}`, removeToast))
      }
    }


function App() {

  const [position, setPosition] = useState<Coords>([0, 0])
  const squares = Array.from({ length: gridSize }, (_, i) =>
    <Square key={i} index={i} isHere={(location) => CoordService.compareCoords(location, position)} calculateCoords={calculateCoords(rowSize)} />)

  const [toasts, setToasts] = useState(new Array<IToast>())
  const addToast = (t: IToast) => setToasts((oldState) => [...oldState, t])
  const removeToast = (key: string) => setToasts((oldState) => oldState.filter((v) => v.key !== key))

  const moveRover: MoveRoverFn = moveRoverPartial(position, setPosition, addToast, removeToast)

  return (
    <>
      <Navbar expand="lg" bg='dark' data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Red Rover, Red Rover</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <div className="grid-container">
            {squares}
          </div>
          <ButtonPanel moveRover={moveRover} />
          <ToastContainer style={{ zIndex: 1 }} position="bottom-end">{toasts.map(v => v.toast)}</ToastContainer>
        </ErrorBoundary>
      </Container>
    </>
  );
}

export default App;

