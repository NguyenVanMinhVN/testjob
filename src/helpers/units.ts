import { URL, parse } from 'url';
import * as jwt from 'jsonwebtoken';
import { BadRequestException } from '@nestjs/common';

// const phonePattern = /[(\+84)]?(0?[1-9][\., ]?[0-9]?|01[\., ]?[2689])[0-9]?[\., ]?[0-9]{1,4}[\., ]?[0-9]{1,4}[\., ]?[0-9]{1,4}/
// const emailPattern = /(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/

// export const isPhoneNumber = (phone: string, location = 'vn') => {
//     return !!formatPhone(phone, location)
// }
// export const isEmail = (text: string) => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     return re.test(text.toLowerCase())
// }
// export const formatPhone = (text: string, location = 'vn') => {
//     if (!text) return null
//     let check = true
//     let phoneNumber = (typeof text === 'string') ? text.replace(/^\+84/, '0').replace(/[^0-9]/g, '') : text
//     if (typeof phoneNumber.toString === 'function') {
//         phoneNumber = phoneNumber.toString()
//     }
//     // kiem tra chieu dai
//     if (location === 'vn') {
//         // loại bỏ đầu số +84 => 0
//         if (phoneNumber.length >= 11) {
//             phoneNumber = phoneNumber.replace(/^\+?84/, '0')
//         }
//         const dauso = phoneNumber.substring(0, 2)
//         if (phoneNumber.length < 10 || phoneNumber.length > 11) {
//             check = false
//         } else if (phoneNumber[0] !== '0') {
//             check = false
//         } else if ((dauso === '01' || dauso === '02') && (phoneNumber.length < 10 || phoneNumber.length > 11)) {
//             check = false
//         } else if (dauso !== '01' && dauso !== '02' && phoneNumber.length !== 10) {
//             check = false
//         }
//     }
//     if (check) {
//         return phoneNumber
//     } else {
//         return null
//     }
// }

// // console.debug(formatPhone('9099005000'))

// export const getPhonesFromText = (text: string, location = 'vn') => {
//     const phones = []
//     if (text) {
//         if (location === 'vn') {
//             const patternViPhone = '[(\+84)]?(0?[1-9][\., ]?[0-9]?|01[\., ]?[2689])[0-9]?[\., ]?[0-9]{1,4}[\., ]?[0-9]{1,4}[\., ]?[0-9]{1,4}'
//             const reg = new RegExp('(' + patternViPhone + ')', 'g')
//             const match = text.match(reg)
//             for (const i in match) {
//                 const phone_number = formatPhone(match[i])
//                 if (phone_number) {
//                     phones.push(phone_number)
//                 }
//             }
//         } else {
//             const reg = new RegExp(phonePattern, 'g')
//             const match = text.match(reg)
//             if (match) return match
//         }
//     }
//     return phones.filter(a => isPhoneNumber(a))
// }

// export const getEmailsFromText = (text) => {
//     const emails = []
//     if (text) {
//         const match = text.match(new RegExp(emailPattern, 'g'))
//         if (match && match.length) {
//             Object.assign(emails, match.map(a => a.trim()))
//         }
//     }
//     // console.log(emails)
//     return emails.filter(a => isEmail(a))
// }

// /**
//  * Xóa key có value là null, undefined, empty
//  * @param  {} obj
//  */
// export const cleanObject = (obj) => {
//     for (let key in obj) {
//         if (obj[key] !== null && typeof (obj[key]) === 'object') {
//             cleanObject(obj[key])
//         }
//         if (obj[key] === null || obj[key] === undefined || (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0)) {
//             delete obj[key]
//         }
//     }
//     return obj
// }
// /** 
//  * Copy value 
//  * @param  {} targetObj
//  * @param  {} sourceObj
//  */
// export const assignObject = (targetObj, sourceObj) => {
//     for (let key in targetObj) {
//         const typeOfT = typeof (targetObj[key])
//         const typeOfC = typeof (sourceObj[key])
//         // console.log({ key, typeOfT, typeOfC })
//         if (typeOfT === 'object' && typeOfC === 'object') {
//             assignObject(targetObj[key], sourceObj[key])
//         }
//         if (typeof typeOfC !== 'object' && typeOfC !== 'function' && typeOfC !== 'undefined' && sourceObj[key] !== null) {
//             // console.log('==================>>', key, targetObj[key], sourceObj[key])
//             targetObj[key] = sourceObj[key]
//         }
//     }
//     return targetObj
// }


// export const xoa_dau = (str) => {
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
//     str = str.replace(/đ/g, 'd')
//     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
//     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
//     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
//     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
//     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
//     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
//     str = str.replace(/Đ/g, 'D')
//     return str
// }



export const equalObjIds = (objId_1, objId_2) => {
    if (!objId_1 || !objId_2) return false
    const _id1 = (typeof objId_1.toString === 'function') ? objId_1.toString() : objId_1
    const _id2 = (typeof objId_2.toString === 'function') ? objId_2.toString() : objId_2
    return _id1 === _id2
}

export const sample = (items) => {
    if (!items || !items.length) return null
    return items[Math.floor(Math.random() * items.length)]
}

export const getKeyByValue = (object: Object, value: any) => {
    return Object.keys(object).find(key => object[key] === value);
}


export const generateToken = async (data: any, secretSignature: string, tokenLife: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !secretSignature || !tokenLife) {
                throw new BadRequestException('Missing required parameters');
            }

            const token = jwt.sign(
                data,
                secretSignature,
                {
                    algorithm: "HS256",
                    expiresIn: tokenLife,
                }
            );

            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
};
export const verifyToken = async (bearToken: string, secretKey: string): Promise<any> => {
    try {
        if (!bearToken || !secretKey) {
            throw new BadRequestException('Missing required parameters');
        }

        const tokenPrefix = 'Bearer ';
        if (!bearToken.startsWith(tokenPrefix)) {
            throw new BadRequestException('Invalid token format');
        }
        const token = bearToken.slice(tokenPrefix.length);

        const decoded = await jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
};
export function convertDateTime(valDate, typeDate) {
    if (valDate) {
        let date_val = new Date(valDate);
        if (typeDate === 0) {
            date_val.setHours(0, 0, 0, 0);
        } else {
            date_val.setHours(23, 59, 59, 999);
        }
        valDate = date_val.toISOString();
    }
    return valDate;
}

export function dateFormatterYMD(stringDate) {
    if (stringDate) {
        let dateFormat = new Date(stringDate);
        return `${dateFormat.getFullYear()}${(
            '0' +
            (dateFormat.getMonth() + 1)
        ).slice(-2)}${('0' + dateFormat.getDate()).slice(-2)}`;
    } else {
        return '';
    }
}

export function formatYMDFromDate(momentDate) {
    let dateFormat = new Date(momentDate);
    return `${dateFormat.getFullYear()}${(
        '0' +
        (dateFormat.getMonth() + 1)
    ).slice(-2)}${('0' + dateFormat.getDate()).slice(-2)}`;
}

export function dateFormatterFromDate(dateFormat) {
    return `${('0' + dateFormat.getDate()).slice(-2)}/${(
        '0' +
        (dateFormat.getMonth() + 1)
    ).slice(-2)}/${dateFormat.getFullYear()}`;
}

export function dateFormatter(stringDate) {
    if (stringDate) {
        let dateFormat = new Date(stringDate);
        return `${('0' + dateFormat.getDate()).slice(-2)}/${(
            '0' +
            (dateFormat.getMonth() + 1)
        ).slice(-2)}/${dateFormat.getFullYear()}`;
    } else {
        return '';
    }
}

export function filterRequest(params: any, deleted: boolean) {
    let query: { [key: string]: any } = {};
    if (deleted) {
        query.is_deleted = false;
    }

    if (Object.keys(params).length) {
        for (let key in params) {
            if (key === 'token') delete params.token;
            if (typeof params[key] === 'object') {
                let objQuery = params[key];
                for (let objKey in objQuery) {
                    if (objQuery[objKey]) {
                        if (!query[key]) query[key] = {};
                        let addQuery = query[key];
                        if (objKey === 'from') {
                            let from = convertDateTime(objQuery.from, 0);
                            addQuery.$gte = new Date(from);
                        } else if (objKey === 'to') {
                            let to = convertDateTime(objQuery.to, 1);
                            addQuery.$lte = new Date(to);
                        } else if (objKey === 'min') {
                            addQuery.$gte = +objQuery[objKey];
                        } else if (objKey === 'max') {
                            addQuery.$lte = +objQuery[objKey];
                        } else if (objKey === 'min_ne') {
                            addQuery.$gt = +objQuery[objKey];
                        } else if (objKey === 'max_ne') {
                            addQuery.$lt = +objQuery[objKey];
                        }
                        if (objKey === 'from-time') {
                            let from = convertDateTime(objQuery['from-time'], 2);
                            addQuery.$gt = new Date(from);
                        } else if (objKey === 'to-time') {
                            let to = convertDateTime(objQuery['to-time'], 2);
                            addQuery.$lt = new Date(to);
                        } else if (objKey === 'equal') {
                            query[key] = objQuery[objKey];
                        } else if (objKey === 'in') {
                            let data = objQuery[objKey];
                            query[key] = {
                                $in: data.split(','),
                            };
                        } else if (objKey === 'nin') {
                            let data = objQuery[objKey];
                            query[key] = {
                                $nin: data.split(','),
                            };
                        } else if (objKey === 'like') {
                            query[key] = new RegExp(objQuery.like, 'i');
                        }
                    }
                }
            } else if (
                key !== 'sort_by' &&
                key !== 'order_by' &&
                key !== 'page' &&
                key !== 'limit'
            ) {
                query[key] = params[key];
            }
        }
    }
    return query;
}
export interface IOptionsRequest {
    page: number;
    limit: number;
    pagination?: boolean;
    populate?: string[];
}
export function optionsRequest(params): IOptionsRequest {
    const { page, limit } = params;

    let options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: {},
    };
    options.sort = { created_at: -1 };

    if (params.sort_by) {
        options.sort = {
            [params.sort_by]: -1,
        };

        if (params.order_by) {
            options.sort = {
                [params.sort_by]: parseInt(params.order_by),
            };
        }
    }

    return options;
}