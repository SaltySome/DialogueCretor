let data = {}
let path_str = ""

document.addEventListener("DOMContentLoaded", (e) => {
    if(sessionStorage.getItem('data') && sessionStorage.getItem('path_str')) {
        data = sessionStorage.getItem('data')
        path_str = sessionStorage.getItem('path_str')
        set_text()
    } else {
        data = {"dialogues": [{}]}
        path_str = "dialogues/0"
    }
    console.log("loaded succesfully")

    document.getElementById('path').innerHTML = 'path: ' + path_str
})

document.addEventListener("change", (e) => {
    setDataFromPath(path_str+'/question', document.getElementById('question').value)
    setDataFromPath(path_str+"/a", {"text": document.getElementById("1").value, "num": document.getElementById("a").value})
    setDataFromPath(path_str+"/b", {"text": document.getElementById("2").value, "num": document.getElementById("b").value})
    setDataFromPath(path_str+"/c", {"text": document.getElementById("3").value, "num": document.getElementById("c").value})
    setDataFromPath(path_str+"/d", {"text": document.getElementById("4").value, "num": document.getElementById("d").value})
})

document.getElementById("submit").addEventListener("click", () => {
    const fileInput = document.getElementById("jsonFileUpload");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;

            handler(content)
        }

        reader.readAsText(file)
    } else {
        alert("please upload a file first")
    }
})

document.getElementById("save").addEventListener("click", () => {
    let data_str = JSON.stringify(data)

    let blob = new Blob([data_str], { type: "application/json"})

    let url = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = url;
    let thing = document.getElementById('filename').value
    if (!thing) {
        alert('please put a file name')
        document.body.removeChild(a);
        return
    }
    a.download = thing + '.json'; 

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
})

function handler(content) {
    data = JSON.parse(content)
    sessionStorage.setItem('data', data)

    path_str = 'dialogues/0'

    set_text()
}

function set_text() {
    if(!getDataFromPath(path_str + '/question')) {
        setDataFromPath(path_str + '/question', '')

        setDataFromPath(path_str + '/a', {"text": '', 'num': 0})
        setDataFromPath(path_str + '/b', {"text": '', 'num': 0})
        setDataFromPath(path_str + '/c', {"text": '', 'num': 0})
        setDataFromPath(path_str + '/d', {"text": '', 'num': 0})
    }
    document.getElementById('question').value = getDataFromPath(path_str + '/question')
    document.getElementById("1").value = getDataFromPath(path_str + '/a/text')
    document.getElementById("2").value = getDataFromPath(path_str + '/b/text')
    document.getElementById("3").value = getDataFromPath(path_str + '/c/text')
    document.getElementById("4").value = getDataFromPath(path_str + '/d/text')

    document.getElementById("a").value = getDataFromPath(path_str + '/a/num')
    document.getElementById("b").value = getDataFromPath(path_str + '/b/num')
    document.getElementById("c").value = getDataFromPath(path_str + '/c/num')
    document.getElementById("d").value = getDataFromPath(path_str + '/d/num')
}

function getDataFromPath(path) {
    let words = path.split("/")
    let dat = data
    for(i = 0; i < words.length; i++) {
        dat = dat[words[i]]
    }
    return dat
}

function setDataFromPath(path, value) {
    let words = path.split("/")
    let dat = data
    for(i = 0; i < words.length - 1; i++) {
        dat = dat[words[i]]
    }
    dat[words[words.length - 1]] = value
}

document.getElementById('go1').addEventListener('click', () => {
    path_str += '/a'
    document.getElementById('path').innerHTML = 'path: ' + path_str
    set_text()
})

document.getElementById('go2').addEventListener('click', () => {
    path_str += '/b'
    document.getElementById('path').innerHTML = 'path: ' + path_str
    set_text()
})

document.getElementById('go3').addEventListener('click', () => {
    path_str += '/c'
    document.getElementById('path').innerHTML = 'path: ' + path_str
    set_text()
})

document.getElementById('go4').addEventListener('click', () => {
    path_str += '/d'
    document.getElementById('path').innerHTML = 'path: ' + path_str
    set_text()
})



document.getElementById('back').addEventListener('click', () => {
    if (path_str != 'dialogues/0') {
        while(path_str[path_str.length-1] != '/') {
            path_str = path_str.slice(0, path_str.length - 1)
        }
        path_str = path_str.slice(0, path_str.length - 1)
    }
    document.getElementById('path').innerHTML = 'path: ' + path_str
    set_text()
})