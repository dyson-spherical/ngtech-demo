import { Button } from "react-bootstrap"
import { FaAngleUp, FaAngleLeft, FaAngleRight, FaAngleDown } from "react-icons/fa"
import { Direction } from "../services/CoordService"

export type MoveRoverFn = (direction: Direction, spaces: number) => OnClick
type OnClick = () => void

interface ButtonPanelProps {
    moveRover: MoveRoverFn
}

const ButtonPanel = ({ moveRover }: ButtonPanelProps) =>
    <div className='dir-button-container' style={{ width: "10%" }}>
        <Button className="dir-button up-button" onClick={moveRover(Direction.UP, 1)}>
            <FaAngleUp />
        </Button>
        <Button className="dir-button left-button" onClick={moveRover(Direction.LEFT, 1)}>
            <FaAngleLeft />
        </Button>
        <Button className="dir-button right-button" onClick={moveRover(Direction.RIGHT, 1)}>
            <FaAngleRight />
        </Button>
        <Button className="dir-button down-button" onClick={moveRover(Direction.DOWN, 1)}>
            <FaAngleDown />
        </Button>
    </div>

    export default ButtonPanel