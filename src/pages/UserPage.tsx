import {useSelector} from "react-redux";
import {ReduxTypes, UserTypes} from "../types";
import {useState} from "react";
import SingleUserInUsers from "../components/SingleUserInUsers";
import MessageModal from "../modals/MessageModal";

const UserPage = () => {
    const allUsers: UserTypes.User[] = useSelector((state: ReduxTypes.ReduxStates) => state.states.allUsers)
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    const [isMessage, setIsMessage] = useState<boolean>(false)
    const [messageTo, setMessageTo] = useState<UserTypes.User>(undefined)

    return (
        <div>
            {isMessage && <MessageModal to={messageTo} setIsMessage={setIsMessage}/>}
            <div className={`d-flex gap-3 flex-wrap p-5 ${isMessage && 'opacity events-none'}`}>
                {allUsers && allUsers.length > 0 ?
                    allUsers.map((item: UserTypes.User) =>
                        item.username !== user.username &&
                        <SingleUserInUsers key={item._id} item={item} setIsMessage={setIsMessage} setMessageTo={setMessageTo}/>
                    )
                    :
                    <div className='white-text'>No users yet</div>
                }
            </div>
        </div>
    );
};

export default UserPage;