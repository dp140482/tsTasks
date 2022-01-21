const API: string = 'https://jsonplaceholder.typicode.com/todos';

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

async function getByHttp<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const body: Promise<T> = await response.json();
    return body;
}

async function getTodosByCount(count: number): Promise<void> {
    let data: Todo[];
    try {
        data = await getByHttp<Todo[]>(API);
        for (let i: number = 0; i < count; i++) {
            console.log(data[i]);
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

getTodosByCount(10);