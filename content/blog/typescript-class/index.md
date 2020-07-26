---
title: 筆記：初探 Typescript — class
date: "2019-05-03T16:50:03.284Z"
description: "2019 年找前端工程師的心得"
---

主要是參考官網介紹 class 應用的[這篇](https://www.typescriptlang.org/docs/handbook/classes.html)所整理的筆記，此篇建議對 javascript 的 class 有一些基本的認識，還不熟 class 的可以參考：[阮一峰的 class 基本語法](https://es6.ruanyifeng.com/#docs/class)

## 前言

Typescript 的出現主要是想要解決原生 Javascript 為人詬病的一些問題，完全基於 Javascript，可以當成擴充版的 Javascript

本篇寫到的程式碼幾乎都是看官網，都可以貼到 [Typescript playground](https://www.typescriptlang.org/play) 看一下編譯狀況，

## classes

```jsx
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return "Hello, " + this.greeting
  }
}

let greeter = new Greeter("world")
```

首先先來一個基本款的 class，這個 class 有一個 property greeting、一個 constructor 跟一個 methods，最後用 `new` 來創造一個 instance greeter

然後編譯出來的 js 會長這樣

```typescript
"use strict"
class Greeter {
  constructor(message) {
    this.greeting = message
  }
  greet() {
    return "Hello, " + this.greeting
  }
}
let greeter = new Greeter("world")
```

## Inheritance

物件導向最重要的繼承

```jsx
class Animal {
  name: string
  constructor(theName: string) {
    this.name = theName
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...")
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...")
    super.move(distanceInMeters)
  }
}

let sam = new Snake("Sammy the Python")
let tom: Animal = new Horse("Tommy the Palomino")

sam.move()
tom.move(34)
```

可以看到 Snake 和 Horse 都繼承了 Animal 這個 class
btw 我們會稱繼承 class 的為 subclass（e.g. Snake & Horse），而主要的 class（e.g. Animal） 會稱為 superclass

可以發現 subclass 在 contructor 裡都 call super()，這是為了執行 superclass 的 constructor

> What’s more, before we ever access a property on this in a constructor body, we have to call super(). This is an important rule that TypeScript will enforce.

### Public, private, and protected modifiers

> In TypeScript, each member is public by default.

預設都是 public

```jsx
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```

### private

只能在自己本身的 class 裡使用，subclass 和外部都不能取用

以下面的例子來說，name 只能在 class Animal 使用

```jsx
class Animal {
    private name: string; // private
    constructor(theName: string) {
			this.name = theName;
		}
}

class Rabbit extends Animal {
    constructor(name: string) {
        super(name)
    }

    public getName() {
        return `hi ${this.name}`
//                        ~~~~
// Property 'name' is private and only accessible within class 'Animal'
    }
}

new Animal("Cat").name;
//                ~~~~
// Property 'name' is private and only accessible within class 'Animal'
```

Typescript 3.8 支援最新的 private 語法 `#` ，這是目前在 stage-3 階段的提案（[https://github.com/tc39/proposal-class-fields/](https://github.com/tc39/proposal-class-fields/)），在 typescript 搶先用！

用法很簡單，把要 private 的 property name 前面加一個前綴 #，取用時也都要加上前綴

```jsx
class Animal {
    #name: string;
    constructor(theName: string) {
      this.#name = theName;
    }
}

 new Animal("Cat").#name
```

基本上跟用 `private` modifier 是一樣的，當然還有一點點不一樣，之前再寫文章來講一下

可以先看這篇文章（[https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/#ecmascript-private-fields](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/#ecmascript-private-fields)）

### protected

可以用在本身的 class 和 subclass，外部不能取用

```jsx
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
//                                       ~~~~ 這邊 ok
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name);
//                 ~~~~
// Property 'name' is protected and only accessible within class 'Person' and its subclasses.
```

### Readonly

> Readonly properties must be initialized at their declaration or in the constructor.

只能在一開始的宣告或是 constructor 賦值，後面都不能重新賦值了

```jsx
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit";
//  ~~~~
// Cannot assign to 'name' because it is a read-only property.
```

## Accessors

typescript 透過 getter/setter 來更好的對 class object 做取直跟塞值的動作

```jsx
const fullNameMaxLength = 10;

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }

        this._fullName = newName;
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

有兩個注意點

1. 使用 accessor 編譯需要 ECMAScript 5 以上
2. 如果只有 get 沒有 set，會自動設置為 `readonly`

### Static

靜態語法，使用 static 語法的 property 或 method 就只會出現在 class 和 subclass 裡，instance 裡是不會出現的！

```jsx
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
//                             ~~~~
// 注意這裡是直接用 class，而不是 this
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);

console.log(Grid.origin) // {x: 0, y: 0};
console.log(grid1.origin)
//                ~~~~~~
// error: Property 'origin' is a static member of type 'Grid'
```

## Abstract classes

> Abstract classes are base classes from which other classes may be derived. They may not be instantiated directly.

抽象語法，能用在 class 或 methods

如果用在 class，表示不能直接被建成 instance

如果用在 methods，則不能有 methods 的內容，要透過 subclass 去實作

```jsx
abstract class Animal {
    abstract makeSound(): void {
//           ~~~~~~~~~~
// Error: Method 'makeSound' cannot have an implementation
// because it is marked abstract.
			console.log("makeSound");
		}
    move(): void {
        console.log("roaming the earth...");
    }
}

const r = new Animal()
//        ~~~~~~~~~~~~
// Error: Cannot create an instance of an abstract class.
```
