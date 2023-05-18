export const COLORS = {
    main: '#695cd4',
    grey: 'f4f6fa',
    black: "#000",
    iconColor: "#eaebef",
};

export const TEXT_SIZE = {
    title: 22,
    secondary: 14,
};

export const PADDING = {
    horizontal: 15,
    vertical: 15
};

export const dateParserFunction = (date) => {
    let options = {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };

    let timestamp = Date.parse(date);
    let dateParse = new Date(timestamp).toLocaleDateString('fr-FR', options);

    return dateParse.toString();
}

export const timestampParser = (num) => {
    let options = {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };
    let date = new Date(num).toLocaleDateString('fr-FR', options);

    return date.toString();
}