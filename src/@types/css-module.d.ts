declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.less' {
    const classes: { [exportName: string]: string };
    export default classes;
}

declare module '*.less' {
    const classes: { [exportName: string]: string };
    export default classes;
}

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

// declare let require: {
//     <T>(path: string): T;
//     (paths: string[], callback: (...modules: any[]) => void): void;
//     ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
// };
