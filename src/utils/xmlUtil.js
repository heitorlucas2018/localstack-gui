import XMLParse from 'react-xml-parser';

export default class XmlUtils {
    static mapperXmlToJson(data) {
        const xml = new XMLParse().parseFromString(data);
        return xml
    }
}