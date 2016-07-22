/**
 * Created by alexander on 14.07.16.
 */
const colors = require('colors');

const no = (what) => {
    console.warn(`no ${what}s...\n`);
};

function attrLog(name, attrs, logFn) {
    let count = attrs.length;
    attrs.forEach((attr) => {
        console.log(`${name} #${count--}`);
        console.log(logFn(attr));
    });
}

const subAttrs = (attrs) => {
    let name = attrs[0].constructor.name;
    switch (name) {
        case 'Event':
            attrLog(name, attrs,
                (attr) => `${attr.type} by ${attr.actor} on repo ${attr.repo}\n`);
            break;
        case 'Subscription':
            attrLog(name, attrs,
                (attr) => `'${attr.name}' owned by ${attr.owner}\n`);
            break;
        case 'User':
        default:
            attrLog(name, attrs,
                (attr) => `${attr.name}\n`);
    }
};

const logPatch = (patch) => {
    let regex = /^(?!(@@))[\s\S]+/gm;
    let lines = regex.exec(patch);
    let splitted = lines[0].split(/\r?\n/);
    for (let line of splitted) {
        switch(line.charAt(0)) {
            case '+':
                console.log(line.green);
                break;
            case '-':
                console.log(line.red);
                break;
            default:
                console.log(line);
        }
    }
};

module.exports = {
    no,
    subAttrs,
    logPatch
};