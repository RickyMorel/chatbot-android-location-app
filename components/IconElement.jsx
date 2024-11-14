import { MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const IconElement = ({icon, iconSize, iconType, color}) => {
    if(iconType == 1) 
      return <MaterialIcons name={icon} size={iconSize ?? 18} color={color ?? "black"} className='justify-center'/>
    else if(iconType == 2) 
      return <Feather name={icon} size={iconSize ?? 18} color={color ?? "black"} className='justify-center'/>
    else if(iconType == 3) 
      return <AntDesign name={icon} size={iconSize ?? 18} color={color ?? "black"} className='justify-center'/>
    else if(iconType == 4) 
      return <FontAwesome5 name={icon} size={iconSize ?? 18} color={color ?? "black"} className='justify-center'/>
}

export default IconElement