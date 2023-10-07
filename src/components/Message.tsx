import {UserTypes} from "../types";

type props = {
    item: UserTypes.Message,
    user: UserTypes.User
}

const Message = ({item, user}: props) => {
    function formatTimestamp(timestamp: Date): string {
        const date: Date = new Date(timestamp)
        return`${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}h`
    }

    return (
        <div className={`${item.sender === user.username && 'justify-content-end'} d-flex`}>
            <div className={`${item.sender === user.username && 'text-end'} message d-flex flex-column`}>
                <div>{item.sender}</div>
                <div>{item.value}</div>
                <div>{formatTimestamp(item.timestamp)}</div>
            </div>
        </div>
    );
};

export default Message;