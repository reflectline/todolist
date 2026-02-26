import {UserReducer, UserType} from './user-reducer';

test('user should increment only age', () => {
    const user: UserType = {
        age: 5,
        name: 'Vova',
        childrenCount:2
    }
    UserReducer(user, {type: 'SUM-AGE'})
    expect(user.age).toBe(6)
    expect(user.childrenCount).toBe(2)

})
test('user should increment only childrens', () => {

    const user: UserType = {
        age: 5,
        name: 'Vova',
        childrenCount:2
    }
     UserReducer(user, {type: 'ADD-CHILD'})
    expect(user.age).toBe(5)
    expect(user.childrenCount).toBe(3)

})

test('user should increment only age', () => {
    const user: UserType = {
        age: 45,
        name: 'Ali',
        childrenCount:5
    }
    UserReducer(user, {type: 'Ali-SUM-AGE'})
    expect(user.age).toBe(46)
    expect(user.childrenCount).toBe(5)

})
test('user should increment only childrens', () => {

    const user: UserType = {
        age: 45,
        name: 'Ali',
        childrenCount:5
    }
    UserReducer(user, {type: 'Ali-ADD-CHILD'})
    expect(user.age).toBe(45)
    expect(user.childrenCount).toBe(6)

})