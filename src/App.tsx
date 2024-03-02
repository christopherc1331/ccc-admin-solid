import {Component, createEffect, createSignal, Show} from 'solid-js';


const API_URL = import.meta.env.VITE_API_URL;

const App: Component = () => {
    const [articles, setArticles] = createSignal<[]>([]);
    createEffect(() => {
        console.log("API_URL", API_URL)
    });

    createEffect(() => {
        if (articles().length > 0) {
            console.log('articles', articles());
        }
    });
    return (
        <>
            <Show when={articles().length > 0}>
                <h1>Articles</h1>
                <ul>
                    {articles().map((article: any) => (
                        // @ts-ignore
                        <li key={article._id}>{article.title}</li>
                    ))}
                </ul>
            </Show>
        </>
    )
};

export default App;
