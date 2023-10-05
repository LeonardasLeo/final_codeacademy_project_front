import * as React from 'react';
import {useSelector} from "react-redux";
import {ReduxTypes, UserTypes} from "../types";
import SingleUserInUsers from "../components/SingleUserInUsers";
import {useState} from "react";
import MessageModal from "../modals/MessageModal";

const UserPage = () => {
    const allUsers: UserTypes.User[] = useSelector((state: ReduxTypes.ReduxStates) => state.states.allUsers)
    const [isMessage, setIsMessage] = useState<boolean>(false)
    const [messageTo, setMessageTo] = useState<UserTypes.User>(undefined)

    return (
        <div>
            {isMessage && <MessageModal to={messageTo} setIsMessage={setIsMessage}/>}
            <div className={`d-flex gap-3 flex-wrap p-5 ${isMessage && 'opacity events-none'}`}>
                {allUsers &&
                    allUsers.map((item: UserTypes.User) =>
                        <SingleUserInUsers key={item._id} item={item} setIsMessage={setIsMessage} setMessageTo={setMessageTo}/>
                    )
                }
            </div>
        </div>
    );
};

export default UserPage;