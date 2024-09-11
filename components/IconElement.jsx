import { MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const IconElement = ({icon, iconSize, iconType}) => {
    if(iconType == 1) 
      return <MaterialIcons name={icon} size={iconSize ?? 18} color="black" className='justify-center'/>
    else if(iconType == 2) 
      return <Feather name={icon} size={iconSize ?? 18} color="black" className='justify-center'/>
    else if(iconType == 3) 
      return <AntDesign name={icon} size={iconSize ?? 18} color="black" className='justify-center'/>
}

export default IconElement