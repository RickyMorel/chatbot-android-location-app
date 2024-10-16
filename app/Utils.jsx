class Utils {
    static backendLink = "https://ec2-18-228-211-145.sa-east-1.compute.amazonaws.com"

    static formatCurrency(price) {
        return `${Intl.NumberFormat('de-DE').format(price)} gs`
    }

    static formatPhoneNumber(phoneNumber) {
        const formattedPhone = `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 9)} ${phoneNumber.slice(9)}`;

        return formattedPhone;
    }

    static getCutName(name, maxCharacterLength = 18) {
        let itemName = name
    
        if(itemName?.length > maxCharacterLength) {
            itemName = itemName.slice(0, maxCharacterLength) + "..."
        }

        return itemName
    }

    // static getDistanceFromLatLonInKm(location1, location2) {
    //     const lat1 = location1.lat
    //     const lon1 = location1.lng
    //     const lat2 = location2.lat
    //     const lon2 = location2.lng
    //     const R = 6371; // Radius of the Earth in kilometers
    //     const dLat = Utils.deg2rad(lat2 - lat1);  // Difference in latitude
    //     const dLon = Utils.deg2rad(lon2 - lon1);  // Difference in longitude
    //     const a = 
    //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //       Math.cos(Utils.deg2rad(lat1)) * Math.cos(Utils.deg2rad(lat2)) * 
    //       Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    //     const distance = R * c; // Distance in kilometers
    //     return distance;
    // }

    static getDistanceFromLatLonInKm(point1, point2) {
        const toRadians = (degrees) => degrees * (Math.PI / 180);

        console.log("point1", point1, "point2", point2)
      
        const R = 6371; // Earth's radius in kilometers
        const lat1 = toRadians(point1.lat);
        const lat2 = toRadians(point2.lat);
        const deltaLat = toRadians(point2.lat - point1.lat);
        const deltaLng = toRadians(point2.lng - point1.lng);
      
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        return R * c; // Distance in kilometers
    }

    static deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
}

export default Utils