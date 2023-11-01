import classNames from "classnames"
import { CSSProperties } from "react"
import { CalculateCoordsFn, useCoords } from "../hooks/useCoords"
import { Coords } from "../services/CoordService"

type SquareProps = {
    index: number
    isHere: (currentPosition: Coords) => boolean
    calculateCoords: CalculateCoordsFn
}

const style: CSSProperties = {
    display: "flex",
    width: "50px",
    height: "50px",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
}

const Square = ({ index, isHere, calculateCoords }: SquareProps) => {

    const { location } = useCoords(index, calculateCoords)
    const [col, row] = location


    const coordReadout = `${col}, ${row}`
    return <div style={style} className={classNames({ 'you-are-here': isHere(location) })}>
        {coordReadout}
    </div>
}

export default Square