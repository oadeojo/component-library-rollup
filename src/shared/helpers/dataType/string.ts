import { isNull } from './validate';

export function slugify(value: any) {
    if (isNull(value)) {
        return null;
    }

    return value
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}
