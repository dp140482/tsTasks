var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API = 'https://jsonplaceholder.typicode.com/todos';
function getByHttp(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const body = yield response.json();
        return body;
    });
}
function getTodosByCount(count) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        try {
            data = yield getByHttp(API);
            for (let i = 0; i < count; i++) {
                console.log(data[i]);
            }
        }
        catch (error) {
            console.log("Error: ", error);
        }
    });
}
getTodosByCount(10);
