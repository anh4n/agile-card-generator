import Handlebars from 'handlebars';

Handlebars.registerHelper('getTruncatedText', (text, maxLength) => {

    if (text.length > maxLength) {
        let index = maxLength;
        while (text.charAt(index) !== ' ') {
            index--;
        }

        return text.substring(0, index) + ' ...'
    }

    return text;
});

export default Handlebars;
