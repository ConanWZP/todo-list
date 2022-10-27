import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import React from "react";


let state = {
    postsData: [
        {userId: 1, message: 'Hi, how are you?', like: 15},
        {userId: 2, message: 'First-post', like: 22},
        {userId: 3, message: 'Oooo', like: 12},
        {userId: 4, message: 'What', like: 10},
    ]
};

/*it('length of posts should be increased', () => {
    // 1. test data
    let action = addPostActionCreator('Текст экшона');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.postsData.length).toBe(5);
});*/


it('b', () => {
    // 1. test data
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.postsData.length).toBe(3);
});
