function SelectControl(){
    var $this,$ids,$labels,$that;
    var $speed = 100;
    var $value = [];
    var multiple = false;
    this.init = function(plu){
        $this = $(plu);
        $this.hide();
        var initSelectedArr = $this.find("option:selected");
        if(!$this.attr("type-multiple")){
            multiple = false;
        }else{
            multiple = $this.attr("type-multiple");
        }
        var selectCon;
        var a = $this.siblings(".selectControlBox");
        if(a.length >0){
            selectCon = a.eq(0);
            selectCon.empty();
        }else{
            selectCon = $("<div class='selectControlBox'></div>");
        }
        selectCon.width($this.width());
        var display = $("<span class='selectControlBtn'></span>");
        var listCon = $("<div class='listCon'></div>");
        listCon.width($this.width()-2);
        var searchInput = $('<div class="inputCon"><input type="text"></div>');
        var ul = $("<ul></ul>");
        var liData = $this.find("option");
        for(var liIndex = 0;liIndex<liData.length;liIndex++){
            $(liData[liIndex]).val();
            var liItem= $("<li title="+$(liData[liIndex]).text()+" value='"+$(liData[liIndex]).val()+"'>"+$(liData[liIndex]).text()+"</li>");
            if($(liData[liIndex]).prop("selected")){
                liItem.addClass("sc_selected");
            }
            ul.append(liItem);
            (function(){
                var li = liItem;
                li.on("click",function(event){
                    event.stopPropagation();
                    if(multiple){
                        if(li.hasClass("sc_selected")){
                            li.removeClass("sc_selected");
                        }else{
                            li.addClass("sc_selected");
                        }
                    }else{
                        ul.find("li").removeClass("sc_selected");
                        li.addClass("sc_selected");
                    }
                    refresh();
                });
            })();

        }
        refresh();
        function refresh(){
            var dataArr = ul.find("li");
            var labels = "";
            var ids = "";
            $value = [];
            for(var dataIndex = 0;dataIndex<dataArr.length;dataIndex++){
                var item = $(dataArr[dataIndex]);
                if(item.hasClass("sc_selected")){
                    var obj = {};
                    obj.id = item.val();
                    obj.value = item.html();
                    labels = labels+item.html()+",";
                    ids = ids + item.val()+",";
                    $value.push(obj);
                    $this.find("option[value="+item.val()+"]").attr("selected",true);
                }else{
                    $this.find("option[value="+item.val()+"]").attr("selected",false);
                }
            }
            labels = labels.substr(0,labels.length-1);
            ids = ids.substr(0,ids.length-1);
            $ids = ids;
            $labels = labels;
            display.html(labels).attr('title',labels);
            display.attr("value",ids);
            //$this.attr('value',$ids);
            //$this.text($labels);

        }
        //展开list
        display.on("click",function(event){
            event.stopPropagation();
            if(listCon.is(":hidden")){
                listCon.slideDown($speed);
                $(document).on('click',function(){
                    listCon.slideUp($speed);
                    $(document).off("click",document);
                });
            }else{
                listCon.slideUp($speed);
            }
        });
        //搜索
        var search = searchInput.find("input");
        search.on("input propertychange",function(){
            var condition = $(this).val();
            var dataArr = ul.find("li");
            for(var dataIndex = 0;dataIndex<dataArr.length;dataIndex++){
                var item = $(dataArr[dataIndex]);
                if(item.html().indexOf(condition) != -1){
                    item.show();
                }else{
                    item.hide();
                }
            }
        }).on("click",function(event){event.stopPropagation();});
        listCon.append(searchInput,ul);
        selectCon.append(display,listCon);
        $this.parent().append(selectCon);
        $that = selectCon;
    };
    this.getValue = function(){
        return $ids;
    };
    this.getLable = function(){
        return $labels;
    };
    this.getAllValue = function(){
        return $value;
    };
    this.resetSelect = function(){
        //var dataArr = $that.find(".listCon ul").find("li");
        //console.log(dataArr);
        $that.find(".listCon ul li").removeClass("sc_selected");
        var display = $that.find(".selectControlBtn");
        var labels = "";
        var ids = "";
        //for(var dataIndex = 0;dataIndex<dataArr.length;dataIndex++){
        //    var item = $(dataArr[dataIndex]);
        //    if(item.hasClass("sc_selected")){
        //        labels = labels+item.html()+",";
        //        ids = ids + item.val()+",";
        //    }
        //}
        labels = labels.substr(0,labels.length-1);
        ids = ids.substr(0,ids.length-1);
        $ids = ids;
        display.html(labels);
        display.attr("value",ids);
    };
}
