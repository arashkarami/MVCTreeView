/*
* Author: arash karami (http://arash.im)
* making client side tree view for using in ASP.NET MVC
* Please contact me about your feedback 
*/
arkad.ui.treeview = {
    expandUrl: "/Treeview/getchildren",
    successEditAlert: "Success",
    successAddAlert: "Success",
    mainPageUrl: "/Treeview/index",
    addItemPopupUrl: "/Treeview/add",
    editItemPopupUrl: "/Treeview/edit",
    removeItemPopupUrl: "/Treeview/remove",
    approvedRemoveMessage: "are you sure?",
    successRemoveAlert: "Remove",
    expand: function (id) {
        var target = $("#row" + id);
        var expanderImg = $(target).find(".treeview-node-expand img");
        $(expanderImg).attr("src", "../../Images/Icons/minus.png");
        arkad.ui.treeview.push($(target).find(".treeview-node-element"), id);
    },
    add: function (parentId) {
        arkad.ui.modal.init(arkad.ui.treeview.addItemPopupUrl,
            { parentId: parentId },
            arkad.ui.treeview.SuccessAddAlert,
            function () {
                $.ajax({
                    url: arkad.ui.treeview.mainPageUrl,
                    success: function (data) {
                        $("#nav").html(data);
                    }
                });
            });
    },
    edit: function (id) {
        arkad.ui.modal.init(arkad.ui.treeview.editItemPopupUrl,
            { id: id },
            arkad.ui.treeview.SuccessEditAlert,
            function () {
                $.ajax({
                    url: arkad.ui.treeview.mainPageUrl,
                    success: function (data) {
                        $("#nav").html(data);
                    }
                });
            });
    },
    remove: function (id) {
        // e.preventDefault();
        confirm(arkad.ui.treeview.approvedRemoveMessage, function () {
            $.getJSON(arkad.ui.treeview.removeItemPopupUrl,
                { id: id },
                function () {
                    //TODO
                    //$("#row_"+ memberId).hide("slow", function(){ $(this).remove();}); 
                });
        });
    },
    onClickNode: function (id) {
        //$(".treeview-node-tools img").hide();
        $("#row" + id).find(">:first-child .treeview-node-tools img").toggle();

    },
    onMouseOutFromToolbar: function (id) {
        $("#row" + id).find(">:first-child .treeviewItem-content-tools img").hide();
    },

    push: function (parentObj, parentId) {
        $.ajax({
            url: arkad.ui.treeview.expandUrl,
            type: "POST",
            dataType: "json",
            data: { parentId: parentId },
            success: function (data) {
                var subTreeUl = arkad.ui.treeview.generateSubItems(data.Data);
                $(parentObj).after(subTreeUl);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("Error '" + jqXhr.status + "' (textStatus: '" + textStatus + "', errorThrown: '" + errorThrown + "')");
            },
            complete: function () {
            }
        });
    },
    generateSubItems: function (data) {
        var ul = document.createElement("ul");
        $.each(data, function (i, object) {
            var element = {
                Id: object["Id"],
                Title: object["Title"],
                Tooltip: object["Tooltip"]
            };

            var li = document.createElement("li");
            li.setAttribute("id", "row" + element.Id);

            //<ul class="treeview-node-element">
            var ulContent = document.createElement("ul");
            ulContent.setAttribute("class", "treeview-node-element");

            //<li class="treeview-node-expand" onclick="expand(@snode.Id)"><img src="../../Images/Icons/add.png"/></li>
            var expandLi = document.createElement("li");
            expandLi.setAttribute("onclick", "expand(" + element.Id + ")");
            expandLi.setAttribute("class", "treeview-node-expand");
            var li1Img = document.createElement("img");
            li1Img.setAttribute("src", "../../Images/Icons/add.png");
            expandLi.appendChild(li1Img);

            //<li onclick="onClickNode(@node.Id)" title="@node.Tooltip">@node.Title</li>
            var titleLitteral = document.createElement("li");
            titleLitteral.setAttribute("title", element.Title);
            titleLitteral.setAttribute("onclick", "onClickNode(" + element.Id + ")");
            var titleTextElement = document.createTextNode(element.Title);
            titleLitteral.appendChild(titleTextElement);

            //<li class="treeview-node-tools"><img src="../../Images/Icons/add.png" onclick="add(@node.Id)" alt="add"/></li>
            var addLitteral = document.createElement("li");
            addLitteral.setAttribute("class", "treeview-node-tools");
            var li3Img = document.createElement("img");
            li3Img.setAttribute("onclick", "add(" + element.Id + ")");
            li3Img.setAttribute("src", "../../Images/Icons/add.png");
            li3Img.setAttribute("alt", "add");
            addLitteral.appendChild(li3Img);

            //<li class="treeview-node-tools"><img src="../../Images/Icons/edit2.png" onclick="edit(@node.Id)" alt="edit"/></li>
            var editLitteral = document.createElement("li");
            editLitteral.setAttribute("class", "treeview-node-tools");
            var li4Img = document.createElement("img");
            li4Img.setAttribute("onclick", "edit(" + element.Id + ")");
            li4Img.setAttribute("src", "../../Images/Icons/edit2.png");
            li4Img.setAttribute("alt", "edit");
            editLitteral.appendChild(li4Img);

            //<li class="treeview-node-tools"><img src="../../Images/Icons/trash.png" onclick="remove(@node.Id)" alt="remove"/></li>
            var removeLitteral = document.createElement("li");
            removeLitteral.setAttribute("class", "treeview-node-tools");
            var li5Img = document.createElement("img");
            li5Img.setAttribute("onclick", "remove(" + element.Id + ")");
            li5Img.setAttribute("src", "../../Images/icons/trash.png");
            li5Img.setAttribute("alt", "remove");
            removeLitteral.appendChild(li5Img);

            ulContent.appendChild(expandLi);
            ulContent.appendChild(titleLitteral);
            ulContent.appendChild(addLitteral);
            ulContent.appendChild(editLitteral);
            ulContent.appendChild(removeLitteral);

            li.appendChild(ulContent);
            ul.appendChild(li);
        });

        return ul;
    }
};

