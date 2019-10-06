document.getElementById("attachment").addEventListener('click', function() {
    document.getElementById("file-input").click();
});
document.getElementById("file-input").addEventListener('change', function() {
    let pos = this.files.length - 1;
    document.getElementById("add_labels").innerHTML += `<div class="labels">${this.files[pos].name}</div>`;
});

var markdown = document.getElementsByClassName('markdown_convert');
var names_buttons = {
    'bold': {
        'text': '****',
        'focus': 2
    },
    'italic': {
        'text': '__',
        'focus': 1
    },
    'underline': {
        'text': '===',
        'focus': -1
    },
    'code': {
        'text': "``````",
        'focus': 3
    },
    'link': {
        'text': '[nombre_del_link](url)',
        'focus': 1
    },
    'image': {
        'text': '![nombre_de_la_imagen](url)',
        'focus': 2
    },
    'list-ul': {
        'text': '- ',
        'focus': 2
    },
    'list-ol': {
        'text': '1. ',
        'focus': 3
    },
};

Array.prototype.forEach.call(markdown, function(element) {
    var header = element.getElementsByClassName('markdown_convert_header')[0];
    var buttons = header.querySelectorAll('ul > li > button');
    var mark_texarea = element.getElementsByClassName('markdown_convert_body')[0].querySelectorAll('textarea')[0];

    Array.prototype.forEach.call(buttons, function(button) {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            var click_button = names_buttons[button.name];

            mark_texarea.focus();

            if (mark_texarea.value != '') {
                var cadena1 = mark_texarea.value.substr(0, mark_texarea.selectionStart);
                var cadena2 = mark_texarea.value.substr(mark_texarea.selectionStart, mark_texarea.value.length);

                mark_texarea.value = cadena1 + click_button.text + cadena2;
                mark_texarea.selectionEnd = cadena1.length + click_button.focus;
            } else {
                var end = mark_texarea.selectionStart;
                mark_texarea.value += click_button.text;
                mark_texarea.selectionEnd = end + click_button.focus;
            }

        });
    });
});