function Test() {
    fetch("http://localhost:8080/post/list").then((response) =>
        console.log(response)
    );
    // .then((data) => console.log(data));

    return <div></div>;
}

export default Test;
