import {IOttomanType, registerType, ValidationError} from 'ottoman';

/**
 * Custom type to manage the links
 */
export default class LinkType extends IOttomanType {
    constructor(name) {
        super(name, 'Link');
    }

    cast(value) {
        this.validate(value);
        return String(value);
    }

    validate(value: unknown, strict?: boolean): unknown {
        if (!isLink(String(value))) {
            throw new ValidationError(`Field ${this.name} only allows a Link`);
        }
        return String(value);
    }
}

/**
 * Factory function
 * @param name of field
 */
const linkTypeFactory = (name) => new LinkType(name);

/**
 * Register type on Schema Supported Types
 */
registerType(LinkType.name, linkTypeFactory);

/**
 * Check if value is a valid Link
 * @param value
 */
function isLink(value) {
    const regExp = new RegExp(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi,
    );
    return regExp.test(value);
};
