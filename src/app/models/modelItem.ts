import { TimelineItem } from './timelineItem';

export enum RotationDirection {
    FORWARD = -1,
    BACKWARD = 1
}

export enum RotationAxis {
    X = 'x',
    Y = 'y',
    Z = 'z'
}

export class ModelItem extends TimelineItem {
    public name: string;
    public angleX: number;
    public angleY: number;
    public angleZ: number;
    public rotate: RotationDirection;
    public rotateAxis: RotationAxis;
    public offsetX: number;
    public offsetY: number;
    public offsetZ: number;

    public constructor() {
        super()
        this.angleX = 0
        this.angleY = 0
        this.angleZ = 0
        this.offsetX = 0
        this.offsetY = 0
        this.offsetZ = 0
        this.rotateAxis = RotationAxis.X
    }
}