'use strict';

const validator = {};

validator.validSchedule = (value) => {
    let valid = true;
    // if (!['object', null, undefined].includes(typeof (value))) {
    //     valid = false;
    //     return valid;
    // }
    // for (const row of value || []) {
    //     for (const key of (Object.keys(row) || [])) {
    //         if (!['id_country', 'country', 'study_center', 'profession_title', 'year_init', 'month_init', 'year_end', 'month_end'].includes(key)) {
    //             value = false;
    //             break;
    //         }
    //         if (!value) { break; }
    //     }
    // }
    // return value;
    return true;
}

validator.validStudies = (value) => {
    let valid = true;
    if (!['object', null, undefined].includes(typeof (value))) {
        valid = false;
        return valid;
    }
    for (const row of value || []) {
        for (const key of (Object.keys(row) || [])) {
            if (!['id_country', 'country', 'study_center', 'profession_title', 'year_init', 'month_init', 'year_end', 'month_end'].includes(key)) {
                value = false;
                break;
            }
            if (!value) { break; }
        }
    }
    return value;
}

validator.validWorkExperence = (value) => {
    let valid = true;
    if (!['object', null, undefined].includes(typeof (value))) {
        valid = false;
        return valid;
    }
    for (const row of value || []) {
        for (const key of (Object.keys(row) || [])) {
            if (!['position', 'company', 'year_init', 'month_init', 'year_end', 'month_end', 'summary'].includes(key)) {
                value = false;
                break;
            }
            if (!value) { break; }
        }
    }
    return value;
}

module.exports = validator;