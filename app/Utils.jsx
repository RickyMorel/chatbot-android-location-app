class Utils {
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
}

export default Utils