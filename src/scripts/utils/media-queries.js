let breakpoints = getStylePropValue('--breakpoints-list').split('-')
    .reduce((breakpoints, breakpoint) => {
        breakpoints[breakpoint] = parseFloat(getStylePropValue(`--breakpoint-${breakpoint}`));

        return breakpoints;
    }, {});

function mqUp(breakpoint, returnMql = false) {
    breakpoint = formattedBreakpointValue(breakpoints[breakpoint] || breakpoint);
    let mql = window.matchMedia(`(min-width: ${breakpoint})`);

    return returnMql ? mql : mql.matches;
}

function mqDown(breakpoint, returnMql = false) {
    breakpoint = formattedBreakpointValue(breakpoints[breakpoint] || breakpoint, !!breakpoints[breakpoint]);
    let mql = window.matchMedia(`(max-width: ${breakpoint})`);

    return returnMql ? mql : mql.matches;
}

function mqBetween(breakpointFrom, breakpointTo, returnMql = false) {
    breakpointFrom = formattedBreakpointValue(breakpoints[breakpointFrom] || breakpointFrom);
    breakpointTo = formattedBreakpointValue(breakpoints[breakpointTo] || breakpointTo, !!breakpoints[breakpointTo]);
    let mql = window.matchMedia(`(min-width: ${breakpointFrom}) and (max-width: ${breakpointTo})`);

    return returnMql ? mql : mql.matches;
}

function formattedBreakpointValue(value, max = false) {
    return `${max ? value - 0.02 : value}px`;
}

function getStylePropValue(prop) {
    return window.getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
}

export {
    breakpoints,
    mqUp,
    mqDown,
    mqBetween
}
