
import * as reduce from '../reducers/reducer';



export const setStudent = (student) => {
    return {
        type: reduce.STUDENT,
        payload: student
    }
}
