    $(document).ready(function () {
        $.getJSON("data.json", function (data) {
            var list = '';
            $.each(data, function (key, value) {
                list += '<tr><td>' +
                    value.title +
                    '</td><td><ul>';
                $.each(value.description, function (key, value) {
                    list += "<li>value</li>";
                })
                list += '</ul></td></tr>';
            });
            $('#table1').append(list);
        });
    });