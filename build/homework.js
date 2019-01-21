var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//* 1
/**
 * addItemInfoDecorator - декоратор метода
 * @param target
 * @param propertyKey
 * @param descriptor
 */
function addItemInfoDecorator(target, propertyKey, descriptor) {
    let originalFunc = descriptor.value;
    descriptor.value = function () {
        let result = originalFunc.apply(this);
        result.date = new Date().toDateString();
        result.info = `${this.name} - $ ${this.price}`;
        return result;
    };
}
class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getItemInfo() {
        return {
            name: this.name,
            price: this.price
        };
    }
}
__decorate([
    addItemInfoDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Item.prototype, "getItemInfo", null);
let item = new Item('Apple', 100);
console.log(item.getItemInfo());
//* 2
function userDecorator(type) {
    return function (targetClass) {
        return class {
            constructor() {
                this.createDate = new Date().toDateString();
                this.type = type;
            }
        };
    };
}
let User = class User {
};
User = __decorate([
    userDecorator('admin')
], User);
const newUser = new User();
// console.log(newUser);
//* 3
// News api USA
var USA;
(function (USA) {
    class NewsService {
        constructor(id, title, text, author) {
            this.id = id;
            this.title = title;
            this.text = text;
            this.author = author;
            this.apiUrl = 'https://news_api_usa_url';
        }
        getNews() { } // method
    }
    USA.NewsService = NewsService;
})(USA || (USA = {}));
// News api Ukraine
var Ukraine;
(function (Ukraine) {
    class NewsService {
        constructor(uuid, title, body, author, date, imgUrl) {
            this.uuid = uuid;
            this.title = title;
            this.body = body;
            this.author = author;
            this.date = date;
            this.imgUrl = imgUrl;
            this.apiUrl = 'https://news_api_2_url';
        }
        getNews() { } // method get all news
        addToFavorite() { } // method add to favorites
    }
    Ukraine.NewsService = NewsService;
})(Ukraine || (Ukraine = {}));
const newsServiceUSA = new USA.NewsService(25, "title", "text", "author");
//* 4
class Junior {
    doTasks() {
        console.log('Actions!!!');
    }
}
class Middle {
    createApp() {
        console.log('Creating!!!');
    }
}
// Senior наследует Junior и Middle
class Senior {
    doTasks() { }
    createApp() { }
    createArchitecture() {
        console.log('I am the best of the best of the best!!!');
    }
}
// Реализация наследования
applyMixin(Senior, [Junior, Middle]);
function applyMixin(targetClass, baseClasses) {
    baseClasses.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
            targetClass.prototype[propName] = baseClass.prototype[propName];
        });
    });
}
let seniorPomidor = new Senior();
