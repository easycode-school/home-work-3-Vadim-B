//* 1
/**
 * addItemInfoDecorator - декоратор метода
 * @param target 
 * @param propertyKey 
 * @param descriptor 
 */
function addItemInfoDecorator(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {

	let originalFunc = descriptor.value;

	descriptor.value = function () {
		let result = originalFunc.apply(this);
		result.date = new Date().toDateString();
		result.info = `${this.name} - $ ${this.price}`;

		return result;
	}
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string ,price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() {
        return {
            name: this.name,
            price: this.price
        };
    }
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());


//* 2

function userDecorator(type: string) {
	return function (targetClass) {
			return class {
					public createDate = new Date().toDateString();
					public type = type;
			}
	}
}

@userDecorator('admin')
class User {
}

const newUser = new User();
// console.log(newUser);


//* 3

// News api USA
namespace USA {
	export interface INews {
		id: number;
		title: string;
		text: string;
		author: string;
	}

	export class NewsService {
		constructor(
			public id: number,
			public title: string,
			public text: string,
			public author: string
		) {}

		protected apiUrl: string = 'https://news_api_usa_url'
		public getNews() {} // method
	}
}

// News api Ukraine
namespace Ukraine {
	export interface INews {
		uuid: string;
		title: string;
		body: string;
		author: string;
		date: string;
		imgUrl: string;
	}

	export class NewsService {
		constructor(
			public uuid: string,
			public title: string,
			public body: string,
			public author: string,
			public date: string,
			public imgUrl: string
		) {}

		protected apiUrl: string = 'https://news_api_2_url'
		public getNews() {} // method get all news
		public addToFavorite() {} // method add to favorites
	}
}

const newsServiceUSA: USA.INews = new USA.NewsService(25, "title", "text", "author");


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
class Senior implements Junior, Middle {
	doTasks(): void {}
	createApp(): void {}
	createArchitecture (): void {
		console.log('I am the best of the best of the best!!!');
	}
}

// Реализация наследования
applyMixin(Senior, [Junior, Middle]);

function applyMixin(targetClass: any, baseClasses: any[]) {
	baseClasses.forEach((baseClass) => {
		Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
			targetClass.prototype[propName] = baseClass.prototype[propName];
		});
	});
}

let seniorPomidor = new Senior();