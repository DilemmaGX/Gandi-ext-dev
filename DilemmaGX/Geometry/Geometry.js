const ext_id = 'Geometry';
const ext_cov = '';
const ext_ico = '';

class Geometry {
    _formatMessage
    runtime
    constructor(runtime) {
        this.runtime = runtime
        this._formatMessage = runtime.getFormatMessage({
            'zh-cn': {
                'extensionName': '几何',

                'f.p2d': '[x][y]', 't.p2d': '❓创建一个二维点',
                'f.p3d': '[x][y][z]', 't.p3d': '❓创建一个三维点',
                'f.p2d.component': '二维点[p]的[component]坐标', 't.p2d.component': '❓获取二维点的参数',
                'f.p3d.component': '三维点[p]的[component]坐标', 't.p3d.component': '❓获取三维点的参数',

                'f.cal': '[p1][cal][p2]', 't.cal': '⚠️仅支持同维的两个点',
                'f.dot': '[p1]和[p2]的点积', 't.dot': '⚠️仅支持同维的两个点',
                'f.cross': '[p1]和[p2]的叉积', 't.cross': '⚠️仅支持同维的两个点',
                'f.rotate': '[p1]绕[p2]旋转[p3]度', 't.rotate': '⚠️仅支持同维的两个点\n❓三维点旋转参数需要是三维向量\n❓二维点旋转参数需要是数字\n❓采用度数制', // Note: Incomplete
            },

            en: {
                'extensionName': 'Geometry',
            }
        })
    }
    formatMessage(id) {
        return this._formatMessage({
            id,
            default: id,
            description: id
        })
    }
    getInfo() {
        return {
            id: ext_id,
            name: this.formatMessage('extensionName'),
            color1: '#114514',
            color2: '#114514',
            color3: '#114514',
            menuIconURI: ext_ico,
            blockIconURI: ext_ico,
            blocks: [
                {
                    disableMonitor: true,
                    opcode: "p2d",
                    blockType: "reporter",
                    text: this.formatMessage('f.p2d'),
                    tooltip: this.formatMessage('t.p2d'),
                    arguments: {
                        x: { type: "number", defaultValue: 0 },
                        y: { type: "number", defaultValue: 0 },
                    },
                },
                {
                    disableMonitor: true,
                    opcode: "p3d",
                    blockType: "reporter",
                    text: this.formatMessage('f.p3d'),
                    tooltip: this.formatMessage('t.p3d'),
                    arguments: {
                        x: { type: "number", defaultValue: 0 },
                        y: { type: "number", defaultValue: 0 },
                        z: { type: "number", defaultValue: 0 },
                    },
                },
                {
                    disableMonitor: true,
                    opcode: "p2dc",
                    blockType: "reporter",
                    text: this.formatMessage('f.p2d.component'),
                    tooltip: this.formatMessage('t.p2d.component'),
                    arguments: {
                        p: { type: "string", defaultValue: 0, defaultValue: '[0,0]' },
                        component: { type: "number", menu: "component2d" },
                    },
                },
                {
                    disableMonitor: true,
                    opcode: "p3dc",
                    blockType: "reporter",
                    text: this.formatMessage('f.p3d.component'),
                    tooltip: this.formatMessage('t.p3d.component'),
                    arguments: {
                        p: { type: "string", defaultValue: '[0,0,0]' },
                        component: { type: "number", defaultValue: 0, menu: "component3d" },
                    },
                },
                {
                    disableMonitor: true,
                    opcode: "cal",
                    blockType: "reporter",
                    text: this.formatMessage('f.cal'),
                    tooltip: this.formatMessage('t.cal'),
                    arguments: {
                        p1: { type: "string" },
                        p2: { type: "string" },
                        cal: { type: "string", defaultValue: '+', menu: "calculate" },
                    },
                },
                {
                    disableMonitor: true,
                    opcode: "dot",
                    blockType: "reporter",
                    text: this.formatMessage('f.dot'),
                    tooltip: this.formatMessage('t.dot'),
                    arguments: {
                        p1: { type: "string" },
                        p2: { type: "string" },
                    },
                },
                {
                    disableMonitor: true,
                    opcode: "cross",
                    blockType: "reporter",
                    text: this.formatMessage('f.cross'),
                    tooltip: this.formatMessage('t.cross'),
                    arguments: {
                        p1: { type: "string" },
                        p2: { type: "string" },
                    },
                },
                {
                    disableMonitor: true,
                    opcode: "rotate",
                    blockType: "reporter",
                    text: this.formatMessage('f.rotate'),
                    tooltip: this.formatMessage('t.rotate'),
                    arguments: {
                        p1: { type: "string" },
                        p2: { type: "string" },
                        p3: { type: "string" },
                    },
                },
            ],
            menus: {
                component2d: {
                    items: [
                        { text: "x", value: 0 },
                        { text: "y", value: 1 },
                    ],
                    acceptReporters: false,
                },
                component3d: {
                    items: [
                        { text: "x", value: 0 },
                        { text: "y", value: 1 },
                        { text: "z", value: 2 },
                    ],
                    acceptReporters: false,
                },
                calculate: {
                    items: [
                        { text: "+", value: "+" },
                        { text: "-", value: "-" },
                        { text: "×", value: "*" },
                        { text: "÷", value: "/" },
                    ],
                    acceptReporters: false,
                },
            }
        }
    }
    p2d({ x, y }) { return JSON.stringify([Number(x), Number(y)]) }
    p3d({ x, y, z }) { return JSON.stringify([Number(x), Number(y), Number(z)]) }
    p2dc({ p, component }) { try { return JSON.parse(p)[Number(component)] } catch (e) { return "undefined" } }
    p3dc({ p, component }) { try { return JSON.parse(p)[Number(component)] } catch (e) { return "undefined" } }
    cal({ p1, p2, cal }) {
        let a = JSON.parse(p1);
        let b = JSON.parse(p2);
        if (a.length === b.length) {
            let r = [];
            for (let i = 0; i < a.length; i++) {
                if (cal === "+") { r.push(p1[i] + p2[i]) }
                else if (cal === "-") { r.push(p1[i] - p2[i]) }
                else if (cal === "*") { r.push(p1[i] * p2[i]) }
                else if (cal === "/") { r.push(p1[i] / p2[i]) }
                else { console.error(`Geometry.js: Unexpected calculation sign "${cal}"`); return "undefined" }
            }
            return JSON.stringify(r);
        }
        return "undefined";
    }
    dot(args) {
        let p1 = JSON.parse(args.p1);
        let p2 = JSON.parse(args.p2);
        if (p1.length !== p2.length) {
            return "undefined";
        }
        if (p1.length === 2) {
            return String(p1[0] * p2[0] + p1[1] * p2[1]);
        }
        if (p1.length === 3) {
            return String(p1[0] * p2[0] + p1[1] * p2[1] + p1[2] * p2[2]);
        }
        return "undefined";
    }
    cross(args) {
        let p1 = JSON.parse(args.p1);
        let p2 = JSON.parse(args.p2);
        if (p1.length !== p2.length) {
            return "undefined";
        }
        if (p1.length === 2) {
            return JSON.stringify([p1[0] * p2[1], p1[1] * p2[0]]);
        }
        else if (p1.length === 3) {
            return JSON.stringify([
                p1[0] * p2[1] - p1[1] * p2[0],
                p1[0] * p2[2] - p1[2] * p2[0],
                p1[1] * p2[2] - p1[2] * p2[1],
            ]);
        }
        return "undefined";
    }
    rotate(args) { // TODO: rewrite
        let p1 = JSON.parse(args.p1);
        let p2 = JSON.parse(args.p2);
        try { var p3 = JSON.parse(args.p3); for (let i = 0; i < p3.length; i++) { p3[i] *= (Math.PI / 180) } } catch (e) { try { var p3 = Number(args.p3) * (Math.PI / 180) } catch (_) { return "undefined" } }
        if (p1.length !== p2.length) return "undefined";
        if (p1.length === 2 && typeof p3 === 'number') {
            p1[0] -= p2[0];
            p1[1] -= p2[1];

            const sinAndCos = [Math.sin(p3 * (Math.PI / 180)), Math.cos(p3 * (Math.PI / 180))];

            let temp = p1[0];

            p1[0] = p1[1] * sinAndCos[0] + p1[0] * sinAndCos[1];
            p1[1] = p1[1] * sinAndCos[1] - temp * sinAndCos[0];

            p1[0] += p2[0];
            p1[1] += p2[1];

            return JSON.stringify(p1);
        }
        else if (p1.length === 3 && typeof (p3) === 'object' && p3.length === 3) {
            p1[0] -= p2[0];
            p1[1] -= p2[1];
            p1[2] -= p2[2];

            const sinAndCos = [
                Math.sin(p3[0] * (Math.PI / 180)),
                Math.cos(p3[0] * (Math.PI / 180)),
                Math.sin(p3[1] * (Math.PI / 180)),
                Math.cos(p3[1] * (Math.PI / 180)),
                Math.sin(p3[2] * (Math.PI / 180)),
                Math.cos(p3[2] * (Math.PI / 180)),
            ];

            let temp = p1[0];

            p1[0] = p1[2] * sinAndCos[0] + p1[0] * sinAndCos[1];
            p1[2] = p1[2] * sinAndCos[1] - temp * sinAndCos[0];

            temp = p1[1];

            p1[1] = p1[2] * sinAndCos[2] + p1[1] * sinAndCos[3];
            p1[2] = p1[2] * sinAndCos[3] - temp * sinAndCos[2];

            temp = p1[0];

            p1[0] = p1[1] * sinAndCos[4] + p1[0] * sinAndCos[5];
            p1[1] = p1[1] * sinAndCos[5] - temp * sinAndCos[4];

            p1[0] += p2[0];
            p1[1] += p2[1];
            p1[2] += p2[2];

            return JSON.stringify(p1);
        }
        return "undefined";
    }
}

window.tempExt = {
    Extension: Geometry,
    info: {
        name: 'Geo.extensionName',
        description: 'Geo.description',
        extensionId: ext_id,
        iconURL: ext_cov,
        insetIconURL: ext_ico,
        featured: true,
        disabled: false,
        collaborator: '官方小傲娇 @ CCW',
        collaboratorURL: 'https://www.ccw.site/student/62f76ddb49c5dc44ac0c03c0',
        collaboratorList: [
            {
                collaborator: '官方小傲娇 @ CCW',
                collaboratorURL: 'https://www.ccw.site/student/62f76ddb49c5dc44ac0c03c0'
            },
        ]
    },
    l10n: {
        'zh-cn': {
            'Geo.extensionName': '几何',
            'Geo.description': '从未感觉如此真实',
        },
        en: {
            'Geo.extensionName': 'Geometry',
            'Geo.description': 'Never considered to be such realistic',
        }
    }
}