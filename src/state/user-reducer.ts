

export type UserType = {
    age:number,
    name:string,
    childrenCount:number
}




export const UserReducer = (state:UserType,action:{type:string}):UserType => {
switch (action.type) {
    case 'SUM-AGE' :
        return {...state,age:state.age+=1}
    case 'ADD-CHILD':
        return {...state, childrenCount: state.childrenCount+=1}
    case 'Ali-SUM-AGE' :
        return {...state,age:state.age+=1}
    case 'Ali-ADD-CHILD':
        return {...state, childrenCount: state.childrenCount+=1}
    default: return state
}}

