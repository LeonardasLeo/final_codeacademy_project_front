import {UserTypes} from "../types";
import useFormatTime from "../hooks/useFormatTime.ts";

type props = {
    item: UserTypes.Message,
    user: UserTypes.User
}

const Message = ({item, user}: props) => {
    return (
        <div className={`${item.sender === user.username && 'justify-content-end'} d-flex`}>
            <div className={`${item.sender === user.username && 'text-end'} message d-flex flex-column`}>
                <div>{item.sender} | {useFormatTime(item.timestamp)}</div>
                <div>{item.value}</div>
            </div>
        </div>
    );
};

export default Message;