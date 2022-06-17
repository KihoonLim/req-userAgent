interface DetectReqOut {
  ip?: string,
  browser?: string,
  browserVersion?: string,
  os?: string,
  osVersion?: string,
  error?: any
}

export const GetClientInfo = (req: any): DetectReqOut => {
  try {
    const unknown = '-';

    //browser
    const nVer = req.appVersion;
    const nAgt = req.headers['user-agent'];

    let browser: string;
    let version: string;
    let nameOffset, verOffset, ix;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(verOffset + 5);
    }
    // Whale
    else if ((verOffset = nAgt.indexOf('Whale')) != -1) {
      browser = 'Whale';
      version = nAgt.substring(verOffset + 6);
    }
    // Edge
    else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
      browser = 'Microsoft Edge';
      version = nAgt.substring(verOffset + 4);
    }
    // SamsungBrowser
    else if ((verOffset = nAgt.indexOf('SamsungBrowser')) != -1) {
      browser = 'SamsungBrowser';
      version = nAgt.substring(verOffset + 15);
    }
    // NAVER
    else if ((verOffset = nAgt.indexOf('NAVER')) != -1) {
      browser = 'NAVER';
      version = nAgt.substring(verOffset + 26);
    }
    // KAKAOTALK
    else if ((verOffset = nAgt.indexOf('KAKAOTALK')) != -1) {
      browser = 'KAKAOTALK';
      version = nAgt.substring(verOffset + 10);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
      browser = 'Chrome';
      version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
      browser = 'Safari';
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
      browser = 'Firefox';
      version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    }
    // Other browsers
    else if (
      (nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))
    ) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) {
      version = version.substring(0, ix);
    }
    if ((ix = version.indexOf(' ')) != -1) {
      version = version.substring(0, ix);
    }
    if ((ix = version.indexOf(')')) != -1) {
      version = version.substring(0, ix);
    }

    // system
    let os = unknown;
    const clientStrings = [
      { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
      { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
      { s: 'Windows Vista', r: /Windows NT 6.0/ },
      { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
      { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
      { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
      { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
      { s: 'Windows 98', r: /(Windows 98|Win98)/ },
      { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
      { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: 'Windows CE', r: /Windows CE/ },
      { s: 'Windows 3.11', r: /Win16/ },
      { s: 'Android', r: /Android/ },
      { s: 'Open BSD', r: /OpenBSD/ },
      { s: 'Sun OS', r: /SunOS/ },
      { s: 'Linux', r: /(Linux|X11)/ },
      { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
      { s: 'Mac OS X', r: /Mac OS X/ },
      { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: 'QNX', r: /QNX/ },
      { s: 'UNIX', r: /UNIX/ },
      { s: 'BeOS', r: /BeOS/ },
      { s: 'OS/2', r: /OS\/2/ },
      {
        s: 'Search Bot',
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ];

    for (const id in clientStrings) {
      const cs = clientStrings[id];

      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }

    let osVersion = unknown;

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = 'Windows';
    }

    switch (os) {
      case 'Mac OS X':
        osVersion = /Mac OS X (\d+[\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'Android':
        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'iOS':
        osVersion = /OS ([\.\_\d]+)/.exec(nAgt)[1];
        break;
    }

    const detectInfo = {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      browser: browser,
      browserVersion: version,
      os: os,
      osVersion: osVersion,
    };

    return detectInfo;
  } catch (error) {
    return {
      error
    }
  }

};
