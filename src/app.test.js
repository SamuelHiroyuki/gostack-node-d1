const rewire = require("rewire")
const app = rewire("./app")
const logRequest = app.__get__("logRequest")
const validateRepositoryId = app.__get__("validateRepositoryId")
// @ponicode
describe("logRequest", () => {
    test("0", () => {
        let callFunction = () => {
            logRequest("POST", 400, () => "George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            logRequest("POST", 429, () => "George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            logRequest("DELETE", 404, () => "George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            logRequest("POST", 200, () => "Anas")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            logRequest("DELETE", 500, () => "Jean-Philippe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            logRequest(undefined, -Infinity, () => "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("validateRepositoryId", () => {
    test("0", () => {
        let object = [["ponicode.com", "http://www.example.com/route/123?foo=bar", "ponicode.com"], ["http://www.croplands.org/account/confirm?t=", "https://api.telegram.org/", "http://base.com"], ["www.google.com", "Www.GooGle.com", "http://www.example.com/route/123?foo=bar"]]
        let callFunction = () => {
            validateRepositoryId({ params: object }, { status: () => 429 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object = [["https://croplands.org/app/a/confirm?t=", "http://www.croplands.org/account/confirm?t=", "www.google.com"], ["http://www.example.com/route/123?foo=bar", "http://www.croplands.org/account/confirm?t=", "http://www.croplands.org/account/confirm?t="], ["http://base.com", "https://", "https://twitter.com/path?abc"]]
        let callFunction = () => {
            validateRepositoryId({ params: object }, { status: () => 429 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object = [["http://www.croplands.org/account/confirm?t=", "https://api.telegram.org/", "Www.GooGle.com"], ["https://croplands.org/app/a/reset?token=", "http://base.com", "ponicode.com"], ["https://croplands.org/app/a/confirm?t=", "http://www.croplands.org/account/confirm?t=", "www.google.com"]]
        let callFunction = () => {
            validateRepositoryId({ params: object }, { status: () => 404 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let object = [["http://base.com", "http://base.com", "https://api.telegram.org/bot"], ["https://api.telegram.org/", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg"], ["http://www.croplands.org/account/confirm?t=", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", "https://"]]
        let callFunction = () => {
            validateRepositoryId({ params: object }, { status: () => 400 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object = [["http://base.com", "ponicode.com", "http://www.example.com/route/123?foo=bar"], ["https://accounts.google.com/o/oauth2/revoke?token=%s", "https://croplands.org/app/a/confirm?t=", "https://"], ["https://twitter.com/path?abc", "https://croplands.org/app/a/confirm?t=", "https://accounts.google.com/o/oauth2/revoke?token=%s"]]
        let callFunction = () => {
            validateRepositoryId({ params: object }, { status: () => 429 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            validateRepositoryId({}, { status: () => -Infinity }, () => "")
        }
    
        expect(callFunction).not.toThrow()
    })
})
