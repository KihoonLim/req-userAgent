"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUserAgent = exports.GetClientInfo = void 0;
const GetClientInfo = (req) => {
    try {
        const nAgt = req.headers["user-agent"] || "";
        const { os, osVersion, browser, browserVersion } = (0, exports.parseUserAgent)(nAgt);
        const detectInfo = {
            ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
            browser,
            browserVersion,
            os: os,
            osVersion,
        };
        return detectInfo;
    }
    catch (error) {
        return {
            error,
        };
    }
};
exports.GetClientInfo = GetClientInfo;
const parseUserAgent = (userAgent) => {
    const unknown = "-";
    const _userAgent = userAgent || "";
    let browser = "UNDEFINED";
    let browserVersion = "";
    let nameOffset, verOffset;
    // Opera
    if ((verOffset = _userAgent.indexOf("Opera")) != -1) {
        browser = "Opera";
        browserVersion = _userAgent.substring(verOffset + 6);
        if ((verOffset = _userAgent.indexOf("Version")) != -1) {
            browserVersion = _userAgent.substring(verOffset + 8);
        }
    }
    // MSIE
    else if ((verOffset = _userAgent.indexOf("MSIE")) != -1) {
        browser = "Microsoft Internet Explorer";
        browserVersion = _userAgent.substring(verOffset + 5);
    }
    // Whale
    else if ((verOffset = _userAgent.indexOf("Whale")) != -1) {
        browser = "Whale";
        browserVersion = _userAgent.substring(verOffset + 6);
    }
    // Edge
    else if ((verOffset = _userAgent.indexOf("Edg")) != -1) {
        browser = "Microsoft Edge";
        browserVersion = _userAgent.substring(verOffset + 4);
    }
    // SamsungBrowser
    else if ((verOffset = _userAgent.indexOf("SamsungBrowser")) != -1) {
        browser = "SamsungBrowser";
        browserVersion = _userAgent.substring(verOffset + 15);
    }
    // NAVER
    else if ((verOffset = _userAgent.indexOf("NAVER")) != -1) {
        browser = "NAVER";
        browserVersion = _userAgent.substring(verOffset + 26);
    }
    // KAKAOTALK
    else if ((verOffset = _userAgent.indexOf("KAKAOTALK")) != -1) {
        browser = "KAKAOTALK";
        browserVersion = _userAgent.substring(verOffset + 10);
    }
    // Chrome
    else if ((verOffset = _userAgent.indexOf("Chrome")) != -1) {
        browser = "Chrome";
        browserVersion = _userAgent.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = _userAgent.indexOf("Safari")) != -1) {
        browser = "Safari";
        browserVersion = _userAgent.substring(verOffset + 7);
        if ((verOffset = _userAgent.indexOf("Version")) != -1) {
            browserVersion = _userAgent.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset = _userAgent.indexOf("Firefox")) != -1) {
        browser = "Firefox";
        browserVersion = _userAgent.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (_userAgent.indexOf("Trident/") != -1) {
        browser = "Microsoft Internet Explorer";
        browserVersion = _userAgent.substring(_userAgent.indexOf("rv:") + 3);
    }
    // Other browsers
    else if ((nameOffset = _userAgent.lastIndexOf(" ") + 1) <
        (verOffset = _userAgent.lastIndexOf("/"))) {
        browser = _userAgent.substring(nameOffset, verOffset);
        browserVersion = _userAgent.substring(verOffset + 1);
    }
    browserVersion = browserVersion.replace(/(;|\s|\)).*/, "");
    const clientOsMatcher = [
        { os: "Windows", r: /(Windows 10.0|Windows NT 10.0)/, v: "10" },
        { os: "Windows", r: /(Windows 8.1|Windows NT 6.3)/, v: "8.1" },
        { os: "Windows", r: /(Windows 8|Windows NT 6.2)/, v: "8" },
        { os: "Windows", r: /(Windows 7|Windows NT 6.1)/, v: "7" },
        { os: "Windows", r: /Windows NT 6.0/, v: "Vista" },
        { os: "Windows", r: /Windows NT 5.2/, v: "Server 2003" },
        { os: "Windows", r: /(Windows NT 5.1|Windows XP)/, v: "XP" },
        { os: "Windows", r: /(Windows NT 5.0|Windows 2000)/, v: "2000" },
        { os: "Windows", r: /(Win 9x 4.90|Windows ME)/, v: "ME" },
        { os: "Windows", r: /(Windows 98|Win98)/, v: "98" },
        { os: "Windows", r: /(Windows 95|Win95|Windows_95)/, v: "95" },
        {
            os: "Windows",
            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
            v: "NT 4.0",
        },
        { os: "Windows", r: /Windows CE/, v: "CE" },
        { os: "Windows", r: /Win16/, v: "3.11" },
        {
            os: "Android",
            r: /Android/,
            getV: () => /Android ([\.\_\d]+)/.exec(_userAgent)[1],
        },
        { os: "Open BSD", r: /OpenBSD/ },
        { os: "Sun OS", r: /SunOS/ },
        { os: "Linux", r: /(Linux|X11)/ },
        {
            os: "iOS",
            r: /(iPhone|iPad|iPod)/,
            getV: () => /OS ([\.\_\d]+)/.exec(_userAgent)[1],
        },
        {
            os: "Mac OS X",
            r: /Mac OS X/,
            getV: () => /Mac OS X (\d+[\.\_\d]+)/.exec(_userAgent)[1],
        },
        { os: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        { os: "QNX", r: /QNX/ },
        { os: "UNIX", r: /UNIX/ },
        { os: "BeOS", r: /BeOS/ },
        { os: "OS/2", r: /OS\/2/ },
        {
            os: "Search Bot",
            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
        },
    ];
    const matched = clientOsMatcher.find((it) => it.r.test(_userAgent));
    const os = matched ? matched.os : unknown;
    let osVersion;
    switch (os) {
        case "Mac OS X":
        case "Android":
        case "iOS":
            osVersion = matched.getV();
            break;
        case "Windows":
            osVersion = matched.v;
            break;
        default:
            osVersion = unknown;
    }
    return {
        os,
        osVersion,
        browser,
        browserVersion,
    };
};
exports.parseUserAgent = parseUserAgent;
//# sourceMappingURL=index.js.map