import XmlUtils from "../../utils/xmlUtil";

export default class SqsXmlComponent {
    __objectJsonQueue = {
        attributes: {},
        children: [
            {name: "", value: ""}
        ],
        getElementsByTagName: () =>([])
    };

    static builder() {
        return new SqsXmlComponent();
    }

    xmlParse(xml) {
        this.__objectJsonQueue = XmlUtils.mapperXmlToJson(xml);
        return this;
    }

    getQueueMessages() {
        const attributes = [];
        this.__objectJsonQueue.getElementsByTagName("ReceiveMessageResult")
            .map((item, index) => item.getElementsByTagName("Message"))[0]
            .map((item, index) => item.children)
            .forEach((data,i) => {
                const dataMsg = [];
                data.forEach((v,i) => (dataMsg[v.name] = v.value))
                attributes.push( Object.assign({}, dataMsg));
            });
        return attributes;
    }

    getQueueAttributes(nameQueue) {
        const attributes = [];
        this.__objectJsonQueue.getElementsByTagName("GetQueueAttributesResponse")
                .map((item, index) => item.getElementsByTagName("GetQueueAttributesResult"))[0]
                .map((a,i) => a.getElementsByTagName("Attribute"))[0]
                .map((a,i) => a.children)
                .forEach((data,i) => {
                    attributes[data[0].value] = data[1].value
                });
        attributes['queueUrl'] = nameQueue;
        return  Object.assign({}, attributes);
    }

    getQueueList() {
        const listQueues = []
        this.__objectJsonQueue.getElementsByTagName("ListQueuesResult")
                        .forEach((item, index) => item.children.forEach(({value},i) => listQueues.push(value)));
        return listQueues;
    }
}