// declare module '*.css' {
//     const content: Record<string, string>;
//     export default content;
// }

// declare module '*.module.css' {
//     const classes: { [key: string]: string };
//     export default classes;
// }

// declare module '*.module.less' {
//     const classes: { [key: string]: string };
//     export default classes;
// }

declare module '*.css' {
    const classes: { [exportName: string]: string };
    export default classes;
}

declare module '*.less' {
    const classes: { [exportName: string]: string };
    export default classes;
}
