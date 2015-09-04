function test (arg1, arg2, arg3) {
    console.log(arguments);
}

function aaa (event) {
    event.preventDefault();
    var arg = ["arg", "arg5", "--------"];
    test.apply(test,  arg);
}

console.log(document.getElementById("but"));
    document.getElementById("but").addEventListener("click", aaa);
