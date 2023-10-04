import * as React from 'react';
import {useSelector} from "react-redux";
import {ReduxTypes, UserTypes} from "../types";
import SinglePost from "../components/SinglePost";
import SingleUserInUsers from "../components/SingleUserInUsers";
import SingleUserInMessages from "../components/SingleUserInMessages";
import {useState} from "react";

const MessagePage = () => {
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    const allUsers: UserTypes.User[] = useSelector((state: ReduxTypes.ReduxStates) => state.states.allUsers)
    const [selectedUser, setSelectedUser] = useState<string>('')
    return (
        <div>
            {user && <div className='d-flex gap-3 p-5'>
                <div className='flex-1 d-flex flex-column gap-3'>
                    {allUsers &&
                        allUsers.map((item: UserTypes.User) =>
                            user.messages[item.username] && <SingleUserInMessages key={item._id} item={item} setSelectedUser={setSelectedUser}/>
                        )
                    }
                </div>
                <div className='flex-4'>
                    {user.messages[selectedUser] &&
                        <div>
                            <div className='d-flex flex-column gap-3 message-display'>
                                {user.messages[selectedUser].map((item: UserTypes.Message, index: number) =>
                                    <div className={`${item.sender === user.username && 'justify-content-end'} d-flex`}>
                                        <div className={`${item.sender === user.username && 'text-end'} message d-flex flex-column`}>
                                            <div>{item.sender}</div>
                                            <div>{item.value}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='toolbar'>
                                <input type="text" placeholder='Message'/>
                                <button className='send-button'>Send</button>
                            </div>
                        </div>
                    }
                </div>
            </div>}
        </div>
    );
};

export default MessagePage;