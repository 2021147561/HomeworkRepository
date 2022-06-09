var data = JSON.parse(document.getElementById("productdata").value)[0];

document.addEventListener("DOMContentLoaded", (() => {
    // detail page 구성
    const main = document.getElementById("product-body");

    const img = document.createElement("img");
    img.src = '.' + data.product_image;
    img.alt = data.product_contents;
    img.className = 'itemimg';

    const divmain = document.createElement("div");
    divmain.id = "itemdetail-main"

    const divdata = document.createElement("div");
    const name = document.createElement("p");
    const content = document.createElement("p");
    const price = document.createElement("p");
    const type = document.createElement("p");
    const id = document.createElement("p");
    const ect = document.createElement("p");

    name.innerHTML = "<strong>NAME</strong>  &nbsp;&nbsp;" + data.product_title;
    content.innerHTML = "<strong>CONTENTs</strong> &nbsp;&nbsp; " + data.product_contents;
    price.innerHTML = "<strong>PRICE</strong> &nbsp;&nbsp; " + data.product_price + "$";
    type.innerHTML = "<strong>Category</strong> &nbsp;&nbsp; " + data.product_category;
    id.innerHTML = "<strong>ID</strong> &nbsp;&nbsp; " + data.product_id;
    ect.innerHTML = "Aumenta su valor con las joyas bellas que el artesano ha trabajado duro. ¿Qué más debería decir aquí? Si lo escribo así, parece que hay algo, así que ¿es suficiente el español?"
    ect.id = "ect"

    divmain.appendChild(img);
    divmain.appendChild(divdata);
    divdata.appendChild(id);
    divdata.appendChild(name);
    divdata.appendChild(price);
    divdata.appendChild(type);
    divdata.appendChild(content);
    divdata.appendChild(ect);
    main.appendChild(divmain);

}), false);

fetch("../comment.json")
    .then(response => response.json())
    .then(json => display(json))
    .catch(error => {
        console.log("Error: " + error);
    });

function display (json) {
    var comment = json[data.product_id];
    console.log(comment);

    const main = document.getElementById("product-body");
    const cmt = document.createElement("div");
    const h3 = document.createElement("h3");
    cmt.id = "comment-body";
    h3.innerHTML = "<strong>Comments</strong>";
    cmt.appendChild(h3);

    for (let i = 1; i <= Object.keys(comment).length; i++) {
        let p = document.createElement("p");
        p.className = "comment";
        p.innerHTML = "<strong>" + i + "</strong> &nbsp;&nbsp;" + comment["c" + String(i)];
        cmt.appendChild(p);
    }
    
    
    const newcmt = document.createElement("div");
    const input = document.createElement("input");
    const btn = document.createElement("button");
    input.type = "text";
    input.id = "new_comment"
    input.placeholder = "Enter your review."
    newcmt.id = "newcmt";
    btn.innerHTML = "Submit";
    btn.onclick = newCmt;
    newcmt.appendChild(input);
    newcmt.appendChild(btn);
    cmt.appendChild(newcmt);
    
    main.appendChild(cmt);

    function newCmt(e) {
        let cmt_new = document.getElementById("new_comment").value;
        console.log(cmt_new);
        if (cmt_new != "") {
            $.ajax ({
                url: "./:" + String(data.product_id),
                type: "POST",
                data: {
                    newComment: $("input#new_comment").val()
                },
                success: function (data) {
                    console.log(data);
                }
            })
        }
    }

}