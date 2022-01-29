type Coordinates = [number, number];

class MyVector2D {
    private _pair: Coordinates;
    constructor(x: number, y: number) {
        this._pair = [x, y];
    }
    get x() { return this._pair[0]; }
    get y() { return this._pair[1]; }
    set x(value: number) { this._pair[0] = value; }
    set y(value: number) { this._pair[1] = value; }
    move(vec: MyVector2D): void {
        this._pair[0] += vec.x;
        this._pair[1] += vec.y;
    }
    add(vec: MyVector2D): MyVector2D {
        return new MyVector2D(this._pair[0] + vec.x, this._pair[1] + vec.y);
    }
    toString() {
        return `(${this._pair[0]}, ${this._pair[1]})`;
    }
}

abstract class MyGraphicsPrimitive2D {
    vertex: MyVector2D;
    width: number;
    height: number;
    constructor() {
        this.vertex = new MyVector2D(0, 0);
        this.height = this.width = 0;
    }
    move(vec: MyVector2D): void {
        this.vertex.move(vec);
    }
}

abstract class MyAreaPrimitive2D extends MyGraphicsPrimitive2D {
    constructor() { super(); }
    get area(): number {
        return this.width * this.height;
    }
}

class MyRectangle extends MyAreaPrimitive2D {
    constructor(width?: number, height?: number) {
        super();
        if (width) this.width = width;
        if (height) this.height = height;
    }
    get upperLeftVertex() {
        return this.vertex.add(new MyVector2D(this.vertex.x, this.vertex.y + this.height));
    }
    get lowerRightVertex() {
        return this.vertex.add(new MyVector2D(this.vertex.x + this.width, this.vertex.y));
    }
}

class MyCircle extends MyAreaPrimitive2D {
    private _c: MyVector2D;
    private _r: number;
    constructor(x?: number, y?: number, r?: number) {
        super();
        x && y ? this._c = new MyVector2D(x, y) : this._c = new MyVector2D(0, 0);
        r ? this._r = r : this._r = 0;
    }
    get center(): MyVector2D {
        return new MyVector2D(this._c.x, this._c.y);
    }
    get radius(): number {
        return this._r;
    }
    private _computePrimitive(): void {
        this.vertex.x = this._c.x - this.radius;
        this.vertex.y = this._c.y - this.radius;
        this.height = this.width = 2 * this.radius;
    }
    set center(vec: MyVector2D) {
        this._c.x = vec.x;
        this._c.y = vec.y;
        this._computePrimitive();
    }
    set radius(value: number) {
        this._r = value;
        this._computePrimitive();
    }
    get area(): number {
        return Math.PI * this.radius ** 2;
    }
    get primitiveArea(): number {
        return super.area;
    }
}

console.log("Тестирование геометрии");

console.log("Прямоугольник 2 x 2 с центром в начале координат:");
const rectangle = new MyRectangle(2, 2);
console.log(`Площадь равна ${rectangle.area} кв.ед.`);
console.log("Верхняя левая вершина: " + rectangle.upperLeftVertex.toString());
console.log("Правая нижняя вершина: " + rectangle.lowerRightVertex.toString());

console.log("Круг радиусом 1 с центром в начале координат:");
const circle = new MyCircle();
circle.radius = 1;
console.log(`Площадь равна ${circle.area} кв.ед.`);
console.log("Вершина примитива: " + circle.vertex.toString());
console.log("Ширина примитива: " + circle.width);
console.log(`Площадь примитива равна ${circle.primitiveArea} кв.ед.`);