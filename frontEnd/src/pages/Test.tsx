const url = "http://localhost:8080/test/test";

function Test() {
    fetch(url).then((response) => {
        console.log(response);
        response.json().then((e) => {
            console.log(typeof e);
            console.log(e.name);
        });
    });

    return (
        <div>
            <p>hello</p>
        </div>
    );
}

export default Test;
