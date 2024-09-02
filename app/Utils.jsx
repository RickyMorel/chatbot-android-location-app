class Utils {
    static formatCurrency(price) {
        return `${Intl.NumberFormat('de-DE').format(price)} gs`
    }
}

export default Utils