
function HexToDecConverter(hex) {
    return parseInt(hex);
}

function CreateTableHeader() {
    var header = ["TxHash", "Block", "Timestamp", "Gas Price", "Gas Price"];
    return ConvertDataToTableRow(header, "th");
}

function CreateColumnElement(data, dataType) {
    var columnNode = document.createElement(dataType);
    var textnode = document.createTextNode(data);
    columnNode.appendChild(textnode);
    if (dataType == "th" && data == "TxHash") {
        columnNode.setAttribute("data-filter-control", "select");
    }
    return columnNode;
}

function ConvertDataToTableRow(data, dataType) {
    var rowNode = document.createElement("tr");
    var index, len;
    for (index = 0, len = data.length; index < len; ++index) {
        rowNode.appendChild(CreateColumnElement(data[index], dataType));
    }
    return rowNode;
}

function ConvertTimestampToDateTime(timeStamp) {
    var dateTime = new Date(HexToDecConverter(timeStamp));
    var datestring = ConvertTo2Digit(dateTime.getDate()) + ":" + ConvertTo2Digit(dateTime.getMonth() + 1) + ":" + dateTime.getFullYear() + " " +
        ConvertTo2Digit(dateTime.getHours()) + ":" + ConvertTo2Digit(dateTime.getMinutes()) + ":" + ConvertTo2Digit(dateTime.getSeconds());
    return datestring;
}

function ConvertTo2Digit(number) {
    return (number < 10 ? '0' : '') + number;
}

function GetData() {
    //Create Header Cell
    document.getElementById("example").innerHTML = "";
    var nodeThead = document.createElement("thead");
    nodeThead.appendChild(CreateTableHeader());
    document.getElementById("example").appendChild(nodeThead);

    var request = new XMLHttpRequest();
    request.open('GET', 'https://etherscan.azurewebsites.net/api/data', true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {

            if (data.status == "1") {
                var node = document.createElement("tbody");
                var datarow = "";
                var index, len, transactionHash, blockNumber, timeStamp, gasPrice, gasUsed;
                for (index = 0, len = data.result.length; index < len; ++index) {

                    transactionHash = data.result[index].transactionHash;

                    blockNumber = HexToDecConverter(data.result[index].blockNumber);

                    timeStamp = ConvertTimestampToDateTime(data.result[index].timeStamp);

                    gasPrice = HexToDecConverter(data.result[index].gasPrice);
                    gasUsed = HexToDecConverter(data.result[index].gasUsed);

                    var groupData = [transactionHash, blockNumber, timeStamp, gasPrice, gasUsed];

                    var rowNode = ConvertDataToTableRow(groupData, "td");
                    node.appendChild(rowNode);
                }

                document.getElementById("example").appendChild(node);
            }
            else {
            }
        } else {
        }

        $('#example').DataTable();

        //Replace Global Search to TxHash Custom Search
        var x = document.getElementsByClassName("col-sm-6");       
        x[1].innerHTML = "<div id=\"example_filter\" class=\"dataTables_filter\"><label>Search:<input type=\"text\" class=\"column_filter\" placeholder=\"TxHash\" aria-controls=\"example\" id=\"TxHash_filter\"></label></div>";
        $('input.column_filter').on('keyup click', function () {
            filterTxHashColumn();
        });

        //Show the data after page loaded
        document.getElementById("datatable").style.display = "block";
        document.getElementById("loader").style.display = "none";
    };
    request.send();
};

function filterTxHashColumn() {
    $('#example').DataTable().column(0).search(
        $('#TxHash_filter').val(),
        true, true).draw();
}

$(document).ready(function () {
    GetData();
});
