import WinChan from 'winchan';

const webathena_host = 'https://webathena.mit.edu';
const realm = 'ATHENA.MIT.EDU';
const principal = ['moira', 'moira7.mit.edu'];

/**
 * Logs in with WebAthena.
 * 
 * Returns a promise that resolves with the result,
 * or raise the error.
 */
export function loginWebathena() {

    // what did I do, selecting the JavaScript
    // with type checking?
    
    // TODO: try creating the 3 type of projects
    // and compare the differences to be able to
    // switch between the 3

    /** @type Function */ let resolve;
    /** @type Function */ let reject; 
    const promise = new Promise((resolver, rejecter) => {
        resolve = resolver;
        reject = rejecter;
    });
    WinChan.open({
        url: `${webathena_host}/#!request_ticket_v1`,
        relay_url: `${webathena_host}/relay.html`,
        params: { realm, principal },
    }, function (/** @type any */ err, /** @type any */ r) {
        if (err) {
            reject(err);
        } else if (r.status !== 'OK') {
            reject(err);
        } else {
            resolve(r.session);
        }
    });
    return promise;
}


export function encodeTicket(/** @type any */ webathena) {
    return btoa(JSON.stringify(webathena));
}

export function makeHeaders(/** @type any */ webathena) {
    return {
        'Authorization': `webathena ${encodeTicket(webathena)}`,
    }
}