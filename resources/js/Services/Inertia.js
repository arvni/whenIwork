import {Inertia} from "@inertiajs/inertia";
import {useState} from "react";

const pageReload = ({page, filter, sort, pageSize}, {url, onStart, onFinish, setDefaultValues, only}) => {
    let filterValues = {};
    if (page)
        filterValues.page = page;
    if (filter) {
        filterValues.filterModel = filter;
    }
    if (sort)
        filterValues.sort = sort;
    if (pageSize)
        filterValues.pageSize = pageSize;
    setDefaultValues(prevState => ({...prevState, ...filterValues}));
    Inertia.visit(route(url), {
        data: filterValues,
        only: ["rooms", "status"],
        onStart,
        onFinish
    });
}

const useInertiaVisit = () => {
    const [loading, setLoading] = useState(false);

    const get = (url, only = [], data = {}) => Inertia.visit(url,
        {
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
            data,
            [only ? "only" : null]: only
        });

    return {loading, get};
}

export {
    pageReload, useInertiaVisit
};
