import {ReduxTypes, UserTypes} from "../types";
import {useSelector} from "react-redux";

const checkInteraction = (interaction: 'likes' | 'dislikes', item: UserTypes.Comment | UserTypes.Post): string => {
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    switch (interaction){
        case "likes":
            if (item.likes.includes(user.username)) return 'blue-text'
            break
        case "dislikes":
            if (item.dislikes.includes(user.username)) return 'blue-text'
            break
    }
}

export default checkInteraction