/**
 * Joints class for storing 
 * joints data from posenet
 */
export default class Joints{

    /** the class constructor */
    constructor(){
        this.data = {
            'rightShoulder': (2.5)/2,
            'rightElbow': 0,
            'leftShoulder': (2.5)/2,
            'leftElbow': 0,
            'leftHip': 0,
            'rightHip': 0,
            'leftKnee': 0,
            'rightKnee': 0,
            'head': {
                'x': 0, 'y': 0
            }
        }
    }

    /** joint data setter */
    update(joint, val){
        this.data[joint] = val;
    }

    /** joint data getter */
    get(joint){
        return this.data[joint];
    }
}