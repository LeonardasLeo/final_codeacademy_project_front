import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

type props = {
    options: string[]
    onSelect: (item: string) => void
}
const Select = ({options, onSelect}: props) => {
    const [selected, setSelected] = useState<string>(options[0])
    const [isDropDown, setIsDropDown] = useState<boolean>(false)

    return (
        <div className='select-component' style={{position: 'relative', color: 'black'}}  onClick={() => setIsDropDown(!isDropDown)}>
            <div className='d-flex align-items-center justify-content-between gap-2'>
                <div>{selected}</div>
                <FontAwesomeIcon style={{fontSize: '12px'}} icon={faAngleDown} />
            </div>
            {isDropDown &&
                <div className='custom-dropdown'>
                    {options.map((item: string, index: number) =>
                            <div key={index} onClick={(): void => {
                                setSelected(item)
                                onSelect(item)
                                setIsDropDown(false)
                            }}>{item}</div>
                    )}
                </div>
            }
        </div>
    );
};

export default Select;