{/* <i class='far fa-trash-alt'></i> */}
var todoListEmpty = true;
var liCount = 0;
$("#todoListAdd").keypress(function(event){
    if (event.which === 13 && this.value != ""){
        $("#todoListEmpty").hide(1)
        liCount++
        var currId = "li-" + liCount
        // Setup list item container and list item
        $("#todoList").append( "<div class='listItemCont'><div class='listItem' id='" + currId + "'><div class='liText'></div></div><div>");
        // Put item from textbox into list item space
        $("#"+currId +"> .liText").text(this.value);
        // Put remove button and indent in list item space
        $("#"+currId).prepend("<button id='btn-"+ currId +"' value='"+ currId +"' class='btn-remove'><i class='far fa-trash-alt'></i></button><div class='liIndent'></div>");
        // Move remove button out of view
        $("#"+currId).css("left","-=25px")
        // Clear userinput textbox
        this.value = "";
        // Call function to color backgrounds
        listItemBackground();
        // Setup for when an todoList item is clicked
        $("#"+currId+"> .liText").click(function(){
            $(this).toggleClass('completed');
        });
        // Setup for when the remove button is clicked
        $("#btn-"+currId).click(function(){
            $("#"+this.value).parent().remove();
            $(".listItemCont").length == 0 ? $("#todoListEmpty").slideDown(1) : null;
            listItemBackground();
        });
        // When mouse hovers on list items
        $("#"+currId).parent().mouseenter(function(){
            if($("#"+currId).is(':animated')){
                $("#"+currId).stop();
                $("#"+currId).animate({"left": "0px"}, "slow")
            }else { 
                $("#"+currId).animate({"left": "0px"}, "slow")
            }
        })
        $("#"+currId).parent().mouseleave(function(){
            if($("#"+currId).is(':animated')){
                $("#"+currId).stop();
                $("#"+currId).animate({"left": "-25px"}, "slow")
            }else { 
                $("#"+currId).animate({"left": "-25px"}, "slow")
            }
        })

        // Doubleclick to edit
        var liEditOpen = false
        $("#"+currId).dblclick(function(){
            if (liEditOpen == false){
                liEditOpen = true;
                var liEdit = $("#"+currId+"> .liText").text()
                $("#"+currId+"> .liText").text("")
                $("#"+currId+"> .liText").append("<input type='text' class='liEditInPlace' id='todoListAdd" + currId + "' value='" + liEdit +"'>")
                $("#todoListAdd"+currId).keypress(function(event){
                    if (event.which === 13 && this.value != ""){
                        $("#"+currId+"> .liText").text(this.value);
                        liEditOpen = false;
                        $("#"+currId+"> .liText").removeClass("completed")
                    }
                })
            }
        })
    };
})

// Setup for todoList toggle (show/add)
var todoListAddShow = true;
$("#todoListAddToggle").click(function(){
    if (todoListAddShow){
        todoListAddShow = false;
        $("#todoListAddToggle").html("<i class='fas fa-plus'></i>")
        $("#todoListAdd").slideUp(400, function(){
            $("#titleBar").css("border-bottom", "1px solid black")
        });
    }else {
        todoListAddShow = true;
        $("#todoListAddToggle").html("<i class='fas fa-minus'></i>")
        $("#titleBar").css("border-bottom", "0px")
        $("#todoListAdd").slideDown();
        
    }
})

// functions

// paint background for each list item 
function listItemBackground(){
    
    $(".listItemCont").each(function(){
        if ($(this).prev().attr("id") == "todoListEmpty"){
            $(this).removeClass("li-bg-drk").addClass("li-bg-lgt")
        } else {
            if ($(this).prev().hasClass("li-bg-lgt")){
                $(this).removeClass("li-bg-lgt").addClass("li-bg-drk")
            } else if ($(this).prev().hasClass("li-bg-drk")){
                $(this).removeClass("li-bg-drk").addClass("li-bg-lgt")
            }
            }
    })
}

