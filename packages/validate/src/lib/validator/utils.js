export const isCheckable = field => (/radio|checkbox/i).test(field.type);

export const isFile = field => field.getAttribute('type') === 'file';

export const isSelect = field => field.nodeName.toLowerCase() === 'select';

export const isSubmitButton = node =>  node.getAttribute('type') === 'submit' || node.nodeName === 'BUTTON';

export const hasNameValue = node => node.hasAttribute('name') && node.hasAttribute('value');

export const hasFormactionValue = node => node.hasAttribute('formaction') && node.getAttribute('formaction') !== '';

export const isRequired = group => group.validators.filter(validator => validator.type === 'required').length > 0;

export const groupIsHidden = fields => fields.reduce((acc, field) => {
    if (field.type === 'hidden') acc = true;
    return acc;
}, false);


export const hasValue = input => (input.value !== undefined && input.value !== null && input.value.length > 0);

export const groupValueReducer = (acc, input) => {
    if (!isCheckable(input) && hasValue(input)) acc = input.value;
    if (isCheckable(input) && input.checked) {
        if (Array.isArray(acc)) acc.push(input.value);
        else acc = [input.value];
    }
    return acc;
};

export const resolveGetParams = nodeArrays => nodeArrays.map(nodes => `${encodeURIComponent(nodes[0].getAttribute('name'))}=${encodeURIComponent(extractValueFromGroup(nodes))}`).join('&');

export const domNodesFromCommaList = list => list.split(',')
    .map(item => {
        // const resolvedSelector = escapeAttributeValue(appendStatePrefix(item, getStatePrefix(input.getAttribute('name'))));
        return [].slice.call(document.querySelectorAll(`[name=${escapeAttributeValue(item)}]`));
    });

export const escapeAttributeValue = value => value.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1');

/*
 * Only require below functions and resolvedSelector in domNodesFromCommaList if supporting *. params
 */
// const getStatePrefix = fieldName => fieldName.substr(0, fieldName.lastIndexOf('.') + 1);

// const appendStatePrefix = (value, prefix) => {
//     if (value.indexOf("*.") === 0) value = value.replace("*.", prefix);
//     return value;
// };

export const extractValueFromGroup = group => Object.prototype.hasOwnProperty.call(group, 'fields')
    ? group.fields.reduce(groupValueReducer, '')
    : group.reduce(groupValueReducer, '');


export const fetch = (url, props) =>
    /* istanbul ignore next */
    new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(props.method || 'GET', url);
        if (props.headers) {
            Object.keys(props.headers).forEach(key => {
                xhr.setRequestHeader(key, props.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
            else reject(xhr.statusText);
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(props.body);
    });

export const findErrorNodes = groups => Object.keys(groups).reduce((errorNodes, groupName) => {
    // if there's a server-rendered error message string we need to extract it into a DOM node
    // it can then be treated the same as a client-rendered error container node, or a text node rendered to a serverErrorNode
    if (groups[groupName].serverErrorNode){
        const serverErrorText = groups[groupName].serverErrorNode.textContent;
        if (serverErrorText) {
            groups[groupName].serverErrorNode.innerHTML = '';
            errorNodes[groupName] = groups[groupName].serverErrorNode.appendChild(document.createTextNode(serverErrorText));
        }
    }
    return errorNodes;
}, {});