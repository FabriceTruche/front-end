
export function test() {
    let x=1
    x=x+1
}

test()


interface ITest {
    x: number
    y: number
}
class Test2 implements ITest {
    public get x(): number { return 0 }
    public get y(): number { return 1 }

}

type Test3<T extends {x: number, y: number}> = {
    data: T
}

const v: Test3<ITest> = {
    data: new Test2(),
}