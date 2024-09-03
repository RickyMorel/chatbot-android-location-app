class Utils {
    static formatCurrency(price) {
        return `${Intl.NumberFormat('de-DE').format(price)} gs`
    }

    static getCutName(name, maxCharacterLength = 18) {
        let itemName = name
    
        if(itemName?.length > maxCharacterLength) {
            itemName = itemName.slice(0, 18) + "..."
        }

        return itemName
    }
}

export default Utils